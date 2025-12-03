let codUsuario = sessionStorage.getItem('codUsuario')
let res = document.getElementById('res')
let apagar = document.getElementById('apagar')
let atualizar = document.getElementById('atualizar')

onload = () => {
    fetch(`http://localhost:3000/usuario/${codUsuario}`)
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = gerarPerfil(dados)
        })
        .catch(err => {
            console.error('Erro ao listar usuário', err)
        })
}

apagar.addEventListener('click', () => {
    let confirma = confirm("Você tem certeza que quer excluir este Usuario?")
    if (confirma === true) {
        fetch(`http://localhost:3000/usuario/${codUsuario}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(dados => {
            sessionStorage.clear()
            window.location.href = '../index.html'
        })
        .catch(err => {
            console.error('Erro ao apagar usuário', err)
        })
    }
})

function gerarPerfil(dados) {
    return `
        <div class="perfil-card">
            <h2>Perfil do Usuário</h2>

            <div class="perfil-item">
                <span class="label">Nome:</span>
                <span class="valor">${dados.nome}</span>
            </div>

            <div class="perfil-item">
                <span class="label">Email:</span>
                <span class="valor">${dados.email}</span>
            </div>

            <div class="perfil-item">
                <span class="label">Telefone:</span>
                <span class="valor">${dados.telefone}</span>
            </div>

            <div class="perfil-item">
                <span class="label">CPF:</span>
                <span class="valor">${dados.cpf}</span>
            </div>

            <div class="perfil-item">
                <span class="label">Tipo de Usuário:</span>
                <span class="valor tipo">${dados.tipo_usuario}</span>
            </div>
        </div>
    `
}
