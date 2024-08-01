const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Protein', 'Vitamins', 'Minerals', 'Amino Acids', 'Pre-Workout', 'Post-Workout', 'Others'],
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    default: 0,
  },
  stock: {
    type: String,
    required: true,
    min: 0,
  },

  thumbnail: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'adminAuth',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the supplement schema
const SupplementModel = mongoose.model('supplementStore', supplementSchema);

module.exports = {
    SupplementModel
};
