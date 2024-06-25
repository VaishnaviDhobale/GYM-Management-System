const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    durationInMonths: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    features: {
        type: [String], 
    },
    discount: {
        type: Number, 
        default: 0,
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
