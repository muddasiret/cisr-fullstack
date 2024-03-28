import React from "react";
import { Layout, Menu } from "antd";
import { routes } from "../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import cisrLogo from "../assets/cisr_logo.png";

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
        <div
          className="p-2 mt-2 ml-[-20px] flex flex-col justify-center items-center"
          // style={{ borderBottom: "0.5px solid grey" }}
        >
          <img src={cisrLogo} style={{ height: 40 }} />
          <div className=" italic text-white mt-3">Admin dashboard</div>
        </div>
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
          CISR ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
