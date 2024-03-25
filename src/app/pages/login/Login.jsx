// Login.js
import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import cisrLogo from "../assets/cisr_logo.png";
const { Title } = Typography;

const Login = ({ setIsLoggedIn }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const handleLogin = ({ email, password }) => {
    // Perform validation and authentication logic here
    // For simplicity, let's assume email and password are correct
    console.log(email, password);
    const isLoggedIn = email === "user@example.com" && password === "password";
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
      history.push("/");
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <div
        className="p-2 flex mb-6 flex-col justify-start items-start bg-blue-950"
        // style={{ borderBottom: "0.5px solid grey" }}
      >
        <img src={cisrLogo} style={{ height: 40 }} />
        <div className=" italic text-white mt-3">Admin dashboard</div>
      </div>
      <div className="m-4">
        <Title className="m-0" level={3}>
          Login
        </Title>
        <Form
          className="form-popup"
          form={form}
          labelCol={{
            span: 4,
          }}
          layout="vertical"
          wrapperCol={{
            span: 20,
          }}
          onFinish={() => {
            handleLogin(form.getFieldsValue());
          }}
        >
          <Form.Item label="Email" name={"email"}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
