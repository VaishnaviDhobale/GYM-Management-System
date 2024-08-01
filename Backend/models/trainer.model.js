const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    availability: {
      type: [String], // Array of available times
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const TrainerModel = mongoose.model("trainers", trainerSchema);

module.exports = {
  TrainerModel,
};
