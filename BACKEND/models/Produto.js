const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(65,2),
        allowNull: false
    },
    imagem_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: true,
    tableName: 'produtos'
})

module.exports = Produto