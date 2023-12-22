import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Button from "@mui/material/Button";

import { Table } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.data);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

// antD table col
const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (text, record) => <span>{record.isAdmin ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Button variant="contained" color="error">Block</Button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};


export default Users;
