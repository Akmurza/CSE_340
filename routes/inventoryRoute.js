const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const asyncHandler = require("../middleware/asyncHandler")
const invValidate = require("../utilities/inventory-validation")

router.get("/", utilities.checkAccountType, asyncHandler(invController.buildManagement))

router.get("/add-classification", utilities.checkAccountType, asyncHandler(invController.buildAddClassification))

router.post(
	"/add-classification",
	utilities.checkAccountType,
	invValidate.classificationRules(),
	invValidate.checkClassificationData,
	asyncHandler(invController.addClassification)
)

router.get("/add-inventory", utilities.checkAccountType, asyncHandler(invController.buildAddInventory))

router.post(
	"/add-inventory",
	utilities.checkAccountType,
	invValidate.inventoryRules(),
	invValidate.checkInventoryData,
	asyncHandler(invController.addInventory)
)

// View to edit inventory item
router.get("/edit/:inv_id", utilities.checkAccountType, asyncHandler(invController.editInventoryView))

// Process inventory update
router.post(
  "/update",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  asyncHandler(invController.updateInventory)
)

router.get("/getInventory/:classification_id", utilities.checkAccountType, asyncHandler(invController.getInventoryJSON))

router.get("/type/:classificationId", asyncHandler(invController.buildByClassificationId))

router.get("/detail/:inv_id", asyncHandler(invController.buildDetailView))

module.exports = router 