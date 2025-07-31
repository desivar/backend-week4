// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const errorController = require("../controllers/errorController")
const utilities = require("../utilities")
const invValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Inventory management
router.get("/", utilities.handleErrors(invController.buildInvManagement));

// Add new classification page
router.get("/addclass", utilities.handleErrors(invController.buildAddClassification));

// Add new classification form processing
router.post('/process-add-classification',
    invValidate.classificationRules(),
    utilities.handleErrors(invValidate.checkClassification),
    utilities.handleErrors(invController.processAddNewClassification));

// Add new inventory page
router.get("/addvehicle", utilities.handleErrors(invController.buildAddInventory));

// Route to build 500 error page
router.get("/err", utilities.handleErrors(errorController.build500Page));

// Route to build inventory item by id
router.get("/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

module.exports = router;