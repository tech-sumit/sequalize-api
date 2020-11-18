const bodyParser = require('body-parser');
const express = require('express')
const router = express.Router()

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

router.use(require('./module/user/middelwares/auth').auth)

router.get('/user', require('./module/user/controllers/user').getDetails)
router.post('/user', require('./module/user/controllers/user').create)

router.get('/order', require('./module/order/controllers/order').getDetails)
router.post('/order', require('./module/order/controllers/order').create)

router.get('/item', require('./module/order/controllers/item').getDetails)
router.post('/item', require('./module/order/controllers/item').create)

module.exports = router
