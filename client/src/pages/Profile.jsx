import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { userSelect } from "../app/redux/features/userSlice";
const Profile = () => {
  const { user } = useSelector(userSelect);
  return <Layout>
    <div className="flex flex-col">
        <div>{user.name} </div>
        <div>{user.email} </div>
        <div>{user.name} </div>
    </div>
  </Layout>;
};

export default Profile;
