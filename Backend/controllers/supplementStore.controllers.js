const { SupplementModel } = require("../models/supplementStore.model");
const { uploadOnClaoudinary } = require("../utils/cloudinary");
const fs = require("fs");

// Get all supplement
const getAllSupplement = async (req, res) => {
  try {
    const supplement = await SupplementModel.find().populate("createdBy");
    if (supplement) {
      res.status(200).send(supplement);
    } else {
      res
        .status(400)
        .send({ error: "The store is currently out of supplements." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Get supplement by Id
const getSupplementById = async (req, res) => {
  const id = req.params.id;
  try {
    const supplement = await SupplementModel.findOne({ _id: id }).populate("createdBy");
    if (supplement) {
      res.status(200).send(supplement);
    } else {
      res.status(400).send({ error: `No supplement found with ID: ${id}.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Add supplement
const addSupplements = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const {
      name,
      category,
      description,
      originalPrice,
      discount,
      stock,
      features,
    } = req.body;

    const responseFromClodinary = await uploadOnClaoudinary(req.file.path);
    if (responseFromClodinary.url) {
      fs.unlinkSync(req.file.path);
    }

    const newSupplement = new SupplementModel({
      name,
      category,
      description,
      originalPrice,
      discount,
      stock,
      features,
      thumbnail: responseFromClodinary.url,
      createdBy: adminId,
    });

    await newSupplement.save();

    res.status(200).send({ success: "New Supplement Successfully Added!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Update supplement
const updateSupplement = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    // console.log(req.body,"or",req.file,"from update supplement")
    const supplement = await SupplementModel.findOne({ _id: id });
    console.log(supplement);
    if (supplement) {
      if (req.file) {
        const responseFromClodinary = await uploadOnClaoudinary(
          req.file.path
        );
        if (responseFromClodinary.url) {
          fs.unlinkSync(req.file.path);
        }

        await SupplementModel.findOneAndUpdate(
          { _id: id },
          { ...req.body, thumbnail: responseFromClodinary.url }
        );
      }else{
        await SupplementModel.findOneAndUpdate({_id:id},req.body);
      }

      res.status(200).send({
        success: `Supplement '${supplement.name}' created by ${supplement.createdBy} has been updated successfully.`,
      });
    } else {
      res.status(400).send({
        error: `No supplement found with this supplement id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Delete supplement
const deleteSupplement = async (req, res) => {
  const id = req.params.id;
  try {
    const supplement = await SupplementModel.findOne({ _id: id });
    if (supplement) {
      await SupplementModel.findOneAndDelete({ _id: id });
      res.status(200).send({
        success: `Successfully deleted the supplement with ID: ${id}.`,
      });
    } else {
      res.status(400).send({ error: `Supplement with ID ${id} not found.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Delete all supplements
const deleteAllSupplements = async (req, res) => {
  try {
    const supplement = await SupplementModel.find();
    if (supplement.length > 0) {
      await SupplementModel.deleteMany({});
      res
        .status(200)
        .send({ message: "All supplements were deleted successfully." });
    } else {
      res.status(400).send({ error: "Currently, there are no supplements." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};
module.exports = {
  getAllSupplement,
  addSupplements,
  updateSupplement,
  getSupplementById,
  deleteSupplement,
  deleteAllSupplements,
};
