let token = sessionStorage.getItem('token');
let listaItens = document.getElementById('listaItens');
let totalValor = document.getElementById('totalValor');

let homeBtn = document.getElementById('homeBtn');
let usuarioBtn = document.getElementById('usuarioBtn');
let finalizarBtn = document.getElementById('finalizarBtn');

// ====== VERIFICA LOGIN ======
if (!token) {
    window.location.href = "./loginUsuario.html";
}

// ====== BOTÕES ======
homeBtn.onclick = () => window.location.href = "../index.html";

usuarioBtn.onclick = () => {
    window.location.href = token ? "./usuario.html" : "./loginUsuario.html";
};

// Monta a URL completa da imagem (suporta URLs externas e paths locais)
function getImagemCompleta(url) {
    if (!url) return ""; // sem imagem

    // se já for url completa (externa)
    if (url.startsWith("http")) return url;

    // remove /public/ se alguém salvou assim
    url = url.replace(/^\/?public\//, "");
    // remove barra inicial se existir
    url = url.replace(/^\/+/, "");

    // caminho servido pelo express.static('public') -> /imgs/...
    // Se o DB já tiver "imgs/nome.jpg" ou "/imgs/nome.jpg" isso vira: http://localhost:3000/imgs/nome.jpg
    return `http://localhost:3000/${url}`;
}

// ====== ATUALIZAR TELA ======
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    listaItens.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        listaItens.innerHTML = `
            <h3 style="text-align:center; margin-top:20px; color:#0A0A0A;">
                Seu carrinho está vazio.
            </h3>`;
        totalValor.innerText = "R$ 0,00";
        return;
    }

    carrinho.forEach((item, index) => {
        total += item.preco * item.qtd;

        let divItem = document.createElement("div");
        divItem.classList.add("item");
        console.log(item);

        // monta src da imagem com a função (suporta local e externo)
        const imgSrc = getImagemCompleta(item.imagem_url);

        divItem.innerHTML = `
            <img src="${imgSrc}" alt="${item.nome}" onerror="this.style.opacity=0.2; this.nextElementSibling && (this.nextElementSibling.style.display='block');">

            <div class="info">
                <h3>${item.nome}</h3>
                <p>Preço: R$ ${item.preco.toLocaleString("pt-BR")}</p>

                <div class="qtd-box">
                    <button class="qtd-btn" onclick="alterarQtd(${index}, -1)">-</button>
                    <span class="qtd-number">${item.qtd}</span>
                    <button class="qtd-btn" onclick="alterarQtd(${index}, 1)">+</button>
                </div>
            </div>

            <button class="remove-btn" onclick="removerItem(${index})">
                <img src="../../public/imgs/trash.png" alt="Remover">
            </button>
        `;

        listaItens.appendChild(divItem);
    });

    totalValor.innerText = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

onload = carregarCarrinho;

// ====== ALTERAR QUANTIDADE ======
function alterarQtd(i, valor) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho[i].qtd += valor;

    if (carrinho[i].qtd < 1) carrinho[i].qtd = 1;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// ====== REMOVER ITEM ======
function removerItem(i) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.splice(i, 1);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

// ====== FINALIZAR COMPRA ======
finalizarBtn.onclick = () => {
    window.location.href = "./finalizarCompra.html";
};
