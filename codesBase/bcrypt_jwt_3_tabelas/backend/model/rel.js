const Cliente = require('./Cliente')
const Prato = require('./Prato')
const Pedido = require('./Pedido')

Cliente.hasMany(Pedido,{
    foreignKey: 'idCliente',
    as: 'pedidoCliente',
    onDelete: 'CASCADE'
})

Pedido.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clientePedido',
    allowNull: false
})
Prato.hasMany(Pedido,{
    foreignKey: 'idPrato',
    as: 'pedidoPrato',
    onDelete: 'CASCADE'
})

Pedido.belongsTo(Prato,{
    foreignKey: 'idPrato',
    as: 'pratoPedido',
    allowNull: false
})

module.exports = { Cliente, Prato, Pedido}

