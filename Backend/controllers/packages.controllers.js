const { PackageModel } = require("../models/package.model");
const { uploadOnClaoudinary } = require("../utils/cloudinary");
const fs = require("fs");

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find().populate("createdBy");
    res.status(200).send(packages);
  } catch (error) {
    res.status(400).send({ error: "Failed to fetch packages.", error });
  }
};

// Add package
const addPackage = async (req, res) => {
  console.log(req.body);
  const adminId = req.params.adminId;
  // console.log(adminId,"adminId")
  try {
    const {
      name,
      durationInMonths,
      price,
      originalPrice,
      description,
      features,
      discount,
      createdBy,
    } = req.body;

    const responseFromClodinary = await uploadOnClaoudinary(req.file.path);
    if (responseFromClodinary.url) {
      fs.unlinkSync(req.file.path);
    }
    const newPackage = new PackageModel({
      name,
      durationInMonths,
      price,
      originalPrice,
      description,
      features,
      discount,
      thumbnail: responseFromClodinary.url,
      createdBy: adminId,
    });

    await newPackage.save();

    res.status(200).send({ success: "New Package Successfully Added!" });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: "An error occurred while adding the package.",
      details: error.message,
    });
  }
};

// Update
const updatePackage = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.body,"or",req.file,"from update package")
    const package = await PackageModel.findOne({ _id: id });
    console.log(package);
    if (package) {
      if (req.file) {
        const responseFromClodinary = await uploadOnClaoudinary(req.file.path);
        if (responseFromClodinary.url) {
          fs.unlinkSync(req.file.path);
        }

        await PackageModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, thumbnail: responseFromClodinary.url }
        );
      }else{
        await PackageModel.findOneAndUpdate({ _id: id }, req.body);
      }

      res.status(200).send({
        success: `Package '${package.name}' created by ${package.createdBy} has been updated successfully.`,
      });
    } else {
      res.status(400).send({
        error: `No package found with this package id ${package._id}`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while updating package.", error });
  }
};

// Find package by id
const packageById = async (req, res) => {
  try {
    const id = req.params.id;
    const package = await PackageModel.findOne({ _id: id });
    if (package) {
      res.status(200).send(package);
    } else {
      res.status(400).send({ error: `Package with id ${id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while finding package.", error });
  }
};

// Delete
const deletePackage = async (req, res) => {
  try {
    const id = req.params.id;
    const package = await PackageModel.findOne({ _id: id });
    if (package) {
      await PackageModel.findOneAndDelete({ _id: id });
      res.status(200).send({
        success: `Package '${package.name}' has been deleted successfully.`,
      });
    } else {
      res.status(400).send({ error: `Package with id ${id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting package.", error });
  }
};

// Delete all packages
const deleteAll = async (req, res) => {
  try {
    await PackageModel.deleteMany();
    res.status(200).send({ success: "All packages have been deleted" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
};

module.exports = {
  getAllPackages,
  addPackage,
  updatePackage,
  packageById,
  deletePackage,
  deleteAll,
};
