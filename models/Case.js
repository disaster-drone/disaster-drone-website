// Used mongoose for MongoDB, using to create schema that will be used in the database.
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