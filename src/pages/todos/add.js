import React,{ useState} from 'react';
import { Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function Add(props){
    let {add} = props;
    let [val, setVal] = useState("");
    return <div id="create-todo">

            <Input 
                // id="new-todo"
                prefix={<EditOutlined />}
                placeholder="  What needs to be done?"
                size="large"
                value={val}
                onChange={({target})=>{
                    setVal(target.value)
                }}
                onKeyDown={({keyCode, target})=>{
                    if(keyCode===13){
                        if(!val.trim()){
                            alert("Enter Something")
                            target.focus()
                        }else{
                            add(val)
                            setVal("")
                        }
                    }
                }}
            />
            </div>
}

export default Add;