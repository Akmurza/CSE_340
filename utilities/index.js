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
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
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
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
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
  
  // Image section
  detail += '<div class="vehicle-image">'
  detail += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />'
  detail += '</div>'
  
  // Details section
  detail += '<div class="vehicle-details">'
  detail += '<div class="vehicle-price">'
  detail += '<span class="label">Price:</span> '
  detail += '<span class="value">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
  detail += '</div>'
  
  detail += '<div class="vehicle-description">'
  detail += '<span class="label">Description:</span> '
  detail += '<span class="value">' + vehicle.inv_description + '</span>'
  detail += '</div>'
  
  detail += '<div class="vehicle-year">'
  detail += '<span class="label">Year:</span> '
  detail += '<span class="value">' + vehicle.inv_year + '</span>'
  detail += '</div>'
  
  detail += '<div class="vehicle-mileage">'
  detail += '<span class="label">Mileage:</span> '
  detail += '<span class="value">' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles</span>'
  detail += '</div>'
  
  detail += '<div class="vehicle-color">'
  detail += '<span class="label">Color:</span> '
  detail += '<span class="value">' + vehicle.inv_color + '</span>'
  detail += '</div>'
  
  detail += '</div>'
  detail += '</div>'
  
  return detail
}

module.exports = Util