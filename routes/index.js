const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");


// This is the routes for the files controller, functions in fileController.js
// The string in the .route() method is the endpoint
// would be called in POSTMAN with http://localhost:3500/files/endpoint
// contected in server.js

router.route('/listfiles')
  .get(fileController.getListFiles)

router.route('/listimages')
  .get(fileController.getListImages)  

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