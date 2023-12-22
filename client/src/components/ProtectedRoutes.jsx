import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, userSelect } from "../app/redux/features/userSlice";
import { hideLoading, showLoading } from "../app/redux/features/alertSlice";
import axios from "axios";

function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelect);

  const token = localStorage.getItem("token");
  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch(hideLoading);
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else return <Navigate to="/login" />;
}

export default ProtectedRoutes;
