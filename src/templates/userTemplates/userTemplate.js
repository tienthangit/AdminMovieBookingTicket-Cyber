import React from 'react'
import bg2 from '../../assets/bg2.jpg'
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import './style.css'
const { Sider, Content } = Layout;

function UserTemplate(props) {
    const { Component, ...restParams } = props

    return (
        <Route {...restParams} render={(restProps) => {
            return (
                <Layout className="grid grid-cols-2">
                    <Sider className="h-screen bgLogin" style={{ backgroundImage: `url(${bg2})` }}></Sider>
                    <Content className="flex items-center justify-center" style={{ width: '100%' }}>
                        <Component {...restProps} />
                    </Content>
                </Layout>
            )
        }}>
        </Route>
    )
}

export default UserTemplate
