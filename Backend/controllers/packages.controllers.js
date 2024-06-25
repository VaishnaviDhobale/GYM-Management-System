const { PackageModel } = require("../models/package.model");

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find();
    res.status(200).send(packages);
  } catch (error) {
    res.status(400).send({ error: "Failed to fetch packages.", error });
  }
};

// Add package
const addPackage = async (req, res) => {
  try {
    console.log(req.body);
    const newPackage = new PackageModel(req.body);
    await newPackage.save();
    res.status(200).send({ success: "New Package Successfully Added!" });
  } catch (error) {
    res
      .status(400)
      .send({ error: "An error occurred while adding package.", error });
  }
};

// Update
const updatePackage = async (req, res) => {
  try {
    const id = req.params.id;
    const package = await PackageModel.findOne({ _id: id });
    if (package) {
      await PackageModel.findOneAndUpdate({ _id: id }, req.body);
      res
        .status(200)
        .send({
          success: `Package '${package.name}' created by ${package.createdBy} has been updated successfully.`,
        });
    } else {
      res
        .status(400)
        .send({
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
      res
        .status(200)
        .send({
          success: `Package '${package.name}' created by ${package.createdBy} has been deleted successfully.`,
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


module.exports = {
  getAllPackages,
  addPackage,
  updatePackage,
  packageById,
  deletePackage,
};
