let codUsuario = sessionStorage.getItem('codUsuario')
let tipo_usuario = sessionStorage.getItem('tipo_usuario')
let btnlogin = document.getElementById('btnlogin')
let res = document.getElementById('res')

btnlogin.addEventListener('click', (e) => {
    e.preventDefault()

    let codAdimin = document.getElementById('codAdimin').value

    const valores = {
        codUsuario: codUsuario,
        codAdimin: codAdimin
    }

    fetch(`http://localhost:3000/login`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = `${dados.message}`
            sessionStorage.setItem('tipo_usuario', dados.tipo_usuario)
            tipo_usuario = sessionStorage.getItem('tipo_usuario')

            if (tipo_usuario === 'ADMIN') {
                window.location.href = './produto.html'
            }
        })
        .catch((err) => {
            console.error('Erro ao fazer login', err)
        })
})