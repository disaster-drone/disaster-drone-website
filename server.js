// express is for building REST APIs.
// body-parser helps to parse the request and create the req.body object.

// installs the module that loads environment variables from a .env file into process.env file.
// This lets you separate configuration files from the code.
require('dotenv').config()

//installs the web framework for Node.js. (It will make our life easier.)
const express = require('express')
const app = express(); 
const bodyParser = require('body-parser')
const path = require ('path')
const { logger } = require ('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
//installs a Node.js package that allows cross origin resource sharing.
const cors = require('cors')
const mongoose = require('mongoose')
const corsOptions = require('./config/corsOptions')

// Connect to MongoDB
const connectDB = require('./config/conn')

const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB() 

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser()) // this allows us to parse cookies.

app.use ('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/files', require('./routes/index.js'))
app.use('/cases', require('./routes/caseRoutes.js'))
app.use('/uploads', require('./routes/index.js'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json( { message: '404 Not Found.'})
    } else {
        res.type('txt').send('404 Not Found.')
    }
})

app.use(errorHandler)

// app.listen only listens for requests once the connection to the database is established.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB.')
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})