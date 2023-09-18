const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hungdeveloper2910200321fwqeqweqwggg##s";
const mongoose = require("mongoose");
require("../models/userModel");
const User = mongoose.model("UserInfo");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: " Email hoặc mật khẩu sai vui lòng thử lại ! " });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "5m", //time het han token có thể chỉnh hơn 
      });
  
      if (res.status(201)) {
        return res.json({ status: "ok", token: token });
      } else {
        return res.json({ error: "Lỗi từ phía máy chủ"});
      }
    }
    res.json({ error: "Email hoặc mật khẩu sai vui lòng thử lại !" });
  });


module.exports = router;