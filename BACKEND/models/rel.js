// BACKEND/models/associations.js
const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Produto = require('./Produto');
const Entrega = require('./Entrega');

// Usuario <-> Pedido
Usuario.hasMany(Pedido, { foreignKey: 'idUsuario', as: 'pedidos' });
Pedido.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

// Pedido <-> ItemPedido (1:N)
Pedido.hasMany(ItemPedido, { foreignKey: 'idPedido', as: 'itens' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'idPedido', as: 'pedido' });

// ItemPedido <-> Produto
Produto.hasMany(ItemPedido, { foreignKey: 'idProduto', as: 'itensPedido' });
ItemPedido.belongsTo(Produto, { foreignKey: 'idProduto', as: 'produto' });

// Pedido <-> Entrega (1:1)
Pedido.hasOne(Entrega, { foreignKey: 'idPedido', as: 'entrega' });
Entrega.belongsTo(Pedido, { foreignKey: 'idPedido', as: 'pedido' });

module.exports = {
  Usuario, Pedido, ItemPedido, Produto, Entrega
};
