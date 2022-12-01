// this is the claim data model
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const claimSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,   
    },
    desc: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean, 
        default: false,
    },
    source: {
        file: { type: Buffer, required: true },
        filename: { type: String, required: true },
        mimetype: { type: String, required: true }
      }
},

{
    timestamps: true // gives us both createdAt and updatedAt
}
)

// auto increment plug in allows us to increment id starting at a 1000 and not a random.
claimSchema.plugin(AutoIncrement,{
    inc_field: 'claimNumber',
    id: 'claimNums',
    start_seq: 1000, 
});

module.exports = mongoose.model('Claim', claimSchema)