import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {showLoading,hideLoading} from "../app/redux/features/alertSlice"
import Button from "@mui/material/Button";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post("/api/v1/user/login", values);
      
      dispatch(hideLoading())
      window.location.reload()
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-indigo-300/10 ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="border p-6 rounded-lg shadow-2xl"
      >
        <h3 className="text-center">Login From</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user Register here
        </Link>
        <Button variant="outlined" className=" bg-indigo-600 " type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
