import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Checkbox, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import LogIn from '../../store/actions/user.js'
import '../../static/css/login.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        dispatch({type: 'LOG_IN'})
        return LogIn(username, password).then(res => {
            if (res.status === 200) {
                dispatch({type: 'SET_USER', payload: res.data})
                if(userInfo.isLoggedIn === true){
                    history.push('/');
                }
            } else {
                alert('incorrect username or password')
            }
        })
    }

    return (
        <Row >
            <Col>
                <Card title="My To-do List">
                    <Form>
                        <Form.Item name="username">
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Username"
                                onChange={({ target }) => setUsername(target.value)} />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                                onChange={({ target }) => setPassword(target.value)} />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary"
                                className="login-form-button"
                                onClick={handleSubmit}>Login</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;