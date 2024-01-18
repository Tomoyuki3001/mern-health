import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState();

  const getDoctorData = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
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
    try {
      const response = await axios.post(
        "/api/doctor/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          selectedTime: selectedTime,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
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
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Time: </b> {doctor.time[0]} - {doctor.time[1]}
              </h1>
              <div className="d-flex flex-column">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker.RangePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(values) => {
                    setSelectedTime([
                      moment(values[0]).format("HH:mm"),
                      moment(values[1]).format("HH:mm"),
                    ]);
                  }}
                />
                <Button className="primary-button mt-3 full-width-button">
                  Check Availability
                </Button>
                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
