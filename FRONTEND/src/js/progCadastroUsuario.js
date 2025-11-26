let btnCadastrar = document.getElementById('btnCadastrar')
let res = document.getElementById('res')

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let telefone = document.getElementById('telefone').value
    let cpf = document.getElementById('cpf').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        cpf: cpf
    }

    fetch(`http://localhost:3000/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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