const User = require('../../../connections/postgres').User
const Order = require('../../../connections/postgres').Order
const OrderItem = require('../../../connections/postgres').OrderItem
const Item = require('../../../connections/postgres').Item
module.exports.create = (request, response) => {
    if (!request.body.username ||
        !request.body.orderId ||
        !request.body.description) {
        response.status(422).end();//Unprocessable entity
    } else {
        User.create({
            username: request.body.username,
            orderId: request.body.orderId,
            description: request.body.description
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            response.status(200).end()
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
        User.findAll({
            where: {
                orderId: request.body.orderId,
            },
            include: [{
                model: Order,
                include: [{
                    model: OrderItem,
                    include: [{
                        model: Item
                    }]
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