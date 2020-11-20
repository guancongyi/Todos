import React, {useState} from 'react';
import { Button, Form, Input, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import MyReCaptcha from './recaptcha';

const FormItem = Form.Item;

function Register() {
    let [data, setData] = useState({
        id: "",
        p1: "",
        p2: "",
        email: ""
    });
    let [verified, setVerified] = useState(false)
    function isVerified(verified) {
        setVerified(verified)
    }

    let showError = (msg) => {
        message.error(msg);
    }


    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col>
                <Card title="Welcome" style={{ 'textAlign': 'center' }}>
                    <Form className="login-form">
                        <FormItem name="username" rules={[{ required: true }]}>
                            <Input prefix={<UserOutlined />} placeholder="Username"
                                onChange={({ target }) => {
                                    data.id = target.value;
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>
                        <FormItem name="password" rules={[{ required: true }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password"
                                onChange={({ target }) => {
                                    data.p1 = target.value
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>

                        <FormItem name="password2" rules={[{ required: true }, {
                            validator: (rule, value, callback) => {
                                if (value && data.p1 != value) {
                                    callback("Password doesn't match");
                                }
                                callback();
                            }

                        }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password"
                                onChange={({ target }) => {
                                    data.p2 = target.value
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>
                        <FormItem name="email" rules={[{ type: 'email' }, { required: true }]} hasFeedback>
                            <Input prefix={<MailOutlined />} placeholder="Email"
                                onChange={({ target }) => {
                                    data.email = target.value
                                    setData({
                                        ...data
                                    })
                                }} />
                        </FormItem>
                        <FormItem>
                            <MyReCaptcha
                                isVerified={isVerified}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" className="login-form-button"
                                onClick={() => {
                                    if (verified) {
                                        let msg = new FormData();
                                        msg.append('id', data.id);
                                        msg.append('password', data.p1);
                                        msg.append('email', data.email);
                                        axios.post('http://192.168.1.141:8787/register', msg).then(res => {
                                            if (res.data == 'ok') {
                                                console.log(res.data)
                                                window.location = '/login'
                                            } else if (res.data == 'exist') {
                                                showError("Username Exists.")
                                            }

                                        });
                                    } else {
                                        showError('Please verify you are a human!')

                                    }
                                }}>
                                Register</Button>
                        </FormItem>
                    </Form>

                </Card>
            </Col>
        </Row>
    )
}

export default Register;