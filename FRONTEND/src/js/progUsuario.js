let codUsuario = sessionStorage.getItem('codUsuario');
let res = document.getElementById('res');

onload = () => {
    fetch(`http://localhost:3000/usuario/${codUsuario}`)
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML = gerarPerfil(dados);
        })
        .catch(err => {
            console.error('Erro ao listar usuário', err);
        });
};

function gerarPerfil(dados) {
    return `
        <div class="perfil-card">
            <h2>Perfil do Usuário</h2>

            <div class="perfil-item">
                <span class="label">Código:</span>
                <span class="valor">${dados.codUsuario}</span>
            </div>

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
    `;
}


