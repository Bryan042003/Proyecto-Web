const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        }
    }
},{
    tableName: 'Review',
    timestamps: false
}

);

module.exports = Review;