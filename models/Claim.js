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
    desc: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean, 
        default: false,
    }
},

{
    timestamps: true // gives us both createdAt and updatedAt
}
)

claimSchema.plugin(AutoIncrement,{
    inc_field: 'claimNumber',
    id: 'claimNums',
    start_seq: 500, 
});

module.exports = mongoose.model('Claim', claimSchema)