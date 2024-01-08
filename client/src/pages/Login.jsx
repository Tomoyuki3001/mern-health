import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of the form:", values);
  };
  return (
    <div className="auth">
      <div className="auth-form card p-4">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button my-4" htmlType="submit">
            REGISTER
          </Button>
          <Link to="/register" className="auth-link">
            Click to the Signup page
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
