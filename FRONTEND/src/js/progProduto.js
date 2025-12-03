let tipo_usuario = sessionStorage.getItem('tipo_usuario')
let btnCadastrar = document.getElementById('btnCadastrar')
let res = document.getElementById('res')

onload = () => {
    if (tipo_usuario !== "ADMIN") {
        window.location.href = "./confirmAdimin.html"
    }
}

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let descricao = document.getElementById('descricao').value
    let modelo = document.getElementById('modelo').value
    let preco = Number(document.getElementById('preco').value)
    let imagem_url = document.getElementById('imagem_url').value
    let quantidade = Number(document.getElementById('quantidade').value)

    const valores = {
        nome: nome,
        descricao: descricao,
        modelo: modelo,
        preco: preco,
        imagem_url: imagem_url,
        quantidade: quantidade
    }

    fetch(`http://localhost:3000/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = `${dados.message}`
        })
        .catch((err) => {
            console.error('Erro ao cadastrar os dados', err)
        })
})