// import React, { useEffect, useState } from 'react';
// import { Menu, Layout, Modal, Input, Button } from 'antd';
// import { Icon } from '@ant-design/compatible';
// import axios from 'axios';
// import qs from 'qs';

// const { Sider } = Layout;
// const { SubMenu } = Menu;

// function MySider(props) {
//     let [selected, setSelected] = useState("3");
//     let [showPop, setShowPop] = useState(false);
//     let [createList, setCreateList] = useState(false);


//     let { siderInfo, getSelectedListId, newListAdded } = props;
//     let {listNames, id, collapsed } = siderInfo;

//     useEffect(()=>{
//         if(createList){
//             let msg = new FormData();
//             msg.append('id', id);
//             msg.append('listName', listNames[listNames.length-1]);
//             msg.append('data', qs.stringify([]));

//             axios.post('http://192.168.1.141:8787/addList', msg).then(res => {
//                 setSelected(listNames.length+2+'');
//                 newListAdded(listNames.length-1);
//                 // console.log(listNames.length+2+'',listNames[listNames.length-1])
//             });
//         }
//     },[createList])

//     return (
//         <Sider
//             trigger={null}
//             collapsible
//             collapsed={collapsed}
//             style={{ width: 256 }} 
//             // collapsedWidth={0}
//         >
//             <div className="logo" />
//             <Menu
                
//                 theme="dark"
//                 mode="inline"
//                 defaultOpenKeys={['2']}
//                 selectedKeys={[selected]}
//                 onClick={(e) => {
//                     setSelected(e.key);
//                     getSelectedListId(parseInt(e.key) - 2 - 1)
//                 }}>
//                 <Menu.Item key="1">
//                     <Icon style={{ fontSize: '20px' }} type="calendar" />
//                     <span>Calendar</span>
//                 </Menu.Item>
//                 <SubMenu key="2"
//                     title={
//                         <span>
//                             <Icon style={{ fontSize: '20px', marginTop: '0.5em' }} type="check-circle" />
//                             <span>Lists</span>
//                         </span>
//                     }>
//                     {
//                         listNames.map((list, id) => {
//                             return <Menu.Item key={2 + id + 1 + ''}>{list}</Menu.Item>
//                         })
//                     }
//                     <Menu.Item disabled={true}>
//                         <Button type="link" onClick={() => {
//                             setShowPop(true);
//                             setCreateList(false);
//                         }}>+ New List</Button>
//                         <Modal
//                             width={"40%"}
//                             title="Enter New List Name Below: "
//                             visible={showPop}
//                             onOk={() => {
//                                 setShowPop(false);
//                                 setCreateList(true);
//                                 // console.log(document.querySelector('#myInput').value)
//                                 listNames.push(document.querySelector('#myInput').value)
//                             }}
//                             onCancel={() => setShowPop(false)}
//                         >
//                             <Input id="myInput"></Input>
//                         </Modal>
//                     </Menu.Item>
//                 </SubMenu>


//                 {/* <Menu.Item key="3">
//                     <Icon type="upload" />
//                     <span>nav 3</span>
//                 </Menu.Item> */}
//             </Menu>
//         </Sider>
//     )
// }

// export default MySider;