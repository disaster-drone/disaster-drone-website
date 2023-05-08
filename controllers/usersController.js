// This is the controller for the users route. 
const User = require('../models/User')
require('express-async-errors');
const asyncHandler = require('express-async-handler') // this keeps us from using so many try catch blocks as we use async 
                                                    // methods with mongoose as we try to save and use data with mongoDB.
const bcrypt = require('bcrypt') // need this to hash the password before we save it.

// controller function.
// @ [desc of the function] get all users 
// @ [the method/the route] GET /users
// @ [the access] Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean() // ('-password') do not return the userpassword. .lean() - only json data without extras.

    if(!users?.length) { // if there are no users found.
        return res.status(400).json({error: 'No users found'})
    }
    
    // we are returning the users.
    res.json(users)
})
    
// @ desc Create new user
// @ route POST /users
// @ access Private
const createNewUser = asyncHandler(async (req, res) => {
    // getting data from the frontend, we destructure the data from the body.
    const { username, email, firstName, lastName, password, roles} = req.body 

    // confirm data given from the frontend to create a new user.
    if(!username || !password || !firstName || !lastName || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    //check for duplicate username
    const duplicateUsername = await User.findOne({ username }).lean().exec() // exec -> 

    if(duplicateUsername) {
        return res.status(400).json({message: 'User with that username already exists'})
    }

    //check for duplicate email
    const duplicateEmail = await User.findOne({ email }).lean().exec() // exec -> 

    if(duplicateEmail) {
        return res.status(400).json({message: 'User with that email already exists'})
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12) // salt rounds 

    // create user object before we save it.
    const userObject = { username, email, firstName, lastName, 'password': hashedPassword, roles}

    // create and store new user.
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({message: `New User ${username} has been created.`}) //created
    } else {
        res.status(400).json({message: 'Invalid user data received.'})
    }


})

// @ desc Update a user
// @ route PATCH /users
// @ access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, firstName, lastName, roles, active, password } = req.body

    // confirm data 
    if(!id || !username || !email || !firstName || !lastName || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec() // not calling lean bc we need this to be a mongoose document.

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    //check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // allow updates to orignal user.
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate user'})
    }

    user.username = username
    user.email = email
    user.firstName = firstName  
    user.lastName = lastName
    user.roles = roles
    user.active = active

    // if we are given a password, then we can update it.
    if(password){
        // hash the the new password
        user.password = await hash(password, 12) // 12 salt rounds
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated successfully`})

})

// @ desc Delete a user
// @ route DELETE /users
// @ access Private
const deleteUser = asyncHandler(async (req, res) => {
    // destructure the data coming from the request body
    const { id }  = req.body

    //confirm the data
    if(!id){
        return res.status(400).json({message: 'User ID required'})
    }

    // now check if the user exist to delete.
    const user = await User.findById(id).exec()

    // if there is no user found, return error.
    if(!user){
        return res.status(400).json({message: 'User not found'})
    } 

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted successfully`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}