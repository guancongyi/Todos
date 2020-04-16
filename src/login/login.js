import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Checkbox, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MyGoogleLogin from './googleLogin';
// import MyReCaptcha from './recaptcha';
import '../static/css/login.css';

const FormItem = Form.Item;

function Login(props) {
    let [data, setData] = useState({
        id: "",
        password: "" // testing
    });

    let { getUserInfo } = props;

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col>
                <Card title="My To-do List" style={{ textAlign: 'center' }}>
                    <Form onSubmit={() => { }} className="login-form">
                        <FormItem name="username" >
                            <Input prefix={<UserOutlined />} placeholder="Username"
                                onChange={({ target }) => {
                                    data.id = target.value
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>
                        <FormItem name="password" >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password"
                                onChange={({ target }) => {
                                    data.password = target.value
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>
                        <FormItem>
                            {/* <Checkbox>Remember me</Checkbox> */}
                            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                            <Button type="primary" className="login-form-button"
                                onClick={() => {
                                    let id = data["id"];
                                    let pwd = data["password"];
                                    if (id == '' || pwd == '') {
                                        message.error("Incorrect, Please check username/password.")
                                    } else {
                                        let msg = new FormData();
                                        msg.append('id', id);
                                        msg.append('password', pwd);
                                        msg.append('isGoogle', false);

                                        // get login info
                                        axios.post('http://localhost:8787/login', msg).then(res => {
                                            let ret = res.data
                                            if (ret == 'ok') {
                                                getUserInfo({
                                                    isGoogle: false,
                                                    id: id,
                                                    name: id,
                                                });
                                            } else if (ret == 'wrong') {
                                                message.error("Incorrect, Please check username/password.")
                                            }
                                        });
                                       
                                    }
                                }}>
                                Log in</Button>
                            <div>
                                <span ><MyGoogleLogin {...props}/></span>

                                <a style={{ float: 'right' }} href="/register">
                                    Register
                                    </a>
                            </div>
                        </FormItem>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}

export default Login;