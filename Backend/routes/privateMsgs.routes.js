const express = require("express");

const { adminAuth } = require("../middleware/adminAuth.middleware");
const {
  getAllPrivateMsgs,
  addPrivateMsg,
  deletePrivateMsg,
} = require("../controllers/privateMsgs.controller");

// create route for private msgs
const privateMsgRouter = express.Router();

// private Msg routes start
privateMsgRouter.route("/").get(getAllPrivateMsgs); //get all private msgs.
privateMsgRouter.route("/sendMsg").post(adminAuth, addPrivateMsg); //send private msgs.
privateMsgRouter.route("/deleteMsg/:id").delete(adminAuth, deletePrivateMsg); //delete private msgs.
// private msg routes ends

module.exports = {
  privateMsgRouter,
};
