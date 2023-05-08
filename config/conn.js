const mongoose = require('mongoose')

// This is the connection to the database
// process.env.MONGO_URI is the environment variable that's storing the connection string

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
    } catch (err){
        console.log(err)
    }
}

module.exports = connectDB