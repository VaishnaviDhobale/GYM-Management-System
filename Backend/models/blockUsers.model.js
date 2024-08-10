const mongoose = require("mongoose");

const blockUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlockUserModel = mongoose.model("blockUsers", blockUserSchema);

module.exports = {
  BlockUserModel,
};
