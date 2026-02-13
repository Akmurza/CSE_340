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

router.get("/", utilities.checkLogin, asyncHandler(accountController.buildAccountManagement))

// Deliver account update view
router.get(
	"/update/:account_id",
	utilities.checkLogin,
	asyncHandler(accountController.buildAccountUpdate)
)

router.post(
	"/login",
	regValidate.loginRules(),
	regValidate.checkLoginData,
	asyncHandler(accountController.accountLogin)
)

// Process account update
router.post(
	"/update",
	utilities.checkLogin,
	regValidate.updateAccountRules(),
	regValidate.checkUpdateData,
	asyncHandler(accountController.updateAccount)
)

// Process password update
router.post(
	"/update-password",
	utilities.checkLogin,
	regValidate.updatePasswordRules(),
	regValidate.checkPasswordData,
	asyncHandler(accountController.updatePassword)
)

// Logout
router.get("/logout", utilities.checkLogin, asyncHandler(accountController.accountLogout))

module.exports = router
