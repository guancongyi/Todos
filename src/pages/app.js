import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../router';
import '../static/css/app.css'
// import Todos from './pages/todos/todos';

function App(props) {
    return (
        <Switch>
            {
                routes.map((route, index) => {
                    return <Route
                        path={route.path}
                        key={index}
                        exact={route.exact}
                        render={(props) => {
                            return route.render(props)
                        }}
                    />
                })
            }
        </Switch>
    )
}

export default App;