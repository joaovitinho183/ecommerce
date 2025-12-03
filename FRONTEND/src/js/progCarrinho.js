let token = sessionStorage.getItem('token')
let listaItens = document.getElementById('listaItens')
let totalValor = document.getElementById('totalValor')

let homeBtn = document.getElementById('homeBtn')
let usuarioBtn = document.getElementById('usuarioBtn')
let finalizarBtn = document.getElementById('finalizarBtn')

if (!token) {
    window.location.href = "./loginUsuario.html"
}

homeBtn.onclick = () => window.location.href = "../index.html"

usuarioBtn.onclick = () => {
    window.location.href = token ? "./usuario.html" : "./loginUsuario.html"
}

function getImagemCompleta(url) {
    if (!url) return ""
    if (url.startsWith("http")) return url
    url = url.replace(/^\/?public\//, "")
    url = url.replace(/^\/+/, "")
    return `http://localhost:3000/${url}`
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    listaItens.innerHTML = ""
    let total = 0
    if (carrinho.length === 0) {
        listaItens.innerHTML = `
            <h3 style="text-align:center; margin-top:20px; color:#0A0A0A;">
                Seu carrinho está vazio.
            </h3>`
        totalValor.innerText = "R$ 0,00"
        return
    }
    carrinho.forEach((item, index) => {
        total += item.preco * item.qtd
        let divItem = document.createElement("div")
        divItem.classList.add("item")
        console.log(item)
        const imgSrc = getImagemCompleta(item.imagem_url)
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
        `
        listaItens.appendChild(divItem)
    })
    totalValor.innerText = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

onload = carregarCarrinho

function alterarQtd(i, valor) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    carrinho[i].qtd += valor
    if (carrinho[i].qtd < 1) carrinho[i].qtd = 1
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    carregarCarrinho()
}

function removerItem(i) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    carrinho.splice(i, 1)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    carregarCarrinho()
}

finalizarBtn.onclick = () => {
    window.location.href = "./finalizarCompra.html"
}
