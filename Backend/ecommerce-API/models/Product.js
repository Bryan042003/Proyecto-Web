const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const Product_Category = require('./Product_Category');

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

Product.belongsToMany(Category, {through: Product_Category, foreignKey: 'id_product'});
Category.belongsToMany(Product, {through: Product_Category, foreignKey: 'id_category'});

module.exports = Product;