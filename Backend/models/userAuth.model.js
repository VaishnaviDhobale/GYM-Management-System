const mongoose = require("mongoose");

// User schema
const userSchema = mongoose.Schema({
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

  DOB: {
    type: Date,
    // required: true,
  },

  gender: {
    type: String,
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//  User model
const UserModel = mongoose.model("userAuth", userSchema);

module.exports = {
  UserModel,
};
