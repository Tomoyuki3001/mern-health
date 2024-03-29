import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://mern-health.vercel.app/api/user/login",
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser());
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something is wrong");
      console.log("error", error);
    }
  };
  return (
    <div className="auth">
      <div className="auth-form card p-4">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email (Demo: user@gmail.com)" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password (Demo: 1234)" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Button className="primary-button my-4" htmlType="submit">
            Login
          </Button>
        </Form>
        <Link to="/register" className="auth-link">
          Click to the Signup page
        </Link>
      </div>
    </div>
  );
};

export default Login;
