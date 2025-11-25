const Usuario = require('./Usuario')
const Produto = require('./Produto')
const Estoque = require('./Estoque')

Usuario.hasMany(Estoque,{
    foreignKey: 'idUsuario',
    as: 'estoqueUsuario',
    onDelete: 'CASCADE'
})

Estoque.belongsTo(Usuario,{
    foreignKey: 'idUsuario',
    as: 'usuarioEstoque',
    allowNull: false
})

Produto.hasMany(Estoque,{
    foreignKey: 'idProduto',
    as: 'estoqueProduto',
    onDelete: 'CASCADE'
})

Estoque.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoEstoque',
    allowNull: false
})

module.exports = { Usuario, Estoque, Produto}


