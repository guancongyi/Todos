import React,{ useState, useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Todos from './todos/todos';
import Login from './login/login'
import Register from './login/register';    
import Page404 from './page404';

function App (props){
    let [userInfo, setUserInfo] = useState({
        login:false,
        id: "",
        name: ""
    })
    let getUserInfo =(data)=>{
        setUserInfo({
            ...userInfo,
            login:true,
            id:data.id,
            name:data.name
        })
    }

    return (
        <Switch>
            <Route path="/" exact render={(props)=>{
                return <Redirect to="/login" />
            }} />
            <Route path="/login" exact render={(props)=>{
                return(
                    userInfo.login?<Redirect to="/todo" />
                    :<Login getUserInfo={getUserInfo}/>
                )
            }}/>
            <Route path="/register" exact component={Register}/>
            {userInfo.login && <Route path="/todo" exact render={(props)=>{
                return <Todos userInfo = {userInfo}/>
            }} />}
            
            <Route path="*" exact component={Page404}/>
        </Switch>  
    
    )
    
    
}

export default App;