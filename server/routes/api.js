const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res, next) => {
  let names = ["Shaik", "Mudassir", "Raj"];
  res.json(names);
});

verifyToken = (req, res, next) => {
  if (!req.header.authorization) {
    return res.status(401).send("unauthorized request");
  }
  let token = req.headers.authorization.split("")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("unauthorized request");
  }
  req.emailid = payload.subject;
  next();
};

router.post("/register", (req, res, next) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, register) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: register._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ emailid: userData.emailid }, (error, user) => {
    if (error) {
      console.log();
    } else {
      if (!user) {
        res.status(401).send("Inavalid user");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Password not matched");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.get("/dashboard", verifyToken, (req, res) => {
  res.send("Welcome");
});

module.exports = router;
