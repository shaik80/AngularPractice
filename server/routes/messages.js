const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issue = require("../models/issue.models");
const Message = require("../models/message.models");
const { verifyToken } = require("./verifyToken");

// @route       post /AddMessage
// @desc        To Add User message
// @access      Public
router.post("/AddMessage/:Username/:id", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    const { Username, id } = req.params;
    let messages = new Message({
      message,
      Username
    });
    await messages.save(() => {
      updateMessageIntoIssue(req, res, messages._id, id);
    });
  } catch (err) {
    res.json(err);
  }
});

updateMessageIntoIssue = async (req, res, messageId, id) => {
  const UpdateIssue = await Issue.updateOne(
    { _id: id },
    {
      $push: {
        message: {
          $each: [messageId],
          $position: 0
        }
      }
    }
  );
  if (!UpdateIssue) {
    res.status(400).send("Somthing went wrong");
  } else {
    res.status(200).send({ message: "Sucessfully added" });
  }
};
module.exports = router;
