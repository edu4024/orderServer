const mongoose = require('mongoose')
const config = require('./../config/database.json')

mongoose.connect(`mongodb+srv://${config.user}:${config.password}@clusteredu.nmsqu.mongodb.net/${config.dbname}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

const db = mongoose.connection

module.exports = db

