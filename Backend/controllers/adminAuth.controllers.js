const { AdminModel } = require("../models/adminAuth.model");
const JWT = require("jsonwebtoken"); // For generate unique token
const bcrypt = require("bcrypt"); // To hash password
const { uploadOnClaoudinary } = require("../utils/cloudinary");
const fs = require("fs");

// Add admin
const addAdmin = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded." });
    }

    const responseFromCloudinary = await uploadOnClaoudinary(req.file.path);
    if (responseFromCloudinary.url) {
      fs.unlinkSync(req.file.path); // Remove file after uploading
    } else {
      return res
        .status(500)
        .send({ error: "Failed to upload image to Cloudinary." });
    }

    // Hash the password using bcrypt
    bcrypt.hash(password, 5, async (error, hash) => {
      if (error) {
        console.error("Error hashing password:", error);
        return res
          .status(500)
          .send({ error: "Failed to hash the password.", details: error });
      }

      const admin = new AdminModel({
        name,
        email,
        password: hash,
        contact,
        profileImg: responseFromCloudinary.url,
      });

      try {
        await admin.save();
        res.status(200).send({ success: "New GYM Admin Successfully Added!" });
      } catch (saveError) {
        console.error("Error saving admin:", saveError);
        res
          .status(500)
          .send({ error: "Failed to save the admin.", details: saveError });
      }
    });
  } catch (error) {
    console.error("Error in addAdmin:", error);
    res.status(400).send({
      error: "An error occurred while adding the GYM Admin.",
      details: error,
    });
  }
};

// Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Get admin email from db
    const admin = await AdminModel.findOne({ email });
    // Compare password using bcrypt
    if (admin) {
      bcrypt.compare(password, admin.password, async (error, pass) => {
        if (pass) {
          const adminToken = JWT.sign({ text: "GYMAdmin" }, "GYMAdmin"); // Admin token created
          res.status(200).send({
            success: "GYM Admin has successfully logged in!",
            adminToken,
            adminId: admin._id,
            profileImg:admin.profileImg,
          });
        } else {
          res.status(400).send({
            error: "Invalid password.",
          });
        }
      });
    } else {
      // User not found, send a message indicating the need for registration
      res.status(400).send({
        error:
          "It seems like you're new here. To proceed, please register an account.",
      });
    }
  } catch (error) {
    // Handle other errors
    res
      .status(500)
      .send({ error: "An error occurred while processing the login request." });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const adminData = await AdminModel.find();
    res.status(200).send(adminData);
  } catch (error) {
    res.status(500).send({ error: "Server Error", details : error });
  }
};

// Get admin by id
const adminById = async(req,res) =>{
  const id = req.params.id;
  // console.log(id)
  try{
    const admin = await AdminModel.findOne({_id:id});
    // console.log(admin)
    if(admin){
      res.status(200).send(admin);
    }else{
      res.status(400).send({error : `Admin not found with id ${id}.`})
    }
  }catch(error){
    res.status(500).send({ error: "Server Error", details : error });
  }
}

// Update Admin details
const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await AdminModel.findOne({ _id: id });

    if (admin) {
      await AdminModel.findOneAndUpdate({ _id: id }, req.body);
      res
        .status(200)
        .send({ success: `${admin.name}'s details updated successfully!` });
    } else {
      res.status(404).send({ error: `Admin not found with this id ${id}` });
    }
  } catch (error) {
    console.error("Error updating admin:", error); // Log the error for debugging
    res.status(500).send({
      error:
        "An error occurred while updating admin details. Please try again later.",
      details: error.message, // Including error message details can be useful for debugging
    });
  }
};

//   Find admin by email
const adminByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const admin = await AdminModel.find({ email: email });

    if (admin.length > 0) {
      console.log(admin, email);
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    res.status(500).send({
      error:
        "An error occurred while fetching admin details. Please try again later.",
      error,
    });
  }
};

//   delete admin
const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await AdminModel.findOne({ _id: id });
    if (admin) {
      await AdminModel.findOneAndDelete({ _id: id });
      res
        .status(200)
        .send({ success: `${admin.name}'s account deleted successfully!` });
    } else {
      res
        .status(400)
        .send({ error: `No admin found with the provided ID: ${id}` });
    }
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting admin." });
  }
};
module.exports = {
  adminById,
  addAdmin,
  adminLogin,
  getAllAdmins,
  updateAdmin,
  adminByEmail,
  deleteAdmin,
};
