const { Model } = require('sequelize');
const item = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.hasMany(models.OrderItem, {
                foreignKey: 'itemId',
                as: 'orderItem_itemId',
            });
        }
    }
    Item.init({
        itemId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        description: { type: DataTypes.STRING }
    }, { sequelize, modelName: 'Item' });
    return Item;
};

module.exports = item;
