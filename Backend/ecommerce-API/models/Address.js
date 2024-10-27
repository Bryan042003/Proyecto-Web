const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    province: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    canton: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    district: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    specific_address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},{
    tableName: 'Address',
    timestamps: false
}


);

module.exports = Address;