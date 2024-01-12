import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Home = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Home page</h1>
    </Layout>
  );
};

export default Home;