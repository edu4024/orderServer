const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const Schema = mongoose.Schema

const orderSchema = new Schema({
    packageName: String,
    packageCalories: String
})

module.exports = mongoose.model('Order', orderSchema)