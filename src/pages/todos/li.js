import React, { useState, useEffect, useRef } from 'react';
import { Input, Checkbox } from 'antd';

function Li(props) {

    let { data, changeDone, deleteTask, editTask } = props;
    let { id, title, done, time, date, detail } = data;


    let [val, setVal] = useState(title)
    let [editing, setEditing] = useState(false)
    let [prevEditing, setPrevEditing] = useState(editing)
    let todoInput = useRef()

    useEffect(() => {
        console.log("update editing")
        // setPrevEditing(editing)
        // console.log(prevEditing,editing)
        if (prevEditing == false && editing == true) {
            console.log(1)
            todoInput.current.focus()
        }
        setPrevEditing(editing)
    }, [editing])

    return <li className={editing ? "editing" : ""}>
        <div className={`todo ${done ? "done" : ""}`}>
            <div className="display">
                <div
                    className="todo-content"
                    onDoubleClick={() => {
                        setEditing(true)
                    }}
                ><Checkbox
                        checked={done}
                        onChange={({ target }) => { changeDone(id, target.checked) }}
                    /><span>&nbsp;&nbsp;</span>{ title}
                </div>
                <span
                    className="todo-destroy"
                    onClick={() => {
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
                ref={todoInput}
                onChange={({ target }) => {
                    setVal(target.value)
                }}
                onBlur={() => {
                    if (!val.trim()) {
                        console.log({ ...val, title })
                        setVal(title)
                    } else {
                        editTask(id, val)
                    }
                    setEditing(false)
                }}
            />

        </div>
    </li>
}

export default Li;