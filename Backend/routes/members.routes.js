
const express = require("express");
const { addMember, getAllMembers, getMemberById, updateMember, deleteMember } = require("../controllers/members.controller");
const {adminAuth} = require("../middleware/adminAuth.middleware");
const {userAuth} = require("../middleware/userAuth.middleware")
const memberRouter = express.Router();

// Member routes start 
memberRouter.route("/addMember").post(addMember); // add member
memberRouter.route("/").get(adminAuth ,getAllMembers); // get all members
memberRouter.route("/memberById/:id").get(adminAuth, getMemberById); // get member by id
memberRouter.route("/updateMember/:id").patch(adminAuth, updateMember); // update member by id
memberRouter.route("/deleteMember/:id").delete(adminAuth, deleteMember); // delete member by id
// Member routes ends


module.exports = {
    memberRouter
}