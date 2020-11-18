const { Model } = require('sequelize');
const order_item = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Item, {
                foreignKey: 'itemId',
                as: 'order_itemId',
            });
            OrderItem.belongsTo(models.Order, {
                foreignKey: 'orderId',
                as: 'order_orderId',
            });
        }
    }
    OrderItem.init({
        orderId: { type: DataTypes.INTEGER, allowNull: false },
        itemId: { type: DataTypes.INTEGER, allowNull: false },
    }, { sequelize, modelName: 'OrderItem' });
    return OrderItem;
};

module.exports = order_item;
