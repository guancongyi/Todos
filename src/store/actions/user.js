import axios from "axios";

function LogIn(username, password){
    return axios.get('http://localhost:8888/login', {
        params: {
            username,
            password
        }
    })
}

export default LogIn