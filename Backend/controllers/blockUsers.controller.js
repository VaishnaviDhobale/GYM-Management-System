
const { BlockUserModel } = require("../models/blockUsers.model");
const { UserModel } = require("../models/userAuth.model");

// Get all block users
const getBlockUsers = async (req, res) => {
  try {
    const blockedUsers = await BlockUserModel.find();
    if (blockedUsers.length > 0) {
      res.status(200).send(blockedUsers);
    } else {
      res
        .status(400)
        .send({ error: "There are currently no users in the block list." });
    }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while getting blocked users.",
      error,
    });
  }
};

// Block user
const blockUser = async (req, res) => {
  try {
    
    const { _id, ...userDetails } = req.body;

    const blockUserInstance = new BlockUserModel(userDetails);
    const savedUser = await blockUserInstance.save();

    if (savedUser) {
      await UserModel.findOneAndDelete({ _id });
      return res
        .status(200)
        .send({ success: "The user has been successfully blocked." });
    } else {
      return res.status(400).send({
        error: "An error occurred while attempting to block the user.",
      });
    }
  } catch (error) {
    console.error("Error blocking user:", error);
    return res.status(500).send({
      error: "Unable to block the user due to an error.",
      details: error.message,
    });
  }
};

// Unblock user
const unblockUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    if (user) {
      await user.save();
      await BlockUserModel.findOneAndDelete({ _id: req.body._id });
      res
        .status(200)
        .send({ success: `${req.body.name} is now unblocked.` });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unable to unblock the user due to an error.", error });
  }
};

module.exports = {
  getBlockUsers,
  blockUser,
  unblockUser,
};
