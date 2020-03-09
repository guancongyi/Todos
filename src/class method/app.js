import React,{Component} from 'react';
import "./index.css";
import Title from './title';
import Add from './add';
import Todos from './todos';
import Stats from './stats'

class App extends Component{
    state = {
        data:[]
    }
    // addTask
    add=(val)=>{
        let {data} = this.state
        data.push({
           id:Date.now(),
           title:val,
           done:false
        })
        this.setState({
            data
        })
    }
    //on check
    changeDone=(id,done)=>{
        let {data} = this.state;
        data.forEach((item)=>{
            if(item.id == id){
                item.done = done;
            }
        });
        this.setState({
            data
        })
    }
    // delete single task
    deleteTask=(id,done)=>{
        let {data} = this.state;
        this.setState({
            data:data.filter((item)=>item.id!=id)
        })
    }
    // edit task
    editTask = (id, newTitle) =>{
        let {data} = this.state;
        data.forEach((item)=>{
            if(item.id == id){
                item.title = newTitle;
            }
        });
        this.setState({
            data
        })
    }
    // delete selected
    clearSelected=()=>{
        let {data} = this.state;
        for (let i=data.length-1;i>=0;i--){
            if(data[i].done == true){
                data.splice(i,1)
            }
        }
        this.setState({
            data
        })
    }
    
    render(){
        let {data} = this.state;
        return <div id="todoapp">
            <Title />
            <div className="content">
                <Add 
                    add = {this.add}
                />
                <Todos 
                    data={data}
                    changeDone={this.changeDone}
                    deleteTask={this.deleteTask}
                    editTask = {this.editTask}
                />
            </div>
            {data.length > 0?<Stats 
                data = {data}
                clearSelected={this.clearSelected}
            />:""}
            
   
        </div>
    }
}

export default App;