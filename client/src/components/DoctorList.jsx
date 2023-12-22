import React from "react";
import { useNavigate } from "react-router-dom";

import {Card,Col } from "antd"
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <Col xs={28} lg={12} className="w-full">
      <Card title={`Dr. ${doctor.firstName} ${doctor.lastName}`}
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
         
        <div  >
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </Card>
    </Col>
  );
};

export default DoctorList;