const express = require("express");
const {
  getAllPackages,
  addPackage,
  updatePackage,
  packageById,
  deletePackage,
  deleteAll,
} = require("../controllers/packages.controllers");

const {adminAuth} = require("../middleware/adminAuth.middleware")
const upload = require("../middleware/upload.middleware")

// create route for packages
const packageRouter = express.Router();

// Packages routes start
packageRouter.route("/").get(getAllPackages); //  get all packages.
packageRouter.route("/addPackage/:adminId").post(adminAuth, upload.single("thumbnail") , addPackage); //  add package.
packageRouter.route("/updatePackage/:id").patch( adminAuth, upload.single("thumbnail"),updatePackage); //  update package.
packageRouter.route("/packageById/:id").get(packageById); //  find package by id.
packageRouter.route("/deletePackage/:id").delete(adminAuth, deletePackage); //  delete package.
packageRouter.route("/deleteAll").delete(adminAuth,deleteAll); // delete all
// Packages routes ends

module.exports = {
  packageRouter,
};
