const{ format } = require('date-fns') // allowing us to date our logs.
const { v4: uuid } = require('uuid') // destucturing v4 and renaming it uuid 
const fs = require('fs') // the file system module that comes directly from node
const fsPromises = require('fs').promises
const path = require('path')

// helper function that logs events.
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '../logs'))){
            await fsPromises.mkdir(path.join(__dirname, '../logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '../logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger}