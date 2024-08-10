const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    durationInMonths: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: [String], 
        required: true,
    },
    discount: {
        type: String, 
        default: 0,
        required: true,
    },
    thumbnail : {
       type : String,
       require : true
      },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the admin who created the package
        ref: 'adminAuth',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PackageModel = mongoose.model("packages", packageSchema);

module.exports = {
  PackageModel,
};
