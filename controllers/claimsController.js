const Claim = require('../models/Claim')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all claims 
// @route GET /claims
// @access Private
const getAllClaims = asyncHandler(async (req, res) => {
    // Get all claims from MongoDB
    const claims = await Claim.find().lean()

    // If no claims 
    if (!claims?.length) {
        return res.status(400).json({ message: 'No claims found' })
    }

    // Add username to each claim before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const claimsWithUser = await Promise.all(claims.map(async (claim) => {
        const user = await User.findById(claim.user).lean().exec()
        return { ...claim, username: user.username }
    }))

    res.json(claimsWithUser)
})

// @desc Create new claim
// @route POST /claims
// @access Private
const createNewClaim = asyncHandler(async (req, res) => {
    const { user, title, clientName, desc } = req.body

    // Confirm data
    if (!user || !title || !desc || !clientName) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Claim.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate claim title' })
    }

    // Create and store the new user 
    const claim = await Claim.create({ user, title, desc })

    if (claim) { // Created 
        return res.status(201).json({ message: 'New claim created' })
    } else {
        return res.status(400).json({ message: 'Invalid claim data received' })
    }

})

// @desc Update a claim
// @route PATCH /claims
// @access Private
const updateClaim = asyncHandler(async (req, res) => {
    const { id, user, title, desc, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !desc || !clientName || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm claim exists to update
    const claim = await Claim.findById(id).exec()

    if (!claim) {
        return res.status(400).json({ message: 'Claim not found' })
    }

    // Check for duplicate title
    const duplicate = await Claim.findOne({ title }).lean().exec()

    // Allow renaming of the original claim 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate claim title' })
    }

    claim.user = user
    claim.title = title
    claim.desc = desc
    claim.clientName = clientName
    claim.completed = completed

    const updatedNote = await claim.save()

    res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete a claim
// @route DELETE /claims
// @access Private
const deleteClaim = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Claim ID required' })
    }

    // Confirm claim exists to delete 
    const claim = await Claim.findById(id).exec()

    if (!claim) {
        return res.status(400).json({ message: 'Claim not found' })
    }

    const result = await claim.deleteOne()

    const reply = `Claim '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllClaims,
    createNewClaim,
    updateClaim,
    deleteClaim
}