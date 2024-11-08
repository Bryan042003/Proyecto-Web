const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    passw: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin','logist'),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_address:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Address',
            key: 'id'
        }

    },

},{
    tableName: 'User',
    timestamps: false
}

);

module.exports = User;