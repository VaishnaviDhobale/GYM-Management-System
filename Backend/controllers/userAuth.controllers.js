const JWT = require("jsonwebtoken"); // For generate unique token
const bcrypt = require("bcrypt"); // To hash password
const { UserModel } = require("../models/userAuth.model");

// Registration
const addUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    // Password getttinh hash using bcrypt
    bcrypt.hash(password, 5, async (error, hash) => {
      if (hash) {
        const user = new UserModel({ name, email, password: hash, contact });
        await user.save();
        res.status(200).send({ success: "New User Successfully Added!" });
      } else if (error) {
        res
          .status(500)
          .send({ error: "An error occurred while adding the user." });
      }
    });
  } catch (error) {
    res.status(400).send({ error: "An error occurred while adding the user." });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Get user email from db
    const user = await UserModel.findOne({ email });

    // Compare password using bcrypt
    bcrypt.compare(password, user.password, async (error, pass) => {
      if (pass) {
        const userToken = JWT.sign({ text: "GYMUser" }, "GYMUser"); // User token created
        res.status(200).send({
          success: "User has successfully logged in!",
          userToken,
        });
      } else {
        res.status(400).send({
          error:
            "Invalid credentials. Please check your email and password and try again.",
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing the login request." });
  }
};

// Get all user data
const allUserData = async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send({ error: "No user found" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });

    if (user) {
      await UserModel.findOneAndUpdate({ _id: id }, req.body);
      res
        .status(200)
        .send({ success: `${user.name}'s details updated successfully!` });
    } else {
      res.status(404).send({ error: `User not found with this id ${id}` });
    }
  } catch (error) {
    console.error("Error updating user:", error); // Log the error for debugging
    res.status(500).send({
      error:
        "An error occurred while updating user details. Please try again later.",
      details: error.message, // Including error message details can be useful for debugging
    });
  }
};

// Find user by email 
const userByEmail = async (req, res) => {
    try {
      const email = req.params.email;
      const user = await UserModel.find({ email: email });
  
      if (user.length > 0) {
        res
          .status(200)
          .send({
            success: "An user with the provided email already exists.",
            user,
          });
      } else {
        res.status(400).send({ error: "No user found with the provided email." });
      }
    } catch (error) {
      res
        .status(500)
        .send({
          error:
            "An error occurred while fetching user details. Please try again later.",
          error,
        });
    }
  };

//   Delete user 
const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        await UserModel.findOneAndDelete({ _id: id });
        res
          .status(200)
          .send({ success: `${user.name}'s account deleted successfully!` });
      } else {
        res
          .status(400)
          .send({ error: `No user found with the provided ID: ${id}` });
      }
    } catch (error) {
      res.status(500).send({ error: "An error occurred while deleting user." });
    }
  };

  // Delete All users 
  const deleteAllUsers = async (req, res) => {
    try {
      await UserModel.deleteMany({});
      res.status(200).send({ success: 'All users deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete all users',details: error.message });
    }
  };
module.exports = {
  addUser,
  loginUser,
  allUserData,
  updateUser,
  userByEmail,
  deleteUser,
  deleteAllUsers
};
