const { PrivateMsgModel } = require("../models/privateMsgs.model");

// Get all private msgs 
const getAllPrivateMsgs = async (req, res) => {
  try {
    const response = await PrivateMsgModel.find().populate({
        path: 'sendTo',
        populate: { path: 'createdBy' }  // Populate the createdBy field within sendTo
      });

    if (response.length > 0) {
      res.status(200).send(response);
    } else {
      res.status(400).send({ error: "Dont have private msgs yet." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: `Server issue detected. Please attempt the request again. ${error}`,
    });
  }
};

// Add private msgs
const addPrivateMsg = async(req,res) => {
    // console.log(req.body)
    try{
        const msg = new PrivateMsgModel(req.body);
        if(msg){
           await msg.save();
           res.status(200).send({ success: `Message securely delivered to ${req.body.sendTo}.` });
        }else{
           res.status(400).send({ error: `Failed to deliver the message.` });
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
          error: `Server issue detected. Please attempt the request again. ${error}`,
        });
    }
}

// Delete private msgs 
const deletePrivateMsg = async(req,res) => {
    try{
        const id = req.params.id;
        const msg = PrivateMsgModel.findOne({_id:id});
        if(msg){
            await PrivateMsgModel.findOneAndDelete({_id:id});
            res.status(200).send({success : `Message with id "${id}" deleted successfully.`});
        }else{
            res.status(400).send({error : `Message with id "${id}" not Found.`});
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
          error: `Server issue detected. Please attempt the request again. ${error}`,
        });
    }
}


module.exports = {
  getAllPrivateMsgs,
  addPrivateMsg,
  deletePrivateMsg
};
