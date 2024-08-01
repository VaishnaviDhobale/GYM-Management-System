const mongoose = require("mongoose");

const privateMsgsSchema = mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  msgType: {
    type: String,
    enum: ["General", "Alert"],
    default : "General",
    required: true,
  },
  user : {
    type : String,
    enum : ["Admin", "Member"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the admin who send the msg
    ref: "adminAuth",
    required: true,
  },
  sendTo: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the admin who will recive the msg
    ref: "members",
    required: true,
  },
});

const PrivateMsgModel = mongoose.model("privateMsgs", privateMsgsSchema);

module.exports = {
  PrivateMsgModel,
};
