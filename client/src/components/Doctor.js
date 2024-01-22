import React from "react";
import { useNavigate } from "react-router-dom";
import { toDateFix, fromDateFix } from "../redux/dateFix";

const Doctor = (doctor) => {
  let doctorData = doctor.doctor;
  console.log("timeFrom", fromDateFix(doctorData));
  const navigate = useNavigate();

  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() =>
        navigate(
          `https://mern-health.vercel.app/book-appointment/${doctorData._id}`
        )
      }
    >
      <h1 className="card-title">
        {doctorData.firstName} {doctorData.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number: </b>
        {doctorData.phoneNumber}
      </p>
      <p>
        <b>Address: </b>
        {doctorData.address}
      </p>
      <p>
        <b>Fee per visit: </b>
        {doctorData.feePerConsultation}
      </p>
      <p>
        <b>Time: </b>
        {fromDateFix(doctorData)} - {toDateFix(doctorData)}
      </p>
    </div>
  );
};

export default Doctor;
