const Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.dbstring);

const models = {
    OrderItem: require('../module/order/models/order_item')(sequelize, Sequelize),
    Order: require('../module/order/models/order')(sequelize, Sequelize),
    Item: require('../module/order/models/item')(sequelize, Sequelize),
    User: require('../module/user/models/user')(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
// if (process.env.isFirstStart) {
//     (async () => {
//         await sequelize.sync({ force: true });
//         process.env.isFirstStart = false
//     })();
// }
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
