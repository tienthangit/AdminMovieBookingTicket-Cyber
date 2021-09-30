import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import bg2 from '../../assets/img/bg2.jpg'
import { Layout } from 'antd';
import './style.css'
const { Sider, Content } = Layout;

function createRoute(condition) {

    return class extends React.Component {
        render() {
            const { Component, RedirectPath, ...restParams } = this.props

            return (
                <Route {...restParams}
                    render={(propsRoute) => {
                        if (condition())
                        {
                            return <Layout className="grid grid-cols-2">
                                <Sider className="h-screen bgLogin" style={{ backgroundImage: `url(${bg2})` }}></Sider>
                                <Content className="flex items-center justify-center" style={{ width: '100%' }}>
                                    <Component {...propsRoute} />
                                </Content>
                            </Layout>
                        }
                        return <Redirect to={RedirectPath} />
                    }}
                />

            )
        }
    }

}


// nếu có token mà vào trang login
export const PrivateRoute = createRoute(() => !localStorage.getItem("toKen"))


// đăng nhập lần đầu
export const FirstLogin = createRoute(() => localStorage.getItem('toKen'))