const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const regValidate = require("../utilities/account-validation")
const accountController = require("../controllers/accountController")
const asyncHandler = require("../middleware/asyncHandler")

router.get("/login", asyncHandler(accountController.buildLogin))

router.get("/register", asyncHandler(accountController.buildRegister))

// Process the registration data
router.post(
	"/register",
	regValidate.registationRules(),
	regValidate.checkRegData,
	asyncHandler(accountController.registerAccount)
)

router.get("/", asyncHandler(accountController.buildAccountManagement))

router.post(
	"/login",
	regValidate.loginRules(),
	regValidate.checkLoginData,
	asyncHandler(accountController.accountLogin)
)

module.exports = router
