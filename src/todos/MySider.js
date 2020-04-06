import React,{useEffect, useState} from 'react';
import { Menu, Layout } from 'antd';
import { Icon } from '@ant-design/compatible';

const { Sider } = Layout;
const { SubMenu } = Menu;

function MySider(props) {
    let { collapsed, userLists} = props
    console.log(userLists)

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={0}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Icon style={{ fontSize: '20px' }} type="calendar" />
                    <span>Calendar</span>
                </Menu.Item>
                <SubMenu key="2"
                    title={
                        <span>
                            <Icon style={{ fontSize: '20px', marginTop: '0.5em' }} type="check-circle" />
                            <span>Lists</span>
                        </span>
                    }>
                    {
                        Object.keys(userLists).map((k,id) =>{
                            // console.log(userLists[k].name)
                            return (<Menu.Item key={2+id+"1"}>{userLists[k].name}</Menu.Item>)
                        })
                    }
                    {/* <Menu.Item key="3">All Tasks</Menu.Item> */}

                </SubMenu>


                {/* <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>nav 3</span>
                </Menu.Item> */}
            </Menu>
        </Sider>
    )
}

export default MySider;