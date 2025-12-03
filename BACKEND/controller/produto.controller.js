const Produto = require('../models/Produto');
const Estoque = require('../models/Estoque');

const cadastrar = async (req, res) => {
    const valores = req.body;

    if (!valores.nome || !valores.descricao || !valores.modelo || !valores.preco || !valores.imagem_url || !valores.quantidade) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        const dados = await Produto.create(valores);

        let idProduto = dados.codProduto;
        let valores2 = { idProduto: idProduto, quantidade_atual: valores.quantidade };
        await Estoque.create(valores2);

        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao cadastrar produto', err);
        res.status(500).json({ message: "Erro ao cadastrar produto!" });
    }
};

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll();
        res.status(200).json(dados);
    } catch (err) {
        console.error('Erro ao listar produtos', err);
        res.status(500).json({ message: "Erro ao listar produtos!" });
    }
};

const apagar = async (req, res) => {
    const codProduto = req.params.id;
    try {
        const dados = await Produto.findByPk(codProduto);

        if (!dados) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }

        // 1. DELETAR REGISTROS DEPENDENTES (Estoque)
        // Isso garante que não haverá restrições de chave estrangeira ao deletar o Produto.
        await Estoque.destroy({ where: { idProduto: codProduto } });

        // 2. DELETAR O REGISTRO PRINCIPAL (Produto)
        await Produto.destroy({ where: { codProduto: codProduto } });
        
        res.status(200).json({ message: "Produto removido com sucesso!" });

    } catch (err) {
        console.error('Erro ao apagar produto', err);
        res.status(500).json({ message: 'Erro ao apagar produto!' });
    }
};

const atualizar = async (req, res) => {
    const codProduto = req.params.id;
    const valores = req.body;

    try {
        const dados = await Produto.findByPk(codProduto);

        if (!dados) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }

        await Produto.update(valores, { where: { codProduto } });
        res.status(200).json({ message: "Produto atualizado com sucesso!" });

    } catch (err) {
        console.error('Erro ao atualizar produto', err);
        res.status(500).json({ message: 'Erro ao atualizar produto!' });
    }
};

module.exports = { cadastrar, listar, apagar, atualizar };
