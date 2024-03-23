import React from "react";
import { Layout, Menu } from "antd";
import { routes } from "../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const items = routes.map((path, index) => ({
  key: path.path,
  label: <Link to={path.path}>{path.title}</Link>,
}));

const AppLayout = ({ children }) => {
  const currentPath = useLocation().pathname;
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentPath]}
          selectedKeys={[currentPath]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
