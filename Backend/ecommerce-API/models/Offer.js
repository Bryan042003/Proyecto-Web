const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Offer = sequelize.define('Offer', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    discount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: true
    }


},{
    tableName: 'Offer',
    timestamps: false
}

); 

module.exports = Offer;