// Obtém o token de autenticação e o tipo de usuário armazenados na sessão
const token = sessionStorage.getItem('token')
const tipo_usuario = sessionStorage.getItem('tipo_usuario')

// Seleciona os elementos HTML da página para manipulação
const newCars = document.getElementById('newCars')
const carrinho = document.getElementById('carrinho')
const loginUsuario = document.getElementById('loginUsuario')
const addProduto = document.getElementById('addProduto')

// Configura os ouvintes de eventos para os botões de navegação
loginUsuario.addEventListener("click", () => {
    // Se não há token, redireciona para login; caso contrário, para a página do usuário
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/usuario.html"
    }
})

carrinho.addEventListener("click", () => {
    // Se não há token, redireciona para login; caso contrário, para o carrinho
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/carrinho.html"
    }
})

addProduto.addEventListener("click", () => {
    // Verifica se o usuário está logado
    if (!token) {
        return window.location.href = "./html/loginUsuario.html"
    }

    // Se for cliente, redireciona para confirmação de admin; caso contrário, para adicionar produto
    if (tipo_usuario === "CLIENTE") {
        return window.location.href = "./html/confirmAdimin.html"
    }

    window.location.href = "./html/produto.html"
})

// Função auxiliar para completar URLs de imagens
function getImagemCompleta(url) {
    // Se não há URL, retorna vazio
    if (!url) return ""
    // Se já é uma URL completa (externa), retorna como está
    if (url.startsWith("http")) return url
    // Remove barra inicial se existir
    if (url.startsWith("/")) url = url.substring(1)
    // Monta a URL completa com o servidor local
    return `http://localhost:3000/${url}`
}

// Função para adicionar um produto ao carrinho
function addCar(codProduto, nome, preco, imagem_url) {
    // Verifica se o usuário está logado
    const token = sessionStorage.getItem("token")
    if (!token) {
        return window.location.href = "./html/loginUsuario.html"
    }

    // Obtém o carrinho do localStorage ou cria um array vazio
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    preco = Number(preco)

    // Verifica se o produto já está no carrinho
    let itemExistente = carrinho.find(item => item.nome === nome)

    if (itemExistente) {
        // Se já existe, aumenta a quantidade
        itemExistente.qtd++
    } else {
        // Se não existe, adiciona no início do array
        carrinho.unshift({
            codProduto,
            nome,
            preco,
            imagem_url,
            qtd: 1
        })
    }

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    // Redireciona para a página do carrinho
    window.location.href = "./html/carrinho.html"
}

// Função para apagar um produto do banco de dados
function apagarProduto(codProduto) {
    // Confirma se o usuário quer excluir o produto
    let confirma = confirm("Você tem certeza que quer excluir este Produto?")
    if (confirma === true) {
        // Faz uma requisição DELETE para o servidor
        fetch(`http://localhost:3000/produto/${codProduto}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(dados => {
                // Recarrega a lista de produtos após a exclusão
                onload()
            })
            .catch(err => {
                console.error('Erro ao apagar produto', err)
            })
    }
}

// Função para gerar o HTML dos produtos
function gerarProdutos(dados) {
    let card = ""
    // Para cada produto, cria um card HTML
    dados.forEach(produto => {
        card += `
<div class="car-card">
    <img src="${getImagemCompleta(produto.imagem_url)}">
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <p>R$ ${produto.preco}</p>
    <div class="card-buttons">
        <button onclick="addCar(${produto.codProduto}, '${produto.nome}', ${produto.preco}, '${produto.imagem_url}')">
            <img src="../public/imgs/shopping-cart-add.png" width="40">
        </button>
        <button onclick="apagarProduto(${produto.codProduto})">
            <img src="../public/imgs/trash.png" width="40">
        </button>
    </div>
</div>
`
    })
    return card
}

// Quando a página carrega, busca os produtos do servidor
onload = () => {
    fetch("http://localhost:3000/produto")
        .then(resp => resp.json())
        .then(dados => {
            // Se não há dados, limpa o container; caso contrário, gera os cards
            if (dados === undefined) {
                newCars.innerHTML = ''
            } else {
                newCars.innerHTML = gerarProdutos(dados)
            }
        })
        .catch(err => {
            console.error("Erro ao listar produtos", err)
        })
}
