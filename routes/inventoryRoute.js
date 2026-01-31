const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const asyncHandler = require("../middleware/asyncHandler")

router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId))

router.get("/detail/:inv_id", asyncHandler(invController.buildDetailView))

module.exports = router 