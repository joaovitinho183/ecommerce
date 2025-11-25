const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Cliente = db.define('clientes',{
    codCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }    
},{
    timestamps: false,
    tableName: 'clientes'
})

module.exports = Cliente