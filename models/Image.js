// this is the claim data model
const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema(
{
    name: String,
    caseID: String,
    url: String,
    contentType: String,
 },

{
    timestamps: true // gives us both createdAt and updatedAt
}
)

module.exports = mongoose.model('Image', imageSchema)