const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Canton = sequelize.define('Canton', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_province: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Province',
            key: 'id'
        }
    }
},{
    tableName: 'Canton',
    timestamps: false

});

module.exports = Canton;