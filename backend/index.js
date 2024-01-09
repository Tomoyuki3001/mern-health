require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["https://mern-health-front-end.vercel.app"],
    methods: ["POST", "GET"],
  })
);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.use(express.json());
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started at port ${port}`));
