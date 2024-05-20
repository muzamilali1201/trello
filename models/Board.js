const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Board",
  mongoose.Schema(
    {
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        required: true,
      },
      members: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
      labels: [String],
    },
    {
      timestamps: true,
    }
  )
);
