
const fs = require('fs')
const path = require('path')

function logErrorToFile(statusCode, message) {
    const logDir = path.join(__dirname, '../logs')
    const logFileName = `${new Date().toISOString().split('T')[0]}.log`
    const logFilePath = path.join(logDir, logFileName)
    // const errorLogPath = path.join(__dirname, 'errorLogs.txt')
    // const logMessage = `${new Date().toISOString()} - ${statusCode} - ${message}\n`

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
    }
    const logEntry = ` 
    ${new Date().toISOString()} | Status: ${statusCode} | Error: ${message}\n
    `
    fs.appendFileSync(logFilePath, logEntry, 'utf8')
}



module.exports = logErrorToFile 
