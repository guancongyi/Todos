import React from 'react';
import Li from './li'

function TodosList(props) {
    let { data } = props;  
    console.log(data)
    return (
        <ul id="todo-list">
            {
                // all tasks
                (data.length !== 0)?data.map((item, id) => {
                    return (<Li
                        {...props}
                        key={JSON.stringify(item)}
                        data={item}
                    />)
                }) : ""
            }
        </ul>
    )
}

export default TodosList;