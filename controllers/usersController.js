const User = require('../models/User')
const Claim = require('../models/Claim') 
require('express-async-errors');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @ desc get all users
// @ route GET /users
// @ access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({error: 'No users found'})
    }
    
    res.json(users)
})
    
// @ desc Create new user
// @ route POST /users
// @ access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, firstName, lastName, password, role} = req.body

    // confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }
    //check for duplicate
    const duplicate = await User.findOne({user}).lean().exec()

    if(duplicate) {
        return res.status(400).json({message: 'User with that username already exists'})
    }

    // hash password
    const hashedPassword = await hash(password, 12) // salt rounds 

    // create user object
    const userObject = { username,  firstName, lastName, 'password': hashedPassword, roles}

    // create and store new user.
    const user = await User.create(userObject)

    if (user) {
        res.status(201).json({message: `New User ${username} created`}) //created
    } else {
        res.status(400).json({message: 'invalid user data received'})
    }


})

// @ desc Update a user
// @ route PATCH /users
// @ access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, firstName, lastName, roles, active, password } = req.body

    // confirm data 
    if(!id || !username || !firstName || !lastName || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec() 

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    //check for duplicate
    const duplicate = await User.findOne({user}).lean().exec()
    // allow updates to orignal user.
    if(duplicate && duplicate?.id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate user'})
    }

    user.username = username
    user.firstName = firstName
    user.lastName = lastName
    user.roles = roles
    user.active = active

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
    const {id} = req.body
    if(!id){
        return res.status(400).json({message: 'User ID required'})
    }

    const claim = await Claim.findOne({ user: id }).lean().exec()
    if(claim){
        return res.status(400).json({message: 'User has claims. Cannot delete'})
    }

    const user = await user.findById(id).exec()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    } 

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted successfully`

    repsonse.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}