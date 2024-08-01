
const mongoose = require("mongoose");

// Admin schema 
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    profileImg : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//  Admin model 
const AdminModel = mongoose.model("adminAuth", adminSchema);

module.exports = {
    AdminModel
}