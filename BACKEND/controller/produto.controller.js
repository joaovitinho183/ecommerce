const Produto = require('../models/Produto')
const Estoque = require('../models/Estoque')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.nome || !valores.descricao || !valores.modelo || !valores.preco || !valores.imagem_url || !valores.quantidade) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
    }

    try {
        const dados = await Produto.create(valores)

        let idProduto = dados.codProduto
        let valores2 = { idProduto: idProduto, quantidade_atual: valores.quantidade }
        const estoque = await Estoque.create(valores2)

        res.status(201).json({ message: 'Cadastro do Produto ralizado!!!' })
    } catch (err) {
        console.error('Erro ao cadastrar os dados', err)
        res.status(500).json({ message: "Erro ao cadastrar os dados!" })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar Produto', err)
        res.status(500).json({ message: "Erro ao listar Produto!" })
    }
}

module.exports = { cadastrar, listar }