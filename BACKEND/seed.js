const Produto = require('./models/Produto')

const produtosPadrao = [
    { nome: 'Porsche 911 Turbo S', descricao: ' O topo da linha 911. Agora com tecnologia T-Hybrid, combinando motor boxer biturbo com sistema elétrico. É o 911 mais rápido e avançado da geração 992.2.', modelo: '911 Turbo S', preco: 2100000, imagem_url: '/imgs/911TurboS.jpg', ativo: true },
    { nome: 'Porsche 911 GT3', descricao: ' Versão de pista, leve, agressiva e com motor aspirado. É o modelo favorito dos puristas e entusiastas de track day.', modelo: '911 GT3', preco: 1467000, imagem_url: '/imgs/911GT3.jpg', ativo: true },
    { nome: 'Porsche 911 Carrera GTS', descricao: ' Equilíbrio perfeito entre luxo e esportividade. Usa sistema T-Hybrid, com desempenho forte porém mais civilizado que o Turbo.', modelo: '911 Carrera GTS', preco: 1127000, imagem_url: '/imgs/911CarreraGTS.jpg', ativo: true },
    { nome: 'Porsche Taycan Turbo S', descricao: ' O elétrico mais potente "padrão" da Porsche. Desempenho extremo, aceleração brutal e engenharia elétrica de ponta.', modelo: 'Taycan Turbo S', preco: 1435000, imagem_url: '/imgs/TaycanTurboS.jpg', ativo: true },
    { nome: 'Porsche Taycan Turbo GT', descricao: ' Versão superesportiva, mais focada em performance extrema do que qualquer outro Taycan. Pegada de supercarro elétrico.', modelo: 'Taycan Turbo GT', preco: 1535000, imagem_url: '/imgs/TaycanTurboGT.jpg', ativo: true },
    { nome: 'Porsche Taycan 4S Cross Turismo', descricao: ' A combinação ideal de praticidade e esportividade. Estilo perua esportiva com tração integral e autonomia sólida.', modelo: 'Taycan 4S Cross Turismo', preco: 935000, imagem_url: '/imgs/Taycan4SCrossTurismo.jpg', ativo: true },
    { nome: 'Porsche Panamera Turbo S E-Hybrid', descricao: ' Sedã de luxo rápido, híbrido plug-in. Motor V8 turbo combinado com motor elétrico. Muito potente e eficiente.', modelo: 'Panamera Turbo S E-Hybrid', preco: 1573000, imagem_url: '/imgs/PanameraTurboSE-Hybrid.jpg', ativo: true },
    { nome: 'Porsche Panamera GTS', descricao: ' Versão esportiva com foco em desempenho puro. Suspensão mais firme, visual agressivo e motor poderoso.', modelo: 'Panamera GTS', preco: 803000, imagem_url: '/imgs/PanameraGTS.jpg', ativo: true }
]

const seedProdutos = async () => {
    for (const p of produtosPadrao) {
        const [produto, created] = await Produto.findOrCreate({
            where: { nome: p.nome },
            defaults: p
        })
        if (created) console.log(`Produto ${produto.nome} criado`)
    }
}

module.exports = seedProdutos
