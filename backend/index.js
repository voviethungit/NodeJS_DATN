require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");

app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

const mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pv6rkef.mongodb.net/LOGINTEST?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Kết Nối DATABASE THÀNH CÔNG !!!");
  })
  .catch((e) => console.log(e));

// API REGISTER
app.use("/", registerRouter);

// API LOGIN
app.use("/", loginRouter);

// API PORT DEFAULT
app.listen(process.env.PORT, () => {
  console.log(
    `Server dang chay tai PORT : http://localhost:${process.env.PORT}/`
  );
  console.log(process.env.COPYRIGHT);
});
