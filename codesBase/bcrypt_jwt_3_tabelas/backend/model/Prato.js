const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Prato = db.define('pratos',{
    codPrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomePrato: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    precoBase: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
    
},{
    timestamps: false,
    tableName: 'pratos'
})

module.exports = Prato