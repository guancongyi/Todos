import React, { useState, useEffect } from 'react';
import { Layout, Radio, Card, Row, Col, Typography, Modal } from 'antd';
import axios from 'axios';
import "../../static/css/todos.css"
import Title from './title';
import Add from './add';
import TodosList from './todosList';
import MySider from './MySider'
import Stats from './stats';
import MyHeader from './MyHeader';
import qs from 'qs';
const { Header, Content } = Layout;

const ALL_TASKS = 0;
const DEFAULT_LIST = 1;

function Todos(props) {
    // data is user's current selected list
    let [data, setData] = useState([]);
    // data is user's lists
    let [allData, setAllData] = useState([]);
    // current selected list id
    let [currId, setCurrId] = useState(0);
    // a look up table for finding task : 
    // task id : list id
    let [buffer, setBuffer] = useState({});
    // sider status
    let [siderInfo, setSiderInfo] = useState({
        id: "",
        collapsed: false,
        listNames: [],
        listAdded: false
    });

    let { userInfo } = props;
    let { id, name } = userInfo

    // get lists and tasks info upon login 
    useEffect(() => {
        console.log('logged in');
        axios.get(`http://192.168.1.141:8787/getLists?id=${id}`).then(res => {
            let lists = res.data.lists;
            let liNames = [];
            for (let i = 0; i < lists.length; i++) {
                liNames.push(lists[i].name);
                let tasks = lists[i].tasks;
                allData.push(tasks);

                for (let j = 0; j < tasks.length; j++) {
                    if (tasks[j].id in buffer) buffer[tasks[j].id].push(i);
                    else buffer[tasks[j].id] = [i];
                }
            }
            data = allData[currId]
            // store buffer
            setBuffer(buffer);
            // store lists
            setAllData([...allData])
            // store sider info
            setSiderInfo({
                ...siderInfo,
                listNames: [...liNames],
                id: id,
            })
            // store current data
            setData([...data])
        });
    }, [id])

    // update data
    useEffect(() => {
        console.log('data updated in ' + currId);

        let msg = new FormData();
        msg.append('id', id);
        msg.append('list', currId);
        msg.append('data', qs.stringify(data));
        axios.post('http://192.168.1.141:8787/setList', msg).then(res => {
            // update all lists 
            allData[currId] = data
            setAllData([...allData]);
        });
    }, [data])

    // switching list
    useEffect(() => {
        console.log('list changed to ' + currId);
        data = allData[currId];
        if (data != undefined) setData([...data]);
    }, [currId])

    // add task
    let add = (val) => {
        console.log(buffer)
        let item = {
            id: Date.now(),
            title: val,
            done: false
        }
        // add to curr data list
        data.push(item);


        // if curr is all tasks, add to default selected task
        if (currId == ALL_TASKS) {
            if (allData.length > 1) {
                allData[DEFAULT_LIST].push(item);
                buffer[item.id] = [ALL_TASKS, DEFAULT_LIST];
            } else {
                // prompt user to create a default list
            }
        }
        // otherwise add to curr list and all tasks 
        else {
            allData[ALL_TASKS].push(item);
            buffer[item.id] = [ALL_TASKS, currId];
        }
        setData([...data]);
        setAllData([...allData]);
        setBuffer(buffer);

    }
    //on task finished
    let changeDone = (id, done) => {
        // change current (data)
        data.forEach((item) => {
            if (item.id == id) item.done = done;
        });

        // change all occurance in others(all data)
        buffer[id].map((item) => {
            allData[item].forEach((task) => {
                if (task.id == id) task.done = done;
            });
        })
        setData([...data]);
        setAllData(allData);
    }
    // delete single task
    let deleteTask = (id, done) => {
        // delete others in all Data
        for (let i = buffer[id].length - 1; i >= 0; i--) {
            let lid = buffer[id][i];

            allData[lid] = allData[lid].filter((task) => task.id != id);
            buffer[id].splice(i, 1);
        }
        delete buffer[id];
        // delete current
        setData(data.filter((item) => item.id != id));
        setAllData(allData);
    }
    // edit task
    let editTask = (id, newTitle) => {
        console.log(buffer)
        data.forEach((item) => {
            if (item.id == id) {
                item.title = newTitle;
            }
        });
        setData([...data]);
    }
    // delete selected
    let clearSelected = () => {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].done == true) {
                let tid = data[i].id;
                // for each task to be deleted, get all lists that contain the task
                for (let j = buffer[tid].length - 1; j >= 0; j--) {
                    let lid = buffer[tid][j];
                    allData[lid] = allData[lid].filter((task) => task.id != tid);
                    buffer[tid].splice(j, 1);
                }
                delete buffer[id];
                data.splice(i, 1);
            }
        }
        setData([...data]);
        setAllData(allData);
    }

    // Sider Related
    // collapsed button click callback
    let getCollapseStatus = (status) => {
        setSiderInfo({
            ...siderInfo,
            collapsed: status
        })
    }
    // selected sider
    let getSelectedListId = (lid) => {
        setCurrId(lid);
    }
    // after adding new list, server got new list, 
    // here local update all data so that local and server match
    let newListAdded = (lId) => {
        setCurrId(lId);
        allData.push([]);
        setAllData(allData);
        setData(allData[lId]);
    }

    return (

        <Layout >
            <MySider siderInfo={siderInfo} getSelectedListId={getSelectedListId} newListAdded={newListAdded} />
            <Layout style={{ minHeight: '100vh' }}>
                <MyHeader getCollapseStatus={getCollapseStatus} />
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}>
                    <Row>
                        <Col span={5}>
                            <Typography.Title level={2}> Hello {name}</Typography.Title>
                        </Col>
                        <Col span={11}></Col>
                        <Col span={8}>
                            <Radio.Group defaultValue="two" buttonStyle="solid" style={{ float: 'right', justifyItems: 'right' }}>
                                <Radio.Button value="two" >Two columns</Radio.Button>
                                <Radio.Button value="more" >More columns</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={14}>
                            <Card>
                                <div className="content">
                                    <Add
                                        add={add}
                                    />
                                    <TodosList
                                        data={data}
                                        changeDone={changeDone}
                                        deleteTask={deleteTask}
                                        editTask={editTask}
                                    />
                                </div>
                                {data.length > 0 ?
                                    <Stats
                                        data={data}
                                        clearSelected={clearSelected}
                                    /> : ""}
                            </Card>

                        </Col>
                        <Col span={10}>
                            <Card> </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout >)
}

export default Todos;