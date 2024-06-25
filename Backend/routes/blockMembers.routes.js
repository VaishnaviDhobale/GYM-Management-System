
const express = require("express");
const { getBlockMembers, blockMember, unblockMember } = require("../controllers/blockMembers.controllers");

const blockMembersRoute = express.Router();

blockMembersRoute.route("/").get(getBlockMembers); //get
blockMembersRoute.route("/block").post(blockMember);  // block
blockMembersRoute.route("/unblock").post(unblockMember);  // unblock

module.exports = { 
    blockMembersRoute
}