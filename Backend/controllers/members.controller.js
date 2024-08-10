const { MemberModel } = require("../models/members.models");

// Add member
const addMember = async (req, res) => {
  try {
    // const createdBy = req.body.createdBy;
    const member = new MemberModel(req.body);
    await member.save();
    await member.populate("createdBy");
    res.status(201).send({ success: `New member added.`, member });
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while adding member.",
      details: error.message,
    });
  }
};


// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await MemberModel.find().populate("createdBy");
    // if (members && members.length > 0) {
      res.status(200).send(members);
    // } else {
    //   res
    //     .status(400)
    //     .send({ error: "No members found. Please add members first." });
    // }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while finding members.",
      details: error.message,
    });
  }
};


// Get member by id
const getMemberById = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await MemberModel.findOne({ _id: id }).populate("createdBy");

    if (member) {
      res.status(200).send(member);
    } else {
      res.status(400).send({ error: `No member found with this id ${id}` });
    }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while finding member.",
      details: error.message,
    });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await MemberModel.findOne({ _id: id });
    if (member) {
      await MemberModel.findOneAndUpdate({ _id: id }, req.body);
      res
        .status(200)
        .send({ success: `${member._id}'s details updated successfully!` });
    } else {
      res.status(400).send({ error: `No member found with this id ${id}` });
    }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while updating member.",
      details: error.message,
    });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await MemberModel.findOne({ _id: id });
    if (member) {
      await MemberModel.findOneAndDelete({ _id: id });
      res.status(200).send({
        success: `Member with this id ${member._id} deleted successfully!`,
      });
    } else {
      res.status(400).send({ error: `No member found with this id ${id}` });
    }
  } catch (error) {
    res.status(500).send({
      error: "An error occurred while deleting member.",
      details: error.message,
    });
  }
};

// Delete All members 
const deleteAllMembers = async (req, res) => {
  try {
    await MemberModel.deleteMany({});
    res.status(200).send({ success: 'All members deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete all members',details: error.message });
  }
};

module.exports = {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  deleteAllMembers
};
