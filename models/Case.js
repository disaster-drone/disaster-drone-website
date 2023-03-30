// this is the claim data model
const mongoose = require('mongoose')
const caseSchema = new mongoose.Schema(
{
    id: {
        type: String,
        required: true,
    },
    caseAllImages:[imageSchema],
    casePinnedImages:[imageSchema],
    clientName: {
        type: String,
        required: false,   
    },
    completed: {
        type: Boolean, 
        default: false,
    },
    source: {
        file: { type: Buffer, required: false },
        filename: { type: String, required: false },
        mimetype: { type: String, required: false }
      }
    },

{
    timestamps: true // gives us both createdAt and updatedAt
}
)

module.exports = mongoose.model('Case', caseSchema)