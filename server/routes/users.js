const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { verifyToken } = require("./verifyToken");

// @route       POST /register
// @desc        Register User
// @access      Public
router.post(
  "/register",
  [
    check("username", "Name is required")
      .not()
      .isEmpty(),
    check("emailid", "Please enter valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more character"
    ).isLength({
      min: 6
    })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { username, emailid, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({
        emailid
      });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: "User already exists"
            }
          ]
        });
      }

      user = new User({
        username,
        emailid,
        password
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken

      const payload = { subject: user._id };

      jwt.sign(payload, "secretKey", (err, token) => {
        if (err) throw err;
        res.status(200).send({ token: token });
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route       POST api/auth
// @desc        Login User
// @access      Public
router.post(
  "/login",
  [
    check("emailid", "Please enter valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { emailid, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({
        emailid
      });

      // Check password and user

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || !user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //Return jsonwebtoken

      const payload = { subject: user._id };

      jwt.sign(payload, "secretKey", (err, token) => {
        if (err) throw err;
        else res.status(200).send({ token: token });
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route       Get /ViewUsers
// @desc        To show all users
// @access      Public
router.get("/ViewUsers", verifyToken, async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    res.json(err);
  }
});

// @route       Get /ViewUsers
// @desc        To show individual users
// @access      Public
router.get("/ViewUsers/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
