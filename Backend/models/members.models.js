const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAuth",
  },

  membershipType: {
    type: String,
    // required: true,
  },

  allergies: {
    type: [String],
    required: true,
  },

  medicalConditions: {
    type: [String],
    required: true,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MemberModel = mongoose.model("members", memberSchema);

module.exports = {
  MemberModel,
};
