const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    orderId: ObjectId,
    date: {type: Date, default: Date.now},
    interval: String,
    address: String
})

module.exports = mongoose.model('Delivery', deliverySchema)