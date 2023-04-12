const express = require("express");
const router  = express.Router();
const caseController = require('../controllers/caseController')

router.route('/getall')
    .get(caseController.getAllCases)

module.exports = router