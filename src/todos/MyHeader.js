import React, { useState } from 'react';
import { Layout, Button} from 'antd';
import { Icon } from '@ant-design/compatible';
import { SettingFilled, SyncOutlined  } from '@ant-design/icons';
const { Header} = Layout;


function MyHeader(props) {
    let [collapsed, setCollapsed] = useState(false);
    let { getCollapseStatus } = props

    return (
        <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
                style={{fontSize:'25px'}}
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => {
                    setCollapsed(!collapsed)
                    getCollapseStatus(!collapsed)
                }}
            />
            <Button shape="circle" style={{ float: 'right', margin: '0.9em 0.9em' }} icon={<SettingFilled />} />
            <Button shape="circle" style={{ float: 'right', margin: '0.9em 0 0 0' }} icon={<SyncOutlined />} />
        </Header>
    )
}

export default MyHeader;