const { QueryTypes } = require('sequelize');
const sequelize = require('../../../connections/postgres').sequelize
const Order = require('../../../connections/postgres').Order
const OrderItem = require('../../../connections/postgres').OrderItem
module.exports.create = (request, response) => {
    if (!request.body.username ||
        !request.body.description ||
        !request.body.items) {
        response.status(422).end();//Unprocessable entity
    } else {
        Order.create({
            username: request.body.username,
            description: request.body.description
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            var data = request.body.items.map(item => {
                return {
                    orderId: result.orderId,
                    itemId: item
                }
            })
            OrderItem.bulkCreate(data).then((itemsResult) => {
                console.log(JSON.stringify(itemsResult, undefined, 2))
                response.status(200).send({ orderId: result.orderId })
            }).catch((error) => {
                console.log(error)
                response.status(204).send(error)
            });
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
        sequelize.query(
            'select A.*,json_agg(C.*) as basket from public."Orders" as A, public."OrderItems" as B, public."Items" as C where A."orderId"=B."orderId" AND B."itemId"=C."itemId" group by A."orderId" order by A."orderId";',
            { type: QueryTypes.SELECT }).then((result) => {
                console.log(JSON.stringify(result, undefined, 2))
                response.status(200).send(result)
            }).catch((error) => {
                console.log(error)
                response.status(204).send(error)
            });
    }
}