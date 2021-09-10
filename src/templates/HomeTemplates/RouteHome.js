import React from "react";
import { Redirect, Route, NavLink } from 'react-router-dom'
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

function createRoutes(condition) {
    return class extends React.Component {

        state = {
            collapsed: false
        }

        handleOnCollapse = (collapsed) => {
            this.setState({
                collapsed: collapsed
            });
        };

        render() {
            const { Component, RedirectPath, ...restParams } = this.props

            return (
                <Route {...restParams} render={(propsRoute) => {
                    if (condition())
                    {
                        return <Layout style={{ minHeight: "100vh" }}>
                            <Sider
                                collapsible
                                collapsed={this.state.collapsed}
                                onCollapse={this.handleOnCollapse}>
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
                                        <Component {...propsRoute} />
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Admin BookingTicket @2021 Created by TT </Footer>
                            </Layout>
                        </Layout>
                    }
                    return <Redirect to={RedirectPath} />
                }}>
                </Route>
            )
        }
    }
}


// nếu đăng nhập mà ko phải admin?
export const AuthRoute = createRoutes(() => {
    let maLoai = localStorage.getItem('maLoaiNguoiDung')
    if (maLoai === "QuanTri")
    {
        return true
    }
    return false
})


//nếu chưa có token mà vào home
