const express = require("express");
const {
  addAdmin,
  adminLogin,
  getAllAdmins,
  updateAdmin,
  adminByEmail,
  deleteAdmin,
  adminById,
} = require("../controllers/adminAuth.controllers");

const {adminAuth} = require("../middleware/adminAuth.middleware");
const upload = require("../middleware/upload.middleware")


const adminRouter = express.Router(); // create route for admin auth

// Admin routes start 
adminRouter.route("/addAdmin").post(adminAuth,upload.single("profileImg"), addAdmin); //  registration
adminRouter.route("/login").post(adminLogin); //  login
adminRouter.route("/").get(getAllAdmins); //  get all admins
adminRouter.route("/adminById/:id").get(adminById); //  get admin by id
adminRouter.route("/updateAdmin/:id").put(adminAuth ,updateAdmin); //  update admin details
adminRouter.route("/adminByEmail/:email").get(adminAuth, adminByEmail); //  check admin present or not n=by gmail
adminRouter.route("/deleteAdmin/:id").delete(adminAuth, deleteAdmin); //  delete admin
// Admin routes ends 


module.exports = {
  adminRouter,
};
