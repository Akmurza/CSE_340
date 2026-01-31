const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    
    if (!data || data.length === 0) {
      const err = new Error("Classification not found")
      err.status = 404
      return next(err)
    }
    
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const vehicle = await invModel.getVehicleById(inv_id)
    
    if (!vehicle) {
      const err = new Error("Vehicle not found")
      err.status = 404
      return next(err)
    }
    
    const detailView = await utilities.buildVehicleDetail(vehicle)
    let nav = await utilities.getNav()
    const title = vehicle.inv_make + " " + vehicle.inv_model
    
    res.render("./inventory/vehicle-detail", {
      title: title,
      nav,
      detailView,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont