const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

invCont.buildManagement = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } catch (error) {
    next(error)
  }
}

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

invCont.buildAddClassification = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

invCont.addClassification = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    const { classification_name } = req.body
    const addResult = await invModel.addClassification(classification_name)

    if (addResult) {
      nav = await utilities.getNav()
      req.flash("notice", "Classification added ok")
      res.status(201).render("./inventory/management", {
        title: "Inventory Management",
        nav,
      })
    } else {
      req.flash("notice", "Classification add fail")
      res.status(501).render("./inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

invCont.buildAddInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    res.render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

invCont.addInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    } = req.body

    const addResult = await invModel.addInventory(
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color
    )

    if (addResult) {
      req.flash("notice", "Inventory item added ok")
      nav = await utilities.getNav()
      res.status(201).render("./inventory/management", {
        title: "Inventory Management",
        nav,
      })
    } else {
      let classificationList = await utilities.buildClassificationList(classification_id)
      req.flash("notice", "Inventory add fail")
      res.status(501).render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: null,
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = invCont