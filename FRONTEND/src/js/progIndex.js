let token = sessionStorage.getItem('token')

let loginUsuario = document.getElementById('loginUsuario')

loginUsuario.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/usuario.html"
    }
})