require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const corsOptions = {
  origin: "https://mern-health-front.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started at port ${port}`));
