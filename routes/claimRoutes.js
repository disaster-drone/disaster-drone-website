const express = require('express')
const router = express.Router()
const claimsController = require('../controllers/claimsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(claimsController.getAllClaims)
    .post(claimsController.createNewClaim)
    .patch(claimsController.updateClaim)
    .delete(claimsController.deleteClaim)

module.exports = router