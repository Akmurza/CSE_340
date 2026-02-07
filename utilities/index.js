const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list += '<a href="/inv/type/' + row.classification_id + '" title="See our inventory of ' + row.classification_name + ' vehicles">'
    list += row.classification_name
    list += "</a></li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid = ""
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li><a href="../../inv/detail/'+ vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model + 'details">'
      grid += '<img src="' + vehicle.inv_thumbnail + '" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice"><hr /><h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2><span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span></div></li>'
    })
    grid += '</ul>'
  } else { 
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **********************
 * Build vehicle detail HTML
 * ******************** */
Util.buildVehicleDetail = async function(vehicle) {
  let detail = '<div class="vehicle-detail-container">'
  detail += '<div class="vehicle-image">'
  detail += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />'
  detail += '</div>'
  detail += '<div class="vehicle-details">'
  detail += '<div class="vehicle-price"><span class="label">Price:</span> <span class="value">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span></div>'
  detail += '<div class="vehicle-description"><span class="label">Description:</span> <span class="value">' + vehicle.inv_description + '</span></div>'
  detail += '<div class="vehicle-year"><span class="label">Year:</span> <span class="value">' + vehicle.inv_year + '</span></div>'
  detail += '<div class="vehicle-mileage"><span class="label">Mileage:</span> <span class="value">' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles</span></div>'
  detail += '<div class="vehicle-color"><span class="label">Color:</span> <span class="value">' + vehicle.inv_color + '</span></div>'
  detail += '</div></div>'
  return detail
}

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList = '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

module.exports = Util