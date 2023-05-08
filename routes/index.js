const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// this is the router file for the fileController functions

// const verifyJWT = require('../middleware/verifyJWT') //importing the verifyJWT middleware
// router.use(verifyJWT) //this will apply the verifyJWT middleware to all the routes in this file

router.route('/listfiles')
  .get(fileController.getListFiles)

router.route('/listimages')
  .get(fileController.getListImages)  

router.route('/listbuckets')
  .get(fileController.getListBuckets)

router.route('/getpins')
  .get(fileController.getPins)

router.route('/getzip')
  .get(fileController.getZip)

// this is creating the obects at the start.
router.route('/createcases')
  .get(fileController.createNewObject)

// this is to update the case for when the user is done with the VR env.
router.route('/updatecases')
  .get(fileController.updateCase)
  
module.exports = router;