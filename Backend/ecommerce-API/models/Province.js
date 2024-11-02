const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Province = sequelize.define('Province', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    tableName: 'Province',
    timestamps: false
}

);

module.exports = Province;
