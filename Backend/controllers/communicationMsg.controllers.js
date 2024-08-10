const { MsgModel } = require("../models/communicationMsg.model");
const { MemberModel } = require("../models/members.models");

// Send msg
const sendMsg = async (req, res) => {
  try {
    // const msgType = req.body.msgType;
    const msg = new MsgModel(req.body);
    if (msg) {
      await msg.save();
      res.status(200).send({ success: "Message sent securely to all." });
    } else {
      res.status(400).send({ error: "Unable to send message." });
    }
  } catch (error) {
    res.status(500).send({ error: "Unable to send message.", error });
  }
};

// Get msgs
const getMsgs = async (req, res) => {
  try {
    const msg = await MsgModel.find().populate("sender");
    // console.log('Populated Messages:', msg); // Debugging log
    console.log(msg)
    if (msg.length > 0) {
      return res.status(200).send(msg);
    } else {
      return res.status(200).send({ error: "No message available." });
    }
  } catch (error) {
    console.error("Error fetching messages:", error); // Debugging log
    return res
      .status(500)
      .send({ error: "Unable to get message.", details: error });
  }
};

// Delete msg
const deleteMsg = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await MsgModel.findOneAndDelete({ _id: id });
    if (response) {
      res.status(200).send({ success: `Message successfully deleted.` });
    } else {
      res.status(400).send({ error: `Message not found with this id ${id}` });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Unable to delete message.", details: error });
  }
};

// Update msg
const updateMsg = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const response = await MsgModel.findOneAndUpdate({ _id: id }, req.body);
    if (response) {
      res.status(200).send({success : `Message updated successfully with this id ${id}`});
    } else {
      res.status(400).send({error : `Message not found with rhis id ${id}`});
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unable to update message.", details: error });
  }
};

module.exports = {
  sendMsg,
  getMsgs,
  deleteMsg,
  updateMsg,
};
