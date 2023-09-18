require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("../models/userModel");
const User = mongoose.model("UserInfo");
// ở trên là khai báo các module cần thiết để sử dụng có thể tự tìm hiểu

router.post("/register", async (req, res) => {
    // khai báo các thuộc tính user ở userModels và gửi request tới body
    const { fname, lname, email, password, userType } = req.body; 
  
    // mã hóa mật khẩu
    const encryptedPassword = await bcrypt.hash(password, 10);
    // kiểm tra tài khoản email xem có ai sử dụng chưa nếu rồi sẽ báo ở phần res.send nếu chưa thì sẽ tạo tài khoản như các thuộc tính ở dòng 22 đến 27
    try {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.send({ error: "email đã được sử dụng!" });
      }
      await User.create({
        fname,
        lname,
        email,
        password: encryptedPassword,
        userType,
      });
      res.send({ status: "ok" });
    } catch (error) {
        // in ra lỗi có thể loại bỏ nếu web đã hoàn thiện backend lẫn frontend
      console.log(error);
      res.send({ status: "error" });
    }
  });


module.exports = router;