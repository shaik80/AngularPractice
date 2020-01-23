const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  Severity: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  ResolvedDate: {
    type: String
  },
  message: [
    {
      message: {
        type: String
      },
      user: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Issue", IssueSchema);
