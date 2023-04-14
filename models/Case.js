// this is the claim data model
const mongoose = require('mongoose')

const caseSchema = new mongoose.Schema({
    name: String,
    client: String,
    completed: Boolean,
    desc: String,
    zipUrl: String,
    csvNames: Array,
    csvUrl: String, 
    images: Object,
    agent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Case', caseSchema)