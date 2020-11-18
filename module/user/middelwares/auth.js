const crypto = require('crypto')
const User = require('../../../connections/postgres').User
module.exports.auth = (request, response, next) => {
    if (request.path == "/user" && request.method == 'POST') {
        console.log('no need to auth for user creation')
        next()
    } else {
        if (!request.headers.authorization) {
            response.status(406).end()
        } else {
            console.log("headers: " + JSON.stringify(request.headers, undefined, 2))
            var creds = new Buffer(request.headers.authorization.split(' ')[1], 'base64').toString()
            creds = creds.split(':')
            let password = crypto.createHash('md5').update(creds[1].trim()).digest("hex");

            console.log("creds: " + JSON.stringify(creds, undefined, 2))
            console.log("password: " + password)

            User.findOne({
                where: {
                    username: creds[0],
                    password: password,
                }
            }).then((result) => {
                console.log('Auth result: ' + JSON.stringify(result, undefined, 2))
                if (!result) {
                    response.status(406).end()
                } else {
                    next()
                }
            }).catch((error) => {
                console.log('Auth error: ' + JSON.stringify(error, undefined, 2))
                response.status(406).send(error)
            });
        }
    }
}