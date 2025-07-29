// Needed Resources 
// Needed Resources (ONE TIME ONLY)
const express = require("express")
const router = new express.Router()
const accountCont = require("../controllers/accountController")
const utilities = require("../utilities") // Assuming this is correct path
const regValidate = require("../utilities/account-validation")

// All your route definitions go here, using the 'router' declared above

// Route to build login view
router.get("/login", utilities.handleErrors(accountCont.buildLogin));

// Route to build register view
router.get("/register", utilities.handleErrors(accountCont.buildRegister));

// ... other routes using this 'router' instance ...

// And finally, export the router so your main app can use it
module.exports = router;