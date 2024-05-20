const mongoose = require("mongoose");

module.exports = mongoose.model(
  "CheckList",
  mongoose.Schema({
    title: {
      type: String,
    },
    items: {
      type: [
        {
          title: {
            type: String,
            default: "Default Task",
          },
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  })
);
