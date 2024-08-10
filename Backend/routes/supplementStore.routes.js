const express = require("express");


const {adminAuth} = require("../middleware/adminAuth.middleware")
const upload = require("../middleware/upload.middleware");
const { getAllSupplement, addSupplements, updateSupplement, getSupplementById, deleteSupplement, deleteAllSupplements } = require("../controllers/supplementStore.controllers");

// create route for supplement store
const supplementRouter = express.Router();

// supplement routes start

supplementRouter.route("/").get(getAllSupplement); //get all supplement.
supplementRouter.route("/supplementById/:id").get(getSupplementById); //get all supplement.
supplementRouter.route("/addSupplement/:adminId").post(adminAuth,upload.single("thumbnail"), addSupplements); //add supplement.
supplementRouter.route("/updateSupplement/:id").patch(adminAuth,upload.single("thumbnail"), updateSupplement); //update supplement.
supplementRouter.route("/deleteSupplement/:id").delete(adminAuth,deleteSupplement); //delete supplement.
supplementRouter.route("/deleteAllSupplement").delete(adminAuth,deleteAllSupplements); //delete all supplements.

// supplement routes ends

module.exports = {
    supplementRouter,
};


