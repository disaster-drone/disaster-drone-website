// this is the claim data model
const mongoose = require('mongoose')

const caseSchema = new mongoose.Schema({
    name: String,
    client: String,
    completed: Boolean,
    desc: String,
    zipUrl: String,
    csvUrl: String, 
    images: Array,
    agent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Case', caseSchema)