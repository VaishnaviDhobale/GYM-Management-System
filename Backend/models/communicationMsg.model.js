const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminAuth",
  },


  createdAt: {
    type: Date,
    default: Date.now,
  }

});

const MsgModel = mongoose.model("messages", msgSchema);

module.exports = {
  MsgModel,
};
