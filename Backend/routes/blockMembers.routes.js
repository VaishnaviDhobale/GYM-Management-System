
const express = require("express");
const {adminAuth} = require("../middleware/adminAuth.middleware")
const { getBlockMembers, blockMember, unblockMember } = require("../controllers/blockMembers.controllers");

const blockMembersRoute = express.Router();

blockMembersRoute.route("/").get(getBlockMembers); //get
blockMembersRoute.route("/block").post(adminAuth,blockMember);  // block member
blockMembersRoute.route("/unblock").post(adminAuth,unblockMember);  // unblock member

module.exports = { 
    blockMembersRoute
}