const Util = {}
const invModel = require("../models/inventory-model")
/* ************************
 * Constructs the classification list dropdown HTML
 * ************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  // ... (rest of your buildClassificationList code)
  return classificationList
}

/* ****************************************
* Get all classification data
* **************************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    let nav = '<ul>'
    nav += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        nav += '<li><a href="/inv/type/' + row.classification_id + '" title="See our ' + row.classification_name + ' vehicles">' + row.classification_name + '</a></li>'
    })
    nav += '</ul>'
    return nav
}

/* ****************************************
* Middleware For Handling Errors
* Wraps a function in a try-catch to handle errors
**************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util