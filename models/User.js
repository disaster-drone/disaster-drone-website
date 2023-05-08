// this is the user data model
// Used mongoose for MongoDB, using to create schema that will be used in the database.
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: { 
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        default: 'Agent'
    }],
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', UserSchema)