let token = sessionStorage.getItem('token');
let listaItens = document.getElementById('listaItens');
let totalValor = document.getElementById('totalValor');

let homeBtn = document.getElementById('homeBtn');
let usuarioBtn = document.getElementById('usuarioBtn');

// ====== VERIFICA LOGIN ======
if (!token) {
    window.location.href = "./loginUsuario.html";
}

// ====== BOTÕES ======
homeBtn.onclick = () => window.location.href = "../index.html";

usuarioBtn.onclick = () => {
    if (!token) {
        window.location.href = "./loginUsuario.html";
    } else {
        window.location.href = "./usuario.html";
    }
};

// ====== CARREGAR CARRINHO ======
onload = () => {
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
        total += item.preco;

        let divItem = document.createElement("div");

        // =====================================================
        //  CSS PROFISSIONAL ESTILO "CARRERA ONE"
        // =====================================================
        divItem.style.background = "#0A0A0A";                    // var(--black)
        divItem.style.border = "1.5px solid #2A2A2A";            // var(--graphite)
        divItem.style.borderRadius = "20px";
        divItem.style.padding = "22px";
        divItem.style.marginBottom = "10px";
        divItem.style.display = "flex";
        divItem.style.gap = "30px";
        divItem.style.alignItems = "center";
        divItem.style.boxShadow = "0 8px 18px rgba(0,0,0,0.45)";
        divItem.style.transition = "0.25s ease";

        divItem.onmouseenter = () => {
            divItem.style.transform = "translateY(-6px)";
            divItem.style.boxShadow = "0 14px 26px rgba(0,0,0,0.6)";
        };
        divItem.onmouseleave = () => {
            divItem.style.transform = "none";
            divItem.style.boxShadow = "0 8px 18px rgba(0,0,0,0.45)";
        };

        divItem.innerHTML = `
            <img src="${item.foto}" style="
                width: 230px;
                height: 150px;
                object-fit: cover;
                border-radius: 14px;
                border: 2px solid #2A2A2A;
            ">
            
            <div class="info" style="
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 6px;
            ">
                <h3 style="
                    color: #F6F6F6;
                    font-size: 28px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                ">${item.nome}</h3>

                <p style="
                    color: #CFCFCF;
                    font-size: 20px;
                    font-weight: 500;
                ">R$ ${item.preco.toLocaleString("pt-BR")}</p>
            </div>

            <button onclick="removerItem(${index})" style="
                background: transparent;
                border: 2px solid #D10000;
                padding: 12px;
                width: 58px;
                height: 58px;

                display: flex;
                justify-content: center;
                align-items: center;

                border-radius: 50%;
                cursor: pointer;
                transition: 0.25s ease;
            "
            onmouseenter="this.style.background='#D10000'; this.style.transform='scale(1.15)'; this.style.boxShadow='0 0 10px #ff000066'"
            onmouseleave="this.style.background='transparent'; this.style.transform='scale(1)'; this.style.boxShadow='none'">
                <img src='../../public/imgs/trash.png' style="width: 28px;">
            </button>
        `;

        listaItens.appendChild(divItem);
    });

    totalValor.innerText = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// ====== REMOVER ITEM ======
function removerItem(i) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(i, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    onload();
}
