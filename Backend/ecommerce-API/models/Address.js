const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_district: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'District',
            key: 'id'
        }
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