let token = sessionStorage.getItem("token")
let tabelaPedidos = document.getElementById("tabelaPedidos")
let modal = document.getElementById("modalPedido")
let fecharModal = document.getElementById("fecharModal")
let dadosPedidoDiv = document.getElementById("dadosPedido")

window.onload = () => {
    const fecharModalBtn = document.getElementById("fecharModal")

    fecharModalBtn.onclick = () => modal.style.display = "none"

    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none"
    }

    carregarPedidos()
}

const carregarPedidos = () => {
    fetch("http://localhost:3000/pedido/listar", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
            return resp.json()
        })
        .then(pedidos => {
            console.log(pedidos)

            if (!Array.isArray(pedidos)) throw new Error("Resposta inesperada do servidor")

            tabelaPedidos.innerHTML = ""
            pedidos.forEach(p => {
                let tr = document.createElement("tr")
                tr.innerHTML = `
                <td>${p.codPedido}</td>
                <td>${p.usuario ? p.usuario.nome : "Não encontrado"}</td>
                <td>R$ ${Number(p.valorTotal).toFixed(2)}</td>
                <td>${new Date(p.createdAt).toLocaleDateString("pt-BR")}</td>
                <td>${p.status || "N/A"}</td>
                <td>
                    <button class="btn-detalhes" onclick="verDetalhes(${p.codPedido})">
                        Ver detalhes
                    </button>
                </td>
            `
                tabelaPedidos.appendChild(tr)
            })
        })
        .catch(err => console.error("Erro ao carregar pedidos:", err))
}
carregarPedidos()
function verDetalhes(codPedido) {
    const token = sessionStorage.getItem('token')
    fetch(`http://localhost:3000/pedido/${codPedido}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
            return resp.json()
        })
        .then(dados => {
            dadosPedidoDiv.innerHTML = ""
            dadosPedidoDiv.innerHTML += `
                <h3>Pedido #${dados.codPedido}</h3>
                <p><strong>Cliente:</strong> ${dados.usuario?.nome || "Não encontrado"}</p>
                <p><strong>Status:</strong> ${dados.status || "N/A"}</p>
                <p><strong>Data:</strong> ${new Date(dados.createdAt).toLocaleDateString("pt-BR")}</p>
                <p><strong>Subtotal:</strong> R$ ${Number(dados.valorSubtotal).toFixed(2)}</p>
                <p><strong>Frete:</strong> R$ ${Number(dados.valorFrete || 0).toFixed(2)}</p>
                <p><strong>Total:</strong> R$ ${Number(dados.valorTotal).toFixed(2)}</p>
            `
            if (dados.itens && dados.itens.length > 0) {
                let itensHTML = "<h3>Itens:</h3><ul>"
                dados.itens.forEach(item => {
                    itensHTML += `
                        <li>
                            ${item.produto?.nome || "Produto não encontrado"} -
                            Quantidade: ${item.quantidade} -
                            Preço Unitário: R$ ${Number(item.precoUnitario).toFixed(2)} -
                            Total: R$ ${Number(item.valorTotalItem).toFixed(2)}
                        </li>
                    `
                })
                itensHTML += "</ul>"
                dadosPedidoDiv.innerHTML += itensHTML
            }
            if (dados.entrega) {
                dadosPedidoDiv.innerHTML += `
                    <h3>Entrega:</h3>
                    <p>${dados.entrega.logradouro}, ${dados.entrega.numero} ${dados.entrega.complemento || ""}</p>
                    <p>${dados.entrega.bairro} - ${dados.entrega.localidade}/${dados.entrega.uf}</p>
                    <p>CEP: ${dados.entrega.cep}</p>
                    <p>Status entrega: ${dados.entrega.statusEntrega || "N/A"}</p>
                `
            }
            modal.style.display = "block"
        })
        .catch(err => console.error("Erro ao carregar detalhes:", err))
}
