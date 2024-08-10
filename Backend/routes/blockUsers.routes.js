
const express = require("express");
const { getBlockUsers, unblockUser, blockUser } = require("../controllers/blockUsers.controller");
const { blockMember } = require("../controllers/blockMembers.controllers");
const {adminAuth} = require("../middleware/adminAuth.middleware")

const blockUserRoute = express.Router();

blockUserRoute.route("/").get(getBlockUsers); //get
blockUserRoute.route("/block").post(adminAuth,blockUser);  // block
blockUserRoute.route("/unblock").post(adminAuth,unblockUser);  // unblock


module.exports = {
    blockUserRoute
}