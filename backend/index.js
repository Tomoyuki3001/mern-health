require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: "https://mern-health-front.vercel.app",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started at port ${port}`));
