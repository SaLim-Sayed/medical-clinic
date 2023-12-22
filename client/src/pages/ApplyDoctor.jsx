import React from "react";
import Layout from "../components/Layout";
import {  useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Form, Input, message, Col, Row, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../app/redux/features/alertSlice";
import { userSelect } from "../app/redux/features/userSlice";
const ApplyDoctor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelect);
  const token = localStorage.getItem("token");
  const onfinishHandler = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h3 className="text-center">Apply Adoctor</h3>
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="border p-6 rounded-lg shadow-2xl"
      >
        <h3 className=" ">Personal Details</h3>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          
          <Col xs={24} md={24} lg={8} className="flex items-center">
            <Button
              variant="contained"
              className=" w-full   bg-indigo-600 "
              type="submit"
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
