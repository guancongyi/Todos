import React,{ useState } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import "./index.css";
import Todos from './todos/todos';
import Login from './login/login'
import Register from './login/register';    
import Page404 from './page404';

function App (props){
    let [login, setLogin] = useState(false)
    let getUserInfo =(id)=>{
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
                    :<Login getUserInfo={getUserInfo}/>
                )
            }}/>
            <Route path="/register" exact component={Register}/>
            {login && <Route path="/todo" exact component={Todos} />}
            
            <Route path="*" exact component={Page404}/>
        </Switch>  
    
    )
    
    
}

export default App;