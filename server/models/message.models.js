const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String
  },
  user: {
    type: String
  }
});

module.exports = mongoose.model("Message", MessageSchema);
