const express = require("express");
const {
  addAdmin,
  adminLogin,
  getAllAdmins,
  updateAdmin,
  adminByEmail,
  deleteAdmin,
} = require("../controllers/adminAuth.controllers");

const {adminAuth} = require("../middleware/adminAuth.middleware")

const adminRouter = express.Router(); // create route for admin auth

// Admin routes start 
adminRouter.route("/addAdmin").post(addAdmin); //  registration
adminRouter.route("/login").post(adminLogin); //  login
adminRouter.route("/").get(adminAuth ,getAllAdmins); //  get all admins
adminRouter.route("/updateAdmin/:id").patch(adminAuth ,updateAdmin); //  update admin details
adminRouter.route("/adminByEmail/:email").get(adminAuth, adminByEmail); //  update admin details
adminRouter.route("/deleteAdmin/:id").delete(adminAuth, deleteAdmin); //  delete admin
// Admin routes ends 


module.exports = {
  adminRouter,
};
