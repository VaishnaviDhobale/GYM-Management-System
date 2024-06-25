const mongoose = require("mongoose");

const blockMembersSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAuth",
  },

  membershipType: {
    type: String,
    required: true,
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

const BlockMembersModel = mongoose.model("blockMembers", blockMembersSchema);

module.exports = {
  BlockMembersModel,
};
