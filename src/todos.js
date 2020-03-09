import React,{Component} from 'react';
import Li from './li'

function Todos(props){
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

export default Todos;