import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux"
import {showLoading,hideLoading} from "../app/redux/features/alertSlice"
const Register = () => {
  const navigate = useNavigate();
const  dispatch =useDispatch()
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        // localStorage.setItem("token", res.data.token);
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-indigo-300/10 ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="border p-6 rounded-lg shadow-2xl"
        >
          <h3 className="text-center">Register From</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="m-2">
            Already user login here
          </Link>
          <Button  variant="contained" className="bg-indigo-600 " type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
