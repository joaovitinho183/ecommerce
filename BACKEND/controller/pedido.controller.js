const { Usuario, Pedido, ItemPedido, Produto, Entrega } = require('../models/rel')

// Função para finalizar a compra de um pedido
const finalizarCompra = async (req, res) => {
    // Extrai os itens e dados de entrega do corpo da requisição
    const { itens, entrega } = req.body
    try {
        // Obtém o ID do usuário logado a partir do middleware de autenticação
        const idUsuario = req.usuario?.codUsuario
        // Verifica se o usuário está autenticado
        if (!idUsuario) return res.status(401).json({ error: 'Usuário não autenticado.' })
        // Verifica se há itens no carrinho
        if (!itens || itens.length === 0) return res.status(400).json({ error: 'Carrinho vazio' })
        // Valida se todos os campos obrigatórios da entrega estão preenchidos
        if (!entrega.cep || !entrega.logradouro || !entrega.bairro || !entrega.localidade || !entrega.uf || !entrega.numero) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios da entrega devem ser preenchidos.' })
        }

        // Calcula o subtotal percorrendo todos os itens
        let valorSubtotal = 0
        for (let item of itens) {
            // Busca o produto no banco para obter o preço atual
            const produto = await Produto.findByPk(item.idProduto)
            if (!produto) return res.status(404).json({ error: `Produto ${item.idProduto} não encontrado` })

            // Define o preço unitário e calcula o valor total do item
            item.precoUnitario = Number(produto.preco)
            item.valorTotalItem = Number(item.precoUnitario) * Number(item.quantidade)
            // Soma ao subtotal
            valorSubtotal += item.valorTotalItem
        }

        // Gera um valor de frete aleatório entre 100 e 1000
        const valorFrete = Math.floor(Math.random() * (1000 - 100 + 1)) + 100

        // Cria o registro do pedido no banco
        const pedido = await Pedido.create({
            idUsuario,
            valorSubtotal,
            valorFrete,
            valorTotal: valorSubtotal + valorFrete
        })

        // Cria os registros dos itens do pedido
        for (let item of itens) {
            await ItemPedido.create({
                idPedido: pedido.codPedido,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
                valorTotalItem: item.valorTotalItem
            })
        }

        // Cria o registro de entrega
        await Entrega.create({
            idPedido: pedido.codPedido,
            cep: entrega.cep,
            logradouro: entrega.logradouro,
            bairro: entrega.bairro,
            localidade: entrega.localidade,
            uf: entrega.uf,
            numero: entrega.numero,
            complemento: entrega.complemento || null
        })

        // Retorna sucesso com o ID do pedido
        return res.status(201).json({ message: 'Pedido finalizado com sucesso!', pedidoId: pedido.codPedido })
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error)
        return res.status(500).json({ error: 'Erro ao finalizar pedido.' })
    }
}

// Função para listar os pedidos do usuário logado
const listarPedidosUsuario = async (req, res) => {
    try {
        // Obtém o ID do usuário
        const idUsuario = req.usuario?.codUsuario
        if (!idUsuario) return res.status(401).json({ error: 'Usuário não autenticado.' })

        // Busca os pedidos com associações (itens e entrega)
        const pedidos = await Pedido.findAll({
            where: { idUsuario },
            include: [
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ],
            order: [['createdAt', 'DESC']]
        })

        return res.json(pedidos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao listar pedidos.' })
    }
}

// Função para listar todos os pedidos (para admin)
const listarTodosPedidos = async (req, res) => {
    try {
        // Busca todos os pedidos com associações
        const pedidos = await Pedido.findAll({
            include: [
                { model: Usuario, as: 'usuario', attributes: ['codUsuario', 'nome', 'email'] },
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ],
            order: [['createdAt', 'DESC']]
        })

        return res.json(pedidos)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao listar pedidos.' })
    }
}

// Função para obter detalhes de um pedido específico
const detalhesDoPedido = async (req, res) => {
    try {
        // Busca o pedido pelo ID com associações
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [
                { model: Usuario, as: 'usuario', attributes: ['codUsuario', 'nome', 'email'] },
                { model: ItemPedido, as: 'itens', include: [{ model: Produto, as: 'produto' }] },
                { model: Entrega, as: 'entrega' }
            ]
        })

        if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' })
        return res.json(pedido)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro ao carregar detalhes.' })
    }
}

module.exports = {
    finalizarCompra,
    listarPedidosUsuario,
    listarTodosPedidos,
    detalhesDoPedido
}
