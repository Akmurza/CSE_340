const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const asyncHandler = require("../middleware/asyncHandler")
const invValidate = require("../utilities/inventory-validation")

router.get("/", asyncHandler(invController.buildManagement))

router.get("/add-classification", asyncHandler(invController.buildAddClassification))

router.post(
	"/add-classification",
	invValidate.classificationRules(),
	invValidate.checkClassificationData,
	asyncHandler(invController.addClassification)
)

router.get("/add-inventory", asyncHandler(invController.buildAddInventory))

router.post(
	"/add-inventory",
	invValidate.inventoryRules(),
	invValidate.checkInventoryData,
	asyncHandler(invController.addInventory)
)

router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId))

router.get("/detail/:inv_id", asyncHandler(invController.buildDetailView))

module.exports = router 