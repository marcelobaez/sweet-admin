import React from "react";
import { Avatar, Dropdown, Layout, Menu, PageHeader } from "antd";
import {
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { menuConfig } from "../config";
import { createMenu } from "../utils";

const { Header, Content, Footer, Sider } = Layout;

const main = ({ children }) => {
  const router = useRouter();
  const selectedItem = menuConfig.menuItems.find(
    item => item.path === router.pathname && item.hideInMenu === false
  );

  const routes = [
    {
      path: "index",
      breadcrumbName: "Administración"
    },
    {
      path: "/",
      breadcrumbName: "Categorias"
    }
  ];

  const menu = (
    <Menu>
      <Menu.Item key='20'>
        <UserOutlined />
        <span className='nav-text'>Cuenta</span>
      </Menu.Item>
      <Menu.Item key='30'>
        <SettingOutlined />
        <span className='nav-text'>Configuración</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='40'>
        <PoweroffOutlined />
        <span className='nav-text'>Salir</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <img src='/static/img/logo.png' alt='logo' className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultOpenKeys={[selectedItem && selectedItem.parentKey]}
          defaultSelectedKeys={[selectedItem && selectedItem.key]}
        >
          {createMenu(menuConfig)}
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100%", marginLeft: 200 }}>
        <Header style={{ background: "#fff", padding: 0, height: "52px" }}>
          <Menu
            mode='horizontal'
            style={{ lineHeight: "52px", float: "right" }}
          >
            <Menu.Item key='11'>
              <Dropdown overlay={menu}>
                <Avatar src='/static/img/avatar.jpg' size='large' />
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
        <PageHeader
          style={{ marginTop: "3px" }}
          ghost={false}
          onBack={() => window.history.back()}
          title='Categorias'
          breadcrumb={{ routes }}
        ></PageHeader>
        <Content style={{ margin: "24px 16px 0", minHeight: "auto" }}>
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Sweet Hope ©2019 Creado por Marcelo Baez
        </Footer>
      </Layout>
      <style jsx>
        {`
          .logo {
            height: 32px;
            margin: 16px;
          }
          .avatar-uploader > .ant-upload {
            width: 128px;
            height: 128px;
          }
        `}
      </style>
    </Layout>
  );
};

export default main;
