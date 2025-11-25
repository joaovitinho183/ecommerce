const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Pedido = db.define('pedidos',{
    codPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dataPedido: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCliente',
            model: 'clientes'
        }
    },
    idPrato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codPrato',
            model: 'pratos'
        }
    },
    
},{
    timestamps: false,
    tableName: 'pedidos'
})

module.exports = Pedido