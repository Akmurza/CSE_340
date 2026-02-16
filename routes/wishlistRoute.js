const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const wishlistController = require("../controllers/wishlistController")
const asyncHandler = require("../middleware/asyncHandler")
const wishlistValidate = require("../utilities/wishlist-validation")

router.get("/", utilities.checkLogin, asyncHandler(wishlistController.buildWishlist))

router.post(
  "/add",
  utilities.checkLogin,
  wishlistValidate.itemRules(),
  wishlistValidate.checkItemData,
  asyncHandler(wishlistController.addItem)
)

router.post(
  "/remove",
  utilities.checkLogin,
  wishlistValidate.itemRules(),
  wishlistValidate.checkItemData,
  asyncHandler(wishlistController.removeItem)
)

module.exports = router
