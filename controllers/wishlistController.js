const utilities = require("../utilities/")
const wishlistModel = require("../models/wishlist-model")

const wishlistController = {}

wishlistController.buildWishlist = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    const accountId = res.locals.accountData.account_id
    const items = await wishlistModel.getWishlistByAccountId(accountId)
    res.render("wishlist/management", {
      title: "My Wishlist",
      nav,
      items,
    })
  } catch (error) {
    next(error)
  }
}

wishlistController.addItem = async function (req, res, next) {
  try {
    const accountId = res.locals.accountData.account_id
    const inv_id = parseInt(req.body.inv_id)
    const addResult = await wishlistModel.addWishlistItem(accountId, inv_id)

    if (addResult) {
      req.flash("notice", "Added to wishlist")
    } else {
      req.flash("notice", "Item already in wishlist")
    }
    return res.redirect("/wishlist")
  } catch (error) {
    next(error)
  }
}

wishlistController.removeItem = async function (req, res, next) {
  try {
    const accountId = res.locals.accountData.account_id
    const inv_id = parseInt(req.body.inv_id)
    const removeResult = await wishlistModel.removeWishlistItem(accountId, inv_id)

    if (removeResult) {
      req.flash("notice", "Removed from wishlist")
    } else {
      req.flash("notice", "Item not found in wishlist")
    }
    return res.redirect("/wishlist")
  } catch (error) {
    next(error)
  }
}

module.exports = wishlistController
