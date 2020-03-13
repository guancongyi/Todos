import React,{Component, useState} from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios'

function Login(props){
    let [data, setData] = useState({
        username:"",
        password:""
    });
    

    return (
        <div>
            <p>Please Log In First :)</p>
            <p>Username</p>
            <input 
                placeholder="Username"
                onChange={({target})=>{
                    data.username = target.value
                    setData({
                        ...data
                    })
                }}
            />
            <p>Password</p>
            < input 
                placeholder="Password"
                type="text"
                onChange={({target})=>{
                    data.password = target.value
                    setData({
                        ...data
                    })
                }}
            />
            <br></br>
            <br></br>
            
            <button
                onClick={()=>{
                    let {getStatus} = props;
                    let user = data["username"];
                    let pwd = data["password"];
                    let msg = new FormData();
                    msg.append('username',user);
                    msg.append('password', pwd);

                    console.log(msg.getAll('username'))
                    // let strData = JSON.stringify({user,pwd})
                    axios.post('http://localhost:8787/login',msg).then(res=>{
                        let ret = res.data
                        if (ret == 'not exist'){
                            alert("The username doesn't exist.")
                        }else if(ret == 'incorrect'){
                            alert("Incorrect, Please check username/password.")
                        }else{
                            getStatus();
                        }
                    });

                }}
            >submit</button>
            <Link 
                to="/register"
            >don't have an account yet?</Link>
        </div>
    )
}

export default Login;