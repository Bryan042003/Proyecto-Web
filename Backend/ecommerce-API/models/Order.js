const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user:{
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    total_price:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('pending', 'in_process', 'sent', 'delivered'),
        allowNull: false
    }
},{
    tableName: 'Order',
    timestamps: false
}

);

module.exports = Order;