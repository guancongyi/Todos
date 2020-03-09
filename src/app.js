import React,{Component, useState} from 'react';
import "./index.css";
import Title from './title';
import Add from './add';
import Todos from './todos';
import Stats from './stats'

function App (props){
    let [data, setData] = useState([])
    
    // add task
    let add=(val)=>{
        data.push({
            id:Date.now(),
            title:val,
            done:false
        });
        let data2 = [...data]
        // let data3 = [...data]
        // console.log(data2.length===data.length)
        // console.log(data2)
        // console.log(data)

        setData([...data]) 
    }
    //on check
    let changeDone=(id,done)=>{
        console.log(id,done)
        data.forEach((item)=>{
            if(item.id == id){
                item.done = done;
            }
        });
        setData([...data]) 
    }
    // delete single task
    let deleteTask=(id,done)=>{
        setData(data.filter((item)=>item.id!=id))
    }
    // edit task
    let editTask = (id, newTitle) =>{
        data.forEach((item)=>{
            if(item.id == id){
                item.title = newTitle;
            }
        });
        setData([...data]) 
    }
    // delete selected
    let clearSelected=()=>{
        for (let i=data.length-1;i>=0;i--){
            if(data[i].done == true){
                data.splice(i,1)
            }
        }
        setData([...data])
    }
    return <div id="todoapp">
        <Title />
        <div className="content">
            <Add 
                add = {add}
            />
            <Todos 
                data={data}
                changeDone={changeDone}
                deleteTask={deleteTask}
                editTask = {editTask}
            />
        </div>
        {data.length > 0?
        <Stats 
            data = {data}
            clearSelected={clearSelected}
        />:""}
        

    </div>
    
}

export default App;