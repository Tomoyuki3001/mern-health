require("dotenv").config();
const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started at port ${port}`));
