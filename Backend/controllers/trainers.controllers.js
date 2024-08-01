const { TrainerModel } = require("../models/trainer.model");
const { uploadOnClaoudinary } = require("../utils/cloudinary");
const fs = require("fs");

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await TrainerModel.find();
    if (trainers.length > 0) {
      res.status(200).send(trainers);
    } else {
      res
        .status(400)
        .send({ error: `Currently, there are no trainers available.` });
    }
  } catch (error) {
    res.status(500).send({ error: `Server Error ${error}` });
  }
};

// Add trainers
const addTrainers = async (req, res) => {
  try {
    // Clodinary starts
    const responseFromClodinary = await uploadOnClaoudinary(req.file.path);
    if (responseFromClodinary.url) {
      fs.unlinkSync(req.file.path);
    }
    // Clodinary ends

    const trainer = new TrainerModel({
      ...req.body,
      profileImg: responseFromClodinary.url,
    });
    if (trainer) {
      await trainer.save();
      res.status(200).send({ success: `New trainer added.` });
    } else {
      res.status(400).send({ error: `Not able to add new trainer.` });
    }
  } catch (error) {
    res.status(500).send({ error: `Server error ${error}` });
  }
};

// Update trainers
const updateTrainers = async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  try {
    const trainer = TrainerModel.findOne({ _id: id });
    if (trainer) {
      if (req.file) {
        // Clodinary starts
        const responseFromClodinary = await uploadOnClaoudinary(req.file.path);
        if (responseFromClodinary.url) {
          fs.unlinkSync(req.file.path);
        }
        // Clodinary ends

        await TrainerModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, profileImg: responseFromClodinary.url }
        );
        res
          .status(200)
          .send({ success: `Trainer details updated successfully.` });
      } else {
        await TrainerModel.findOneAndUpdate({ _id: id }, req.body);
        res
          .status(200)
          .send({ success: `Trainer details updated successfully.` });
      }
    } else {
      res.status(400).send({ error: `Trainer not found with this id ${id}.` });
    }
  } catch (error) {
    res.status(500).send({ error: `Server Error ${error}` });
  }
};

// Delete trainers
const deleteTrainers = async (req, res) => {
  try {
    const id = req.params.id;
    const trainer = TrainerModel.findOne({ _id: id });
    if (trainer) {
      await TrainerModel.findOneAndDelete({ _id: id });
      res
        .status(200)
        .send({ success: `Trainer with id "${id}" deleted successfully.` });
    } else {
      res.status(400).send({ error: `Trainer with id "${id}" not found.` });
    }
  } catch (error) {
    res.status(500).send({ error: `Server Error ${error}` });
  }
};

// Returns true or false when email id alredy exists.
const checkTrainerPresentAlredyOrNot = async (req, res) => {
  try {
    const emailId = req.params.emailId;
    const trainer = await TrainerModel.find({ email: emailId });

    if (!trainer.length==0) {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: `Server error: ${error.message}` });
  }
};

module.exports = {
  getTrainers,
  addTrainers,
  updateTrainers,
  deleteTrainers,
  checkTrainerPresentAlredyOrNot
};
