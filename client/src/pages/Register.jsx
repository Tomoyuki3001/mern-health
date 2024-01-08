import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/register", values);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something wrong");
    }
  };
  return (
    <div className="auth">
      <div className="auth-form card p-4">
        <h1 className="card-title">Nice to meet you</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button my-4" htmlType="submit">
            REGISTER
          </Button>
          <Link to="/login" className="auth-link">
            Click to the Login page
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
