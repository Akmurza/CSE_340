// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const asyncHandler = require("../middleware/asyncHandler")

// Route to build inventory by classification view
router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId));

// Route to build inventory detail view
router.get("/detail/:inv_id", asyncHandler(invController.buildDetailView));

module.exports = router; 