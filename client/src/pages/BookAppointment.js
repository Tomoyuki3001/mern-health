import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import { toDateFix, fromDateFix, appointmentDate } from "../redux/dateFix";

const BookAppointment = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      const response = await axios.post(
        "https://mern-health.vercel.app/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      const response = await axios.post(
        "https://mern-health.vercel.app/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    console.log("time", time);
    try {
      const response = await axios.post(
        "https://mern-health.vercel.app/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time.format("HH:mm"),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <p>
                <b>Phone Number: </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address: </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per visit: </b>
                {doctor.feePerConsultation}
              </p>
              <p>
                <b>Website: </b>
                <a href={doctor.website} target="_blank" rel="noreferrer">
                  {" "}
                  {doctor.website}
                </a>
              </p>
              <h1 className="normal-text">
                <b>Time: </b> {fromDateFix(doctor)} - {toDateFix(doctor)}
              </h1>
              <div className="d-flex flex-column">
                <DatePicker
                  format="MM-DD-YYYY"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDate(appointmentDate(value));
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(value);
                  }}
                />
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
