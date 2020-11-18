const Item = require('../../../connections/postgres').Item
module.exports.create = (request, response) => {
    if (!request.body.description) {
        response.status(422).end();//Unprocessable entity
    } else {
        Item.create({
            description: request.body.description
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            response.status(200).send({ itemId: result.itemId })
        }).catch((error) => {
            console.log(error)
            response.status(204).send(error)
        });
    }
}

module.exports.getDetails = (request, response) => {
    if (!request.query.itemId) {
        response.status(422).end();//Unprocessable entity
    } else {
        Item.findAll({
            where: {
                itemId: request.query.itemId,
            }
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2))
            response.status(200).send(result)
        }).catch((error) => {
            console.log(error)
            response.status(204).send(error)
        });
    }
}