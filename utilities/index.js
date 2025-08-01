const Util = {}
const invModel = require("../models/inventory-model")

/* ************************
 * Constructs the classification list dropdown HTML
 * ************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList = '<select name="classification_id" id="classificationList">';
  classificationList += "<option>Choose a Classification</option>";
  if (data && data.rows) {
    data.rows.forEach((row) => {
      classificationList += `<option value="${row.classification_id}"`;
      if (
        classification_id != null &&
        row.classification_id == classification_id
      ) {
        classificationList += " selected ";
      }
      classificationList += `>${row.classification_name}</option>`;
    });
  }
  classificationList += "</select>";
  return classificationList;
};

/* ****************************************
 * Builds the classification grid
 * **************************************** */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model
      + 'details"><img src="' + vehicle.inv_thumbnail
      + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
      + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* ****************************************
 * Get all classification data
 * **************************************** */
Util.getNav = async function () {
    let data = await invModel.getClassifications()
    let nav = '<ul>'
    nav += '<li><a href="/" title="Home page">Home</a></li>'
    if (data && data.rows) {
        data.rows.forEach((row) => {
            nav += '<li><a href="/inv/type/' + row.classification_id + '" title="See our ' + row.classification_name + ' vehicles">' + row.classification_name + '</a></li>'
        })
    }
    nav += '</ul>'
    return nav
}


/* ****************************************
* Middleware For Handling Errors
* Wraps a function in a try-catch to handle errors
**************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util