require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);
const port = process.env.PORT || 5000;

app.get("/", (res, req) => {
  res.json("Hello");
});

app.listen(port, () => console.log(`Node server started at port ${port}`));
