// const BlockMembersModel = require("../models/blockMembers.model");

const { BlockMembersModel } = require("../models/blockMembers.model");
const { MemberModel } = require("../models/members.models");

// Get all block members
const getBlockMembers = async (req, res) => {
  try {
    const blockedMembers = await BlockMembersModel.find().populate("createdBy");
    // if (blockedMembers.length > 0) {
      res.status(200).send(blockedMembers);
    // } else {
    //   res
    //     .status(400)
    //     .send({ error: "There are currently no members in the block list." });
    // }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while getting blocked members.",
      error,
    });
  }
};

// Block member
const blockMember = async (req, res) => {
  try {
    const blockMember = new BlockMembersModel(req.body);
    const savedMember = await blockMember.save();

    if (savedMember) {
      await MemberModel.findOneAndDelete({ _id: req.body._id });
      return res
        .status(200)
        .send({ success: "The member has been successfully blocked." });
    } else {
      return res
        .status(400)
        .send({
          error: "An error occurred while attempting to block the member.",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .send({
        error: "Unable to block the member due to an error.",
        details: error,
      });
  }
};

// Unblock member
const unblockMember = async (req, res) => {
  try {
    const member = new MemberModel(req.body);
    if(member){
      await member.save();
      await BlockMembersModel.findOneAndDelete({_id : req.body._id});
      res.status(200).send({success : `${req.body.createdBy.name} is now unblocked.`});
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unable to unblock the member due to an error.", error });
  }
};

module.exports = {
  getBlockMembers,
  blockMember,
  unblockMember,
};
