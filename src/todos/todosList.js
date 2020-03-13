import React,{Component} from 'react';
import Li from './li'

function TodosList(props){
    let {data} = props

    return(
        <ul id="todo-list">
        {
            data.map((item,id)=>{
                return(<Li 
                    {...props}
                    key={item.id} 
                    data={item}
                />)
            })
        }
        </ul>
    )
}

export default TodosList;