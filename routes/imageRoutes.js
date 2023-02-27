const express = require("express");
const router = express.Router();
const fileController = require("../controllers/imageController");

router.route('/')
  .get(fileController.getImages)

module.exports = router;