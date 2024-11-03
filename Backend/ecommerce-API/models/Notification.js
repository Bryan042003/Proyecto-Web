const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        }
    },


},{
    tableName: 'Notification',
    timestamps: false
}

);

module.exports = Notification;