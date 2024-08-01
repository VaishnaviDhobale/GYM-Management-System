
const express = require("express");
const { addMember, getAllMembers, getMemberById, updateMember, deleteMember, deleteAllMembers } = require("../controllers/members.controller");
const {adminAuth} = require("../middleware/adminAuth.middleware");
const {userAuth} = require("../middleware/userAuth.middleware")
const memberRouter = express.Router();

// Member routes start 
memberRouter.route("/addMember").post(addMember); // add member
memberRouter.route("/").get(getAllMembers); // get all members
memberRouter.route("/memberById/:id").get(getMemberById); // get member by id
memberRouter.route("/updateMember/:id").put(adminAuth, updateMember); // update member by id
memberRouter.route("/deleteMember/:id").delete(adminAuth, deleteMember); // delete member by id
memberRouter.route("/deleteAllMembers").delete(adminAuth, deleteAllMembers); // delete all members
// Member routes ends


module.exports = {
    memberRouter
}