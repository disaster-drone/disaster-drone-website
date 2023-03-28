const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController') //importing the userControllers

// this will match the /users.
// .get -> any get request that comes to our /users
// and same goes for the rest.
// CRUD -> Create 

const verifyJWT = require('../middleware/verifyJWT') //importing the verifyJWT middleware
router.use(verifyJWT) //this will apply the verifyJWT middleware to all the routes in this file


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router