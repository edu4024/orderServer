const Order = require('./../orderModel/orderModel')

exports.getOrders = function(req, res){
    Order.getOrders(req, res)
}

exports.duplicateOrder = function(req, res){
    Order.duplicateOrder(req, res)
}

exports.cancelOrder = function(req, res){
    Order.cancelOrder(req, res)
}