const mongoose = require("mongoose");

module.exports = mongoose.model(
  "List",
  mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      boardId: {
        type: mongoose.Schema.ObjectId,
        ref: "Board",
      },
    },
    {
      timestamps: true,
    }
  )
);
