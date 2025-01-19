
const mongoose = require('mongoose')
const chalk = require('chalk')
async function mongoDB() {
    try {
        const uri = process.env.ENVIRONMENT === 'deveLopment' ? process.env.ATLAS_LOCAL_URI : process.env.MONGO_LOCAL_URI
        const loc = process.env.ENVIRONMENT === 'deveLopment' ? 'Atlas' : 'Local'
        await mongoose.connect(uri)
        console.log(chalk.greenBright(`✔ ${loc} Connected Successfully`))
    } catch (error) {
        console.error(chalk.redBright(`✖ ${loc} Connection Failed`))
        console.error(JSON.stringify({
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        }, null, 2))
        process.exit(1)
    }
}

module.exports = mongoDB
