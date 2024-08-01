const express = require("express");

const {
  addUser,
  loginUser,
  allUserData,
  updateUser,
  userByEmail,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/userAuth.controllers");

const { adminAuth } = require("../middleware/adminAuth.middleware");

const userRouter = express.Router(); // Create route for user auth

// User routes start
userRouter.route("/addUser").post(addUser); //  registration
userRouter.route("/login").post(loginUser); //  login
userRouter.route("/").get(allUserData); //  All users
userRouter.route("/updateUser/:id").patch(updateUser); //  update user details
userRouter.route("/userByEmail/:email").get(userByEmail); //  find user by email
userRouter.route("/deleteUser/:id").delete(adminAuth, deleteUser); //  delete user
userRouter.route("/deleteAllUsers").delete(adminAuth, deleteAllUsers); //  delete user
// User routes ends

module.exports = {
  userRouter,
};
