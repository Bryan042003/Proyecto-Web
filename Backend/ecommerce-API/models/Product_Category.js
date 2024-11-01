const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Category = require('./Category');

const Product_Category = sequelize.define('Product_Category', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_product:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id'
        }
    },
    id_category:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'id'
        }
    }
},{
    tableName: 'Product_Category',
    timestamps: false
}

);

Product_Category.belongsTo(Product,{as:'product',foreignKey:'id_product'});
Product_Category.belongsTo(Category,{as:'category',foreignKey:'id_category'});

module.exports = Product_Category;

