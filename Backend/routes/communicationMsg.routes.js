

const express = require("express");
const {adminAuth} = require("../middleware/adminAuth.middleware")
const { sendMsg, getMsgs, deleteMsg, updateMsg } = require("../controllers/communicationMsg.controllers");

const msgRouter = express.Router();
msgRouter.route("/sendMsg").post(adminAuth,sendMsg);
msgRouter.route("/").get(getMsgs);
msgRouter.route("/deleteMsg/:id").delete(adminAuth,deleteMsg);
msgRouter.route("/updateMsg/:id").patch(adminAuth,updateMsg);


module.exports = {
    msgRouter
}