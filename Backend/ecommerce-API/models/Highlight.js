const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Highlight = sequelize.define('Highlight', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        }
    },
    expired_date:{
        type: DataTypes.DATE,
        allowNull: false
    }

},{
    tableName: 'Highlight',
    timestamps: false
}

);


module.exports = Highlight;