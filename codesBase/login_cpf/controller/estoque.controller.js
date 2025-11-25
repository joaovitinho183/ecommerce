const Estoque = require('../model/Estoque')
const Produto = require('../model/Produto')
const Usuario = require('../model/Usuario')

const cadastrar = async (req, res) => {
    const valores = req.body
    console.log("estoque = ", valores)

    // validação dos campos obrigatórios
    if (!valores.idUsuario || !valores.idProduto || !valores.tipo || !valores.data || !valores.qtdeMovimento) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' })
    }

    try {
        // Verifica se o produto existe
        const produto = await Produto.findByPk(valores.idProduto)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }

        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(valores.idUsuario)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }

        let novaQuantidade = produto.quantidade

        // ------------------------------
        // ENTRADA
        // ------------------------------
        if (valores.tipo === 'ENTRADA') {
            novaQuantidade += valores.qtdeMovimento
        }

        // ------------------------------
        // SAÍDA
        // ------------------------------
        else if (valores.tipo === 'SAIDA') {
            if (produto.quantidade < valores.qtdeMovimento) {
                return res.status(400).json({ message: 'Estoque insuficiente para saída!' })
            }
            novaQuantidade -= valores.qtdeMovimento
        }

        // Tipo inválido
        else {
            return res.status(400).json({ message: 'Tipo de movimentação inválido!' })
        }

        // Atualiza quantidade do produto
        await produto.update({ quantidade: novaQuantidade })

        // Cria registro de movimentação
        const movimento = await Estoque.create({
            idUsuario: valores.idUsuario,
            idProduto: valores.idProduto,
            tipo: valores.tipo,
            data: valores.data,
            qtdeMovimento: valores.qtdeMovimento
        })

        // Retorno para o front
        res.status(201).json({
            message: 'Movimentação registrada com sucesso!',
            novaQuantidade,
            movimento
        })
    } catch (err) {
        console.error('Erro ao registrar movimentação de estoque:', err)
        res.status(500).json({ message: 'Erro ao registrar movimentação de estoque!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Estoque.findAll({
            include: [
                { model: Produto, as: 'produtoEstoque' },
                { model: Usuario, as: 'usuarioEstoque' }
            ]
        })
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar os dados', err)
        res.status(500).json({ message: 'Erro ao listar os dados' })
    }
}

module.exports = { cadastrar, listar }
