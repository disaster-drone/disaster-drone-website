const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.route('/uploadfile')
  .post(fileController.upload)

router.route('/downloadfile')
  .get(fileController.downloadIntoMemory)

router.route('/listfiles')
  .get(fileController.getListFiles)

router.route('/makepublic')
  .get(fileController.makePublic)

router.route('/listimages')
  .get(fileController.getListImages)  

router.route('/listbuckets')
  .get(fileController.getListBuckets)

router.route('/getpins')
  .get(fileController.getPins)
  
module.exports = router;