
const express = require("express");
const { getBlockUsers, unblockUser, blockUser } = require("../controllers/blockUsers.controller");
const { blockMember } = require("../controllers/blockMembers.controllers");

const blockUserRoute = express.Router();

blockUserRoute.route("/").get(getBlockUsers); //get
blockUserRoute.route("/block").post(blockUser);  // block
blockUserRoute.route("/unblock").post(unblockUser);  // unblock


module.exports = {
    blockUserRoute
}