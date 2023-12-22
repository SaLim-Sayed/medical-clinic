import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import Button from "@mui/material/Button";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.data);
      setDoctors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
         
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                 
                handleAccountStatus(record, "approved");
              }}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleAccountStatus(record, "reject")}
            >
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center m-2">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
