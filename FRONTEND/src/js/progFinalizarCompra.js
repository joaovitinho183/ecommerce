document.addEventListener('DOMContentLoaded', () => {
    const btnBuscarCep = document.getElementById('btnBuscarCep')
    const btnFinalizar = document.getElementById('btnFinalizarCompra')

    const cepInput = document.getElementById('cep')
    const logradouroInput = document.getElementById('logradouro')
    const localidadeInput = document.getElementById('localidade')
    const bairroInput = document.getElementById('bairro')
    const ufInput = document.getElementById('uf')
    const numeroInput = document.getElementById('numero')
    const complementoInput = document.getElementById('complemento')

    if (btnBuscarCep) {
        btnBuscarCep.addEventListener('click', async (e) => {
            e.preventDefault()
            const cep = (cepInput.value || '').replace(/\D/g, '')
            if (!cep) return alert("Digite um CEP válido")
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                const data = await res.json()
                if (data.erro) return alert("CEP não encontrado")
                logradouroInput.value = data.logradouro || ''
                localidadeInput.value = data.localidade || ''
                bairroInput.value = data.bairro || ''
                ufInput.value = data.uf || ''
            } catch (err) {
                console.error("Erro ao consultar CEP:", err)
                alert("Erro ao consultar CEP")
            }
        })
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async (e) => {
            e.preventDefault()
            const token = sessionStorage.getItem('token')
            if (!token) return alert("Você precisa estar logado")
            const entrega = {
                cep: cepInput?.value || '',
                logradouro: logradouroInput?.value || '',
                bairro: bairroInput?.value || '',
                localidade: localidadeInput?.value || '',
                uf: ufInput?.value || '',
                numero: numeroInput?.value || '',
                complemento: complementoInput?.value || ''
            }
            const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')
            if (!carrinho.length) return alert('Carrinho vazio')
            const itens = carrinho.map(i => ({
                idProduto: i.codProduto || i.idProduto,
                quantidade: i.qtd || i.quantidade || 1
            }))
            console.log(itens)
            console.log(entrega)
            try {
                const res = await fetch('http://localhost:3000/pedido/finalizar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ itens, entrega })
                })
                const contentType = res.headers.get('content-type') || ''
                if (contentType.includes('application/json')) {
                    const body = await res.json()
                    if (!res.ok) {
                        console.error('Erro do servidor:', body)
                        return alert(body.error || 'Erro ao finalizar pedido')
                    }
                    alert(`Pedido finalizado com sucesso! ID: ${body.pedidoId}`)
                    localStorage.removeItem('carrinho')
                    window.location.href = '../html/adminPedido.html'
                } else {
                    const txt = await res.text()
                    console.error('Resposta inesperada (HTML):', txt)
                    alert('Erro inesperado do servidor. Veja console.')
                }
            } catch (err) {
                console.error('Erro na requisição:', err)
                alert('Erro ao finalizar pedido. Veja console.')
            }
        })
    }
})
