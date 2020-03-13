import React,{Component, useState} from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import "./index.css";
import Todos from './todos/todos';
import Login from './login/login'
import Register from './login/register';    
import Page404 from './page404';

function App (props){
    let [login, setLogin] = useState(false)
    let getStatus =()=>{
        login = true;
        setLogin(login)
        console.log(login)
    }
    return (
        <Switch>
            <Route path="/" exact render={(props)=>{
                return <Redirect to="/login" />
            }} />
            <Route path="/login" exact render={(props)=>{
                return(
                    login?<Redirect to="/todo" />
                    :<Login getStatus={getStatus}/>
                )
            }}/>
            <Route path="/register" exact component={Register}/>
            {login && <Route path="/todo" exact component={Todos} />}
            <Route path="*" exact component={Page404}/>
        </Switch>  
    
    )
    
    
}

export default App;