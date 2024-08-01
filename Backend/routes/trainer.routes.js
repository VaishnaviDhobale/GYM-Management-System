const express = require("express");


const {adminAuth} = require("../middleware/adminAuth.middleware")
const upload = require("../middleware/upload.middleware");
const { getTrainers, addTrainers, updateTrainers, deleteTrainers, checkTrainerPresentAlredyOrNot } = require("../controllers/trainers.controllers");

// create route for trainers
const trainerRouter = express.Router();

// trainers routes start
trainerRouter.route("/").get(getTrainers); //get all trainers.
trainerRouter.route("/addTrainer").post(adminAuth, upload.single("profileImg"),addTrainers); //add trainers.
trainerRouter.route("/updateTrainer/:id").patch(adminAuth,upload.single("profileImg"),updateTrainers); //update trainers.
trainerRouter.route("/deleteTrainer/:id").delete(adminAuth,deleteTrainers); //delete trainers.
trainerRouter.route("/checkTrainerByEmail/:emailId").get(adminAuth,checkTrainerPresentAlredyOrNot); // check trainer alredy exists using email Id.
// trainers routes ends

module.exports = {
    trainerRouter,
};


