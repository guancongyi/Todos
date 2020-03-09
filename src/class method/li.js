import React,{Component, createRef} from 'react';

class Li extends Component{
    constructor(props){
        super(props);
        this.state = {
            editing:false,
            val: props.data.title
        }
    }
    
    // todoInput = createRef() another way to use ref
    //ref: mark react element, and use it in life cycle
    componentDidUpdate(prevState){
        let {lastState} = prevState;
        let currState = this.state.editing
        if(!lastState && currState){
            // entering editing state (get focus here)
            console.log(this.refs)
            this.refs.todoInput.focus()
        }

    }
    render(){
        console.log(this.props)
        let {data,deleteTask, changeDone, editTask} = this.props      
        let {id, title, done} = data; 
        let {editing, val} = this.state 
        return(
        <li className={editing?"editing":""}>
            <div className={`todo ${done?"done":""}`}>
                <div className="display">
                    <input 
                        className="check" 
                        type="checkbox" 
                        checked={done}
                        onChange={({target})=>{
                            changeDone(id, target.checked)
                        }}
                    />
                    <div 
                        className="todo-content"
                        onDoubleClick = {()=>{
                            this.setState({
                                editing:true
                            })
                        }}
                    >{title}</div>
                    <span 
                        className="todo-destroy"
                        onClick={()=>{
                            deleteTask(id)
                        }}
                    ></span>
                </div>
            </div>
            <div className="edit">
                <input
                    className="todo-input"
                    type="text"
                    value={val}
                    ref="todoInput"
                    onChange={({target})=>{
                        this.setState({
                            val:target.value
                        })
                    }}
                    onBlur={()=>{
                        if (!val.trim()){
                            this.setState({
                                val:title
                            })
                        }else{
                            editTask(id,val) 
                        }
                        this.setState({
                            editing:false
                        })
                    }}
                />

            </div>
        </li>)
    }
}

export default Li;