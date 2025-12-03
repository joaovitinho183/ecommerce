const Usuario = require('./Usuario')
const Pedido = require('./Pedido')
const ItemPedido = require('./ItemPedido')
const Produto = require('./Produto')
const Entrega = require('./Entrega')

Usuario.hasMany(Pedido, { foreignKey: 'idUsuario', as: 'pedidos' })
Pedido.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' })

Pedido.hasMany(ItemPedido, { foreignKey: 'idPedido', as: 'itens' })
ItemPedido.belongsTo(Pedido, { foreignKey: 'idPedido', as: 'pedido' })

Produto.hasMany(ItemPedido, { foreignKey: 'idProduto', as: 'itensPedido' })
ItemPedido.belongsTo(Produto, { foreignKey: 'idProduto', as: 'produto' })

Pedido.hasOne(Entrega, { foreignKey: 'idPedido', as: 'entrega' })
Entrega.belongsTo(Pedido, { foreignKey: 'idPedido', as: 'pedido' })

module.exports = {
  Usuario, Pedido, ItemPedido, Produto, Entrega
}
