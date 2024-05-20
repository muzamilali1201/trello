const { date } = require("joi");
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Card",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    listId: {
      type: mongoose.Schema.ObjectId,
      ref: "List",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    checkList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CheckList",
      },
    ],
    dueDate: {
      type: Date,
    },
    labels: [String],
  })
);
