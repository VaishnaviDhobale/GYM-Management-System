const mongoose = require("mongoose");

const feeReceiptSchema = mongoose.Schema({
  forMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "members",
  },

  FeeTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "feeTransaction",
  },

  signature : {
    type : String,
    required : true
  },

  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "adminAuth"
  },

  createdAt : {
    type : Date,
    default: Date.now
  }

});

const FeeReceiptModel = mongoose.model("feeReceipt", feeReceiptSchema);

module.exports = {
  FeeReceiptModel,
};
