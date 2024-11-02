const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    parent_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Category',
            key: 'id'
        }
    }
},{
    tableName: 'Category',
    timestamps: false
}

);

Category.hasMany(Category,{as:'subcategories',foreignKey:'parent_id'});
Category.belongsTo(Category,{as:'parent',foreignKey:'parent_id'});

module.exports = Category;