const OrderModel = require('./../../models/Order')
const DeliveryModel = require('./../../models/Delivery')

module.exports = class Order {

    static getOrders (req, res){

        OrderModel.aggregate([{
            $lookup: {
                from: 'deliveries',
                localField:'_id',
                foreignField:'orderId',
                as:'orders'
            }
        }])
            .then(orders => {
                res.send(orders)
            })
            .catch(error => {
                console.log(error)
                res.sendStatus(400)
            })
    }

    static duplicateOrder (req, res){

        function findOrder(req) {
            return OrderModel.findById({_id:req.body.id})
        }

        function createOrder(order) {
            return OrderModel.create({
                packageName: order.packageName,
                packageCalories: order.packageCalories
            })
        }

        function findDelivery(req) {
            return DeliveryModel.find({orderId: req.body.id})
        }

        function deliveryCreate(order, deliveries) {
           let deliveryArr = deliveries.map(item => {
               return {
                   orderId: order._id,
                   date: item.date,
                   interval: item.interval,
                   address: item.address
               }
           })
            DeliveryModel.insertMany(deliveryArr)
        }

        (async function duplicate(req, res){
            try{
                const foundOrder = await findOrder(req)
                const order = await createOrder(foundOrder)
                const deliveries = await findDelivery(req)
                await deliveryCreate(order, deliveries)
                await res.sendStatus(200)
            }catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        })(req, res)
    }

    static cancelOrder (req, res){

        function deleteDelivery(req) {
            DeliveryModel.deleteMany({orderId: req.body.id}, (err) => {
                if (err) console.log(err)
            })
        }

        function deleteOrder(req) {
            OrderModel.deleteOne({'_id': req.body.id}, (err) => {
                if (err) console.log(err)
            })
        }

        (async function cancel(req, res){
            try {
                await deleteDelivery(req)
                await deleteOrder(req)
                await res.sendStatus(200)
            }catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        })(req, res)
    }
}
