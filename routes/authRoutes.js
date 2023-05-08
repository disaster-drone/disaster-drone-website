const express = require("express");
const router  = express.Router();
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

// This is the routes for the login, refresh, and logout
// The string in the .route() method is the endpoint
// would be called in POSTMAN with http://localhost:3500/auth/endpoint
// contected in server.js

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router