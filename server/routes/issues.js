const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issue = require("../models/issue.models");
const User = require("../models/user.models");
const { verifyToken } = require("./verifyToken");

// @route       Post /AddIssue
// @desc        To add Issue
// @access      Public
router.post("/AddIssue", verifyToken, async (req, res) => {
  try {
    const { Title, Description, Users, Severity, Status } = req.body;
    let addIssue = new Issue({
      Title,
      Description,
      Users,
      Severity,
      Status
    });
    await addIssue.save();
    if (!addIssue) {
      res.status(400).send("Somthing went wrong");
    } else {
      res.status(200).send({ message: "Sucessfully added" });
    }
  } catch (err) {
    res.json(err);
  }
});

// @route       Get /ViewOneIssue
// @desc        To Viwe
// @access      Public
router.get("/ViewOneIssue/:id", verifyToken, async (req, res) => {
  try {
    const ViewIssue = await Issue.findById(req.params.id);
    const FinalIssueDetails = await getUserDetailsWithIsuueDetails(ViewIssue);
    res.send(FinalIssueDetails);
  } catch (err) {
    if (err) res.json(err);
  }
});

// @route       Get /ViewIssue
// @desc        To show all users
// @access      Public
router.get("/UserViewIssue/:id", verifyToken, async (req, res) => {
  try {
    const ViewIssue = await Issue.find({ Users: req.params.id }, null, {
      sort: { _id: -1 }
    });
    // const FinalIssueDetails = await getUserDetailsWithIsuueDetails(ViewIssue);
    // console.log(FinalIssueDetails[1]);
    res.send(ViewIssue);
  } catch (err) {
    res.json(err);
  }
});

const getUserDetailsWithIsuueDetails = async IssueDetails => {
  let arrayOfIssueWithUserDetails = [];
  arrayOfIssueWithUserDetails.push(IssueDetails);
  for (let i = 0; i < IssueDetails.Users.length; i++) {
    const UserId = IssueDetails.Users[0];
    arrayOfIssueWithUserDetails.push(await getIndividualUserDetails(UserId));
  }

  return arrayOfIssueWithUserDetails;
};
const getIndividualUserDetails = async UserId => {
  let UserDetails = await User.findById(UserId);
  if (!UserDetails) {
    console.log("User not found");
  } else {
    return UserDetails;
  }
};

// @route       post /AddMessage
// @desc        To Add User message
// @access      Public
router.post("/AddMessage/:Username/:id", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    const Username = req.params.Username;
    const UpdateIssue = await Issue.updateOne(
      { _id: req.params.id },
      {
        $push: {
          message: {
            $each: [{ message: message, user: Username }],
            $position: 0
          }
        }
      }
    );
    console.log(UpdateIssue);
    if (!UpdateIssue) {
      res.status(400).send("Somthing went wrong");
    } else {
      res.status(200).send({ message: "Sucessfully added" });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
