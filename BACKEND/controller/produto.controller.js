const Produto = require('../models/Produto')
const Estoque = require('../models/Estoque')

const ajustarCaminhoImagem = (imagem) => {
    if (!imagem) return null
    if (imagem.startsWith("http://") || imagem.startsWith("https://")) {
        return imagem
    }
    imagem = imagem.replace(/^\/?public\//, "")
    imagem = imagem.replace(/^\/?imgs\//, "")
    return `/imgs/${imagem}`
}

const cadastrar = async (req, res) => {
    let valores = req.body
    valores.imagem_url = ajustarCaminhoImagem(valores.imagem_url)
    if (!valores.nome || !valores.descricao || !valores.modelo || !valores.preco || !valores.imagem_url || !valores.quantidade) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
    }
    try {
        const dados = await Produto.create(valores)
        let idProduto = dados.codProduto
        let valores2 = { idProduto: idProduto, quantidade_atual: valores.quantidade }
        await Estoque.create(valores2)
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar produto', err)
        res.status(500).json({ message: "Erro ao cadastrar produto!" })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        const dadosAjustados = dados.map(item => {
            return {
                ...item.dataValues,
                imagem_url: ajustarCaminhoImagem(item.imagem_url)
            }
        })
        res.status(200).json(dadosAjustados)
    } catch (err) {
        console.error('Erro ao listar produtos', err)
        res.status(500).json({ message: "Erro ao listar produtos!" })
    }
}

const apagar = async (req, res) => {
    const codProduto = req.params.id
    try {
        const dados = await Produto.findByPk(codProduto)
        if (!dados) {
            return res.status(404).json({ message: "Produto não encontrado!" })
        }
        await Estoque.destroy({ where: { idProduto: codProduto } })
        await Produto.destroy({ where: { codProduto } })
        res.status(200).json({ message: "Produto removido com sucesso!" })
    } catch (err) {
        console.error('Erro ao apagar produto', err)
        res.status(500).json({ message: 'Erro ao apagar produto!' })
    }
}

const atualizar = async (req, res) => {
    const codProduto = req.params.id
    let valores = req.body
    if (valores.imagem_url) {
        valores.imagem_url = ajustarCaminhoImagem(valores.imagem_url)
    }
    try {
        const dados = await Produto.findByPk(codProduto)
        if (!dados) {
            return res.status(404).json({ message: "Produto não encontrado!" })
        }
        await Produto.update(valores, { where: { codProduto } })
        res.status(200).json({ message: "Produto atualizado com sucesso!" })
    } catch (err) {
        console.error('Erro ao atualizar produto', err)
        res.status(500).json({ message: 'Erro ao atualizar produto!' })
    }
}

module.exports = { cadastrar, listar, apagar, atualizar }
