import React,{Component, useState} from 'react';

function Register(){
    let [password, setPassword] = useState({
        p1:"",
        p2:""
    })
    return (
        <div>
            <p>Welcome To To-do List</p>
            <p>Enter Your Username: </p>
            < input 
                placeholder="Username"
                type="text"
                onChange={()=>{
                    let newName = new FormData();
                    newName.append('username',newName);
                }}
            />
            <p>Enter Your Password:</p>
            < input 
                placeholder="Password"
                type="text"
                onChange={({target})=>{
                    setPassword({
                        ...password,
                        p1:target.value
                    })
                    console.log(password)
                }}
                onBlur={()=>{
                    if(password.p1.length < 6){
                        alert("Password should be at least 6 characters")
                    }
                }}
            />
            <p>Enter Your Password Again:</p>
            < input 
                placeholder="Password"
                type="text"
                onChange={()=>{
                    setPassword({
                        ...password,
                        p2:target.value
                    })
                }}
            />
            <br></br>
            <br></br>
            
            <button
                onClick={()=>{

                }}
            >Register</button>

        </div>
    )
}

export default Register;