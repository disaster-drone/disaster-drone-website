const express = require("express");
const router  = express.Router();
const caseController = require('../controllers/caseController')

// controller file for the caseController functions

router.route('/getall')
    .get(caseController.getAllCases)

module.exports = router