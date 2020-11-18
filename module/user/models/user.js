const { Model } = require('sequelize');
const user = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, {
                foreignKey: 'username',
                as: 'order_username',
                onDelete: 'CASCADE'
            });
            User.hasMany(models.OrderItem, {
                foreignKey: 'username',
                as: 'orderItem_username',
                onDelete: 'CASCADE'
            });
        }
    }
    User.init({
        username: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        password: { type: DataTypes.STRING },
        fullName: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, isEmail: true }
    }, { sequelize, modelName: 'User' });
    return User;
};

module.exports = user;
