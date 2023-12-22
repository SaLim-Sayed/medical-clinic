import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs,Card } from "antd";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../app/redux/features/alertSlice";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handleDeleteAllRead = async() => {
    try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/delete-all-notification",
          {
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("somthing went wrong");
      }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead"  key={0}>
          <div className="flex justify-end">
            <Button className="p-2 cursor-pointer " onClick={handleMarkAllRead}>
              <span className="  capitalize">Mark All Read</span>
            </Button>
          </div>
          {user?.notifcation.map((notify) => (
            <Card className=" cursor-pointer m-2" >
              <div
                className="card-text"
                onClick={() => navigate(notify.onClickPath)}
              >
                {notify.message}
              </div>
            </Card>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <Button className="p-2" onClick={handleDeleteAllRead}>
              Delete All Read
            </Button>
          </div>
          {user?.seennotification.map((notificationMgs) => (
            <Card className=" cursor-pointer m-2">
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </Card>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
