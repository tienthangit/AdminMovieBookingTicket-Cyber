import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    FileAddOutlined,
    FieldTimeOutlined,
    YoutubeOutlined,
    UserOutlined,
} from "@ant-design/icons";
import logoSignIn from "../../assets/logoSignIn.png";
import Header from "../../components/Header";

const { Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

function HomeTemplates(props) {
    const { Component, ...restParams } = props;
    const [state, setstate] = useState({
        collapsed: false,
    });

    const onCollapse = (collapsed) => {
        // console.log(collapsed);
        setstate({ collapsed });
    };

    return (
        <Route
            {...restParams}
            render={(props) => {
                return (
                    <Layout style={{ minHeight: "100vh" }}>
                        <Sider
                            collapsible
                            collapsed={state.collapsed}
                            onCollapse={onCollapse}>
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                                <div>
                                    <img src={logoSignIn} className="p-5" alt="logo" />
                                </div>
                                <Menu.Item key="2" icon={<UserOutlined />}>
                                    <NavLink to="/home/user">
                                        User
                                    </NavLink>
                                </Menu.Item>
                                <SubMenu key="sub2" icon={<YoutubeOutlined />} title="Films">
                                    <Menu.Item key="6" icon={<YoutubeOutlined />}>
                                        <NavLink to="/home/movie">
                                            Films
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="8" icon={<FileAddOutlined />}>
                                        <NavLink to="/home/movie/addmovie">
                                            Add Films
                                        </NavLink>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="9" icon={<FieldTimeOutlined />}>
                                    ShowTimes
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header />
                            <Content style={{ margin: "1rem" }}>
                                <div
                                    className="bg-white"
                                    style={{ padding: 24, minHeight: 360 }}>
                                    <Component {...props} />
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Admin BookingTicket @2021 Created by TT </Footer>
                        </Layout>
                    </Layout>
                );
            }}></Route>
    );
}

export default HomeTemplates;


