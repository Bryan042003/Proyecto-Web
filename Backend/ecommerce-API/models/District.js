const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const District = sequelize.define('District', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_canton: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Canton',
            key: 'id'
        }
    }
},{
    tableName: 'District',
    timestamps: false
}


);

module.exports = District;