const crypto = require('crypto')
const User = require('../../../connections/postgres').User
const Order = require('../../../connections/postgres').Order
const OrderItem = require('../../../connections/postgres').OrderItem
const Item = require('../../../connections/postgres').Item
module.exports.create = (request, response) => {
    console.log(request.body)
    if (!request.body.username ||
        !request.body.password ||
        !request.body.fullName ||
        !request.body.phone ||
        !request.body.email) {
        response.status(422).end();//Unprocessable entity
    } else {
        let password = crypto.createHash('md5').update(request.body.password.trim()).digest("hex");
        User.create({
            username: request.body.username,
            password: password,
            fullName: request.body.fullName,
            phone: request.body.phone,
            email: request.body.email,
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
    if (!request.query.username) {
        response.status(422).end();//Unprocessable entity
    } else {
        User.findAll({
            where: { username: request.body.username },
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