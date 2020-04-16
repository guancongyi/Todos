import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Radio, Card, Row, Col, Avatar, PageHeader, Typography } from 'antd';
import { Icon } from '@ant-design/compatible';
import axios from 'axios';
import { SettingFilled, SyncOutlined } from '@ant-design/icons';
import "../static/css/todos.css"
import Title from './title';
import Add from './add';
import TodosList from './todosList';
import MySider from './MySider'
import Stats from './stats';
import MyHeader from './MyHeader';

const { Header, Content } = Layout;


function Todos(props) {
    let [data, setData] = useState([]);
    let [collapsed, setCollapsed] = useState(false);
    let [userLists, setUserLists] = useState([])

    let { userInfo } = props
    let { id, name } = userInfo

    // get lists and tasks info
    useEffect(() => {
        console.log(id)
        axios.get(`http://localhost:8787/getLists?id=${id}`).then(res => {
            console.log(res)
            let lists = res.data.lists;
            let liNames = [];
            let data = [];
            for (let i = 0; i<lists.length; i++){
                liNames.push(lists[i].name)
                if (lists[i].name == "all tasks") data = lists[i].tasks
            }
            setUserLists([...liNames])
            console.log(liNames)
            setData([...data])
        });
    },[id])

    // add task
    let add = (val) => {
        data.push({
            id: Date.now(),
            title: val,
            done: false
        });
        // let data2 = [...data]
        // let data3 = [...data]
        // console.log(data2.length===data.length)
        // console.log(data2)
        // console.log(data)

        setData([...data])
    }
    //on check
    let changeDone = (id, done) => {
        console.log(id, done)
        data.forEach((item) => {
            if (item.id == id) {
                item.done = done;
            }
        });
        setData([...data])
    }
    // delete single task
    let deleteTask = (id, done) => {
        setData(data.filter((item) => item.id != id))
    }
    // edit task
    let editTask = (id, newTitle) => {
        data.forEach((item) => {
            if (item.id == id) {
                item.title = newTitle;
            }
        });
        setData([...data])
    }
    // delete selected
    let clearSelected = () => {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].done == true) {
                data.splice(i, 1)
            }
        }
        setData([...data])
    }

    // collapsed button click callback
    let getCollapseStatus = (status) => {
        setCollapsed(status)
    }

    return (
        <Layout>
            <MySider collapsed={collapsed} userLists={userLists} />
            <Layout>
                <MyHeader getCollapseStatus={getCollapseStatus} />
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    <Row>
                        <Col span={5}>
                            <Typography.Title level={2}>Hello {name}</Typography.Title>
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


    // return <div id="todoapp">

    //     <Title />
    // <div className="content">
    //     <Add 
    //         add = {add}
    //     />
    //     <TodosList 
    //         data={data}
    //         changeDone={changeDone}
    //         deleteTask={deleteTask}
    //         editTask = {editTask}
    //     />
    // </div>
    //     {data.length > 0?
    //     <Stats 
    //         data = {data}
    //         clearSelected={clearSelected}
    //     />:""}

    // </div>

}

export default Todos;