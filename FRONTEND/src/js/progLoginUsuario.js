let btnlogin = document.getElementById('btnlogin')
let res = document.getElementById('res')

btnlogin.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = `${dados.message}`
            sessionStorage.setItem('token', dados.token)
            sessionStorage.setItem('codUsuario', dados.codUsuario)
        })
        .catch((err) => {
            console.error('Erro ao fazer login', err)
        })
})