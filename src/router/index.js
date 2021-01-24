import Login from '../pages/login'
import Register from '../pages/register';
import Todos from '../pages/todos/todos'

const routes = [
    {
        path: '/login',
        exact: true,
        render(props){
            return <Login {...props}/>
        }
    },
    {
        path: '/register',
        exact: true,
        render(props){
            return <Register {...props}/>
        }
    },
    {
        path: '/',
        exact: true,
        render(props){
            return <Todos {...props}/>
        }
    },
]

export {routes};