require('dotenv').config()
const express = require('express');
const app = express(); // create an express app
const path = require('path'); // path is a built-in module
const { logger, logEvents } = require('./middleware/logger'); // import logger middleware
const { errorHandler } = require('./middleware/errorHandler'); // error handler middleware
const cookieParser = require('cookie-parser'); // for paring cookies
const cors = require('cors'); // Cross-Origin Resource Sharing 
const corsOptions = require('./config/corsOptions'); // import corsOptions
const connectDB = require('./config/dbConn'); // import database connection
const mongoose = require('mongoose'); // import mongoose
const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV)

connectDB() // connect to database


app.use(logger);

app.use(cors(corsOptions))

app.use(cors)

app.use(express.json()) // parse JSON bodies

app.use(cookieParser()); //now we can parse cookies we reveive as well.

// telling express to use the public folder for static assets like css and js
app.use('/', express.static(path.join(__dirname, 'public')));

// telling express to use the views folder for our views
app.use('/', require('./routes/root'))

app.use('/users', require('./routes/userRoutes'))

// this is the catch all route, if no other route is matched, send the index.html file
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) { //if json req that was not routed prooperly
        res.json({error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to database')
    app.listen(PORT, () => { console.log('Server is running on port ' + PORT) });
})

mongoose.connection.on('error', (err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log')
})
