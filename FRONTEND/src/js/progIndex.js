let token = sessionStorage.getItem('token')

let carrinho = document.getElementById('carrinho')
let loginUsuario = document.getElementById('loginUsuario')
let addCar = document.getElementById('addCar')

carrinho.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/carrinho.html"
    }
})

loginUsuario.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/usuario.html"
    }
})

addCar.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    }
})