let token = sessionStorage.getItem('token');
let tipo_usuario = sessionStorage.getItem('tipo_usuario');

let newCars = document.getElementById('newCars');
let carrinho = document.getElementById('carrinho');
let loginUsuario = document.getElementById('loginUsuario');
let addProduto = document.getElementById('addProduto');

// LISTAR PRODUTOS DO BANCO
onload = () => {
    fetch("http://localhost:3000/produto")
        .then(resp => resp.json())
        .then(dados => {
            if (dados === undefined) {
                newCars.innerHTML = ''
            } else {
                newCars.innerHTML = gerarProdutos(dados);
            }
        })
        .catch(err => {
            console.error("Erro ao listar produtos", err);
        });
};

function addCar(codProduto, nome, preco, imagem_url) {
    const token = sessionStorage.getItem("token");
    if (!token) {
        return window.location.href = "./html/loginUsuario.html";
    }

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    preco = Number(preco);

    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        // Adiciona no começo do array
        carrinho.unshift({
            codProduto,
            nome,
            preco,
            imagem_url,
            qtd: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "./html/carrinho.html";
}

// CORREÇÃO: Função apagarProduto agora recebe e utiliza codProduto
function apagarProduto(codProduto) {
    let confirma = confirm("Você tem certeza que quer excluir este Produto?");
    if (confirma === true) {
        fetch(`http://localhost:3000/produto/${codProduto}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(dados => {
                // Recarrega a página ou a lista de produtos após a exclusão
                onload()
            })
            .catch(err => {
                console.error('Erro ao apagar produto', err);
            });
    }
}

// BOTÕES
loginUsuario.addEventListener("click", () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html";
    } else {
        window.location.href = "./html/usuario.html";
    }
});

carrinho.addEventListener("click", () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html";
    } else {
        window.location.href = "./html/carrinho.html";
    }
});

addProduto.addEventListener("click", () => {
    if (!token) {
        return window.location.href = "./html/loginUsuario.html";
    }

    if (tipo_usuario === "CLIENTE") {
        return window.location.href = "./html/confirmAdimin.html";
    }

    window.location.href = "./html/produto.html";
});

// GERA TODOS OS PRODUTOS
function gerarProdutos(dados) {
    let card = "";

    dados.forEach(produto => {
        card += `
            <div class="car-card">
                <img src="${produto.imagem_url}" alt="">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco}</p>

                <button onclick="addCar(${produto.codProduto}, '${produto.nome}', ${produto.preco}, '${produto.imagem_url}')">
                    <img src="../public/imgs/shopping-cart-add.png" width="40">
                </button>

                <button onclick="apagarProduto(${produto.codProduto})">
                    <img src="../public/imgs/trash.png" width="40">
                </button>
            </div>
        `;
    });

    return card;
}