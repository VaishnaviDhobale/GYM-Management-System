

const express = require("express");
const { sendMsg, getMsgs, deleteMsg, updateMsg } = require("../controllers/communicationMsg.controllers");

const msgRouter = express.Router();
msgRouter.route("/sendMsg").post(sendMsg);
msgRouter.route("/").get(getMsgs);
msgRouter.route("/deleteMsg/:id").delete(deleteMsg);
msgRouter.route("/updateMsg/:id").put(updateMsg);


module.exports = {
    msgRouter
}