const User = require('../../../connections/postgres').User
const Order = require('../../../connections/postgres').Order
const OrderItem = require('../../../connections/postgres').OrderItem
const Item = require('../../../connections/postgres').Item
module.exports.create = (request, response) => {
    if (!request.body.username ||
        !request.body.description) {
        response.status(422).end();//Unprocessable entity
    } else {
        Order.create({
            username: request.body.username,
            description: request.body.description
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            response.status(200).send({ orderId: result.orderId })
        }).catch((error) => {
            console.log(error)
            response.status(204).send(error)
        });
    }
}

module.exports.getDetails = (request, response) => {
    if (!request.query.orderId) {
        response.status(422).end();//Unprocessable entity
    } else {
        Order.findAll({
            where: {
                orderId: request.body.orderId,
            },
            include: [{
                model: OrderItem,
                as: 'OrderItem',
                include: [{
                    model: Item,
                    as: 'Item',
                }]
            }]
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            response.status(200).send(result)
        }).catch((error) => {
            console.log(error)
            response.status(204).send(error)
        });
    }
}