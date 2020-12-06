const express = require('express')
const orderController = require('./controllers/orderControler')
const orderRouter = express.Router()

orderRouter.get('/getOrders', orderController.getOrders)
orderRouter.post('/duplicateOrder', orderController.duplicateOrder)
orderRouter.post('/cancelOrder', orderController.cancelOrder)

module.exports = orderRouter
