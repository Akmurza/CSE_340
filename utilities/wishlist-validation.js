const { body, validationResult } = require("express-validator")
const validate = {}

validate.itemRules = () => {
  return [
    body("inv_id")
      .trim()
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("Inventory id required"),
  ]
}

validate.checkItemData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("notice", errors.array().map((e) => e.msg).join(" "))
    return res.redirect(req.get("referer") || "/wishlist")
  }
  next()
}

module.exports = validate
