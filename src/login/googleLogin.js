import React from 'react';
import { Button} from "react-bootstrap";
import axios from 'axios';
import { GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';

function MyGoogleLogin(props) {
    // console.log(props)
    let { getUserInfo } = props;

    return (
        
        <GoogleLogin
            
            render={renderProps => (
                <Button className='google_login_btn' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <span><GoogleOutlined/>  Login with Google</span>
                </Button>
              )}
            height='10px'
            clientId="369161295539-53sfjov9feq3d1prd3on2f9mk1bbio0p.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={(res)=>{
                let id = res.googleId;
                let name = Object.values(res.Qt)[2];
                // console.log(res)
                let msg = new FormData();
                msg.append('id', id);
                msg.append('name', name);
                msg.append('isGoogle', true);
                msg.append('email', Object.values(res.Qt)[5])

                axios.post('http://localhost:8787/login', msg).then(res => {
                    let ret = res.data
                    if (ret == 'ok' || ret == 'exist') {
                        getUserInfo({
                            isGoogle: true,
                            id: id,
                            name:name,
                        });
                    }else{
                        alert('Retry')
                    }
                });
            }}
            onFailure={()=>{

            }}
            cookiePolicy={'single_host_origin'}
            
        />

    )
}

export default MyGoogleLogin;