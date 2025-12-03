// BACKEND/controller/pedido.controller.js
const { Usuario, Pedido, ItemPedido, Produto, Entrega } = require('../models/rel');

const finalizarCompra = async (req, res) => {
    const { itens, entrega } = req.body;
    try {
        const idUsuario = req.usuario?.codUsuario; // vindo do middleware

        if (!idUsuario) return res.status(401).json({ error: 'Usuário não autenticado.' });
        if (!itens || itens.length === 0) return res.status(400).json({ error: 'Carrinho vazio' });
        if (!entrega.cep || !entrega.logradouro || !entrega.bairro || !entrega.localidade || !entrega.uf || !entrega.numero) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios da entrega devem ser preenchidos.' });
        }

        // Calcula subtotal e valida produtos
        let valorSubtotal = 0;
        for (let item of itens) {
            const produto = await Produto.findByPk(item.idProduto);
            if (!produto) return res.status(404).json({ error: `Produto ${item.idProduto} não encontrado` });

            item.precoUnitario = Number(produto.preco);
            item.valorTotalItem = Number(item.precoUnitario) * Number(item.quantidade);
            valorSubtotal += item.valorTotalItem;
        }

        // Gera frete aleatório entre 100 e 1000
        const valorFrete = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        // Cria Pedido
        const pedido = await Pedido.create({
            idUsuario,
            valorSubtotal,
            valorFrete,
            valorTotal: valorSubtotal + valorFrete
        });

        // Cria Itens do Pedido
        for (let item of itens) {
            await ItemPedido.create({
                idPedido: pedido.codPedido,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                valorTotalItem: item.valorTotalItem
            });
        }

        // Cria Entrega
        await Entrega.create({
            idPedido: pedido.codPedido,
            cep: entrega.cep,
            logradouro: entrega.logradouro,
            bairro: entrega.bairro,
            localidade: entrega.localidade,
            uf: entrega.uf,
            numero: entrega.numero,
            complemento: entrega.complemento || null
        });

        return res.status(201).json({ message: 'Pedido finalizado com sucesso!', pedidoId: pedido.codPedido });
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        return res.status(500).json({ error: 'Erro ao finalizar pedido.' });
    }
};

const listarPedidosUsuario = async (req, res) => {
    try {
        const idUsuario = req.usuario?.codUsuario;
        if (!idUsuario) return res.status(401).json({ error: 'Usuário não autenticado.' });

        const pedidos = await Pedido.findAll({
            where: { idUsuario },
            include: [
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar pedidos.' });
    }
};

const listarTodosPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                { model: Usuario, as: 'usuario', attributes: ['codUsuario', 'nome', 'email'] },
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao listar pedidos.' });
    }
};

const detalhesDoPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [
                { model: Usuario, as: 'usuario', attributes: ['codUsuario', 'nome', 'email'] },
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ]
        });

        if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
        return res.json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao carregar detalhes.' });
    }
};

module.exports = {
    finalizarCompra,
    listarPedidosUsuario,
    listarTodosPedidos,
    detalhesDoPedido
};
