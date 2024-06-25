const express = require("express");
const {
  getAllPackages,
  addPackage,
  updatePackage,
  packageById,
  deletePackage,
} = require("../controllers/packages.controllers");

const {adminAuth} = require("../middleware/adminAuth.middleware")

// create route for packages
const packageRouter = express.Router();

// Packages routes start
packageRouter.route("/").get(getAllPackages); //  get all packages.
packageRouter.route("/addPackage").post(adminAuth, addPackage); //  add package.
packageRouter.route("/updatePackage/:id").patch(adminAuth, updatePackage); //  update package.
packageRouter.route("/packageById/:id").get(packageById); //  find package by id.
packageRouter.route("/deletePackage/:id").delete(adminAuth, deletePackage); //  delete package.
// Packages routes ends

module.exports = {
  packageRouter,
};
