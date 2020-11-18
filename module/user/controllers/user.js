const { QueryTypes } = require('sequelize');
const crypto = require('crypto')
const User = require('../../../connections/postgres').User
const sequelize = require('../../../connections/postgres').sequelize

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
        sequelize.query(
            'select D."username",D."fullName",D."phone",D."email",A."orderId",A."orderDate",json_agg(C.*) as basket from public."Orders" as A, public."OrderItems" as B, public."Items" as C, public."Users" as D where A."orderId"=B."orderId" AND B."itemId"=C."itemId" group by D.username,A."orderId" order by A."orderId";',
            { type: QueryTypes.SELECT }).then((result) => {
                console.log(JSON.stringify(result, undefined, 2))
                response.status(200).send(result)
            }).catch((error) => {
                console.log(error)
                response.status(204).send(error)
            });
    }
}