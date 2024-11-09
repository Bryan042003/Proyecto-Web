const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    photo:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    technical_stuff:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    n_sales:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_offer:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Offer',
            key: 'id'
        }
    },
},{
    tableName: 'Product',
    timestamps: false
}

);

module.exports = Product;