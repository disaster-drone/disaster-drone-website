const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.route('/')
  .post(fileController.upload)
  //.get(fileController.getListFiles)
  .get(fileController.download)

module.exports = router;