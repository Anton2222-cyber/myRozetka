import React, {useContext, useState} from 'react';
import {
    HomeOutlined,
    LoginOutlined, LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {Link, Outlet} from "react-router-dom";
import {TokenContext} from "../../../context/TokenContext.tsx";
import {IUserLoginInfo} from "../../../interfaces/auth";
import {jwtDecode} from "jwt-decode";
import {APP_ENV} from "../../../env";

const { Header, Sider, Content } = Layout;

const ContainerDefault: React.FC = () => {


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const sharedItems = [

        {
            key: '2',
            icon: <HomeOutlined />,
            label: <Link to="/">Головна</Link>,
        }

    ];
    const tokenContext = useContext(TokenContext);
    let user: IUserLoginInfo|null=null;
     console.log(tokenContext.token);
    if(tokenContext.token){

        user= jwtDecode<IUserLoginInfo>(tokenContext.token);
        console.log("after");
        console.log(user.image);
    }

    const sharedItemsLogin = [
        {
            key: '4',
            icon: <UserOutlined />,
            label: <div>
                <img style={{height: 25, width: 25}} alt="X" src={`${APP_ENV.BASE_URL}/images/${user?.image}`} />
                <span>{user?.email}</span>
            </div>,
        },
        {

            key: '5',
            icon: <LogoutOutlined />,
            label: <Link onClick={()=>{tokenContext.setToken("")}} to="/">Вихід</Link>,
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: <Link to="/Create">Додати</Link>,
        }
    ];
    const sharedItemsNotLogin = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/register">Реєстрація</Link>,
        },
        {
            key: '6',
            icon: <LoginOutlined />,
            label: <Link to="/login">Логін</Link>,
        },

    ];







    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="demo-logo-vertical" />

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={tokenContext.token?sharedItems.concat(sharedItemsLogin):sharedItems.concat(sharedItemsNotLogin)}
                />
            </Sider>
            <Layout >
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,

                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ContainerDefault;