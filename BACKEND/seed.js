const Produto = require('./models/Produto'); // sem chaves

const produtosPadrao = [
    { nome: 'Porsche 911 Turbo S', descricao: 'O topo da linha 911...', modelo: '911 Turbo S', preco: 2100000, imagem_url: '/imgs/911TurboS.jpg', ativo: true },
    { nome: 'Porsche 911 GT3', descricao: 'Versão de pista...', modelo: '911 GT3', preco: 1467000, imagem_url: '/imgs/911GT3.jpg', ativo: true },
    { nome: 'Porsche 911 Carrera GTS', descricao: 'Equilíbrio perfeito...', modelo: '911 Carrera GTS', preco: 1127000, imagem_url: '/imgs/911CarreraGTS.jpg', ativo: true },
    { nome: 'Porsche Taycan Turbo S', descricao: 'O elétrico mais potente...', modelo: 'Taycan Turbo S', preco: 1435000, imagem_url: '/imgs/TaycanTurboS.jpg', ativo: true },
    { nome: 'Porsche Taycan Turbo GT', descricao: 'Versão superesportiva...', modelo: 'Taycan Turbo GT', preco: 1535000, imagem_url: '/imgs/TaycanTurboGT.jpg', ativo: true },
    { nome: 'Porsche Taycan 4S Cross Turismo', descricao: 'Combinação ideal...', modelo: 'Taycan 4S Cross Turismo', preco: 935000, imagem_url: '/imgs/Taycan4SCrossTurismo.jpg', ativo: true },
    { nome: 'Porsche Panamera Turbo S E-Hybrid', descricao: 'Sedã de luxo rápido...', modelo: 'Panamera Turbo S E-Hybrid', preco: 1573000, imagem_url: '/imgs/PanameraTurboSE-Hybrid.jpg', ativo: true },
    { nome: 'Porsche Panamera GTS', descricao: 'Versão esportiva...', modelo: 'Panamera GTS', preco: 803000, imagem_url: '/imgs/PanameraGTS.jpg', ativo: true }
];

const seedProdutos = async () => {
    for (const p of produtosPadrao) {
        const [produto, created] = await Produto.findOrCreate({
            where: { nome: p.nome },
            defaults: p
        });
        if (created) console.log(`Produto ${produto.nome} criado`);
    }
};

module.exports = seedProdutos;
