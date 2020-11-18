const { Model } = require('sequelize');
const order = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: 'username',
                as: 'order_username',
            });
            Order.hasMany(models.OrderItem, {
                foreignKey: 'orderId',
                as: 'orderItem_orderId',
            });
        }
    }
    Order.init({
        username: { type: DataTypes.STRING, validate: { notEmpty: true } },
        orderId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        description: { type: DataTypes.STRING }
    }, { sequelize, modelName: 'Order' });
    return Order;
};

module.exports = order;
