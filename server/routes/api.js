const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/", (req, res, next) => {
  let names = ["Shaik", "Mudassir", "Raj"];
  res.json(names);
});

router.post("/register", (req, res, next) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, register) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(register);
    }
  });
});
router.post('/login',(req,res) =>{
    let userData = req.body;
    
})
router.post('/dashboard',(req,res) =>{
  res.send("Welcome")
})

module.exports = router;
