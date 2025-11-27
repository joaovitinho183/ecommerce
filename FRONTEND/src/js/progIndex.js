let token = sessionStorage.getItem('token')

let carrinho = document.getElementById('carrinho')
let loginUsuario = document.getElementById('loginUsuario')


function addCar(nome, preco, foto) {
    if (!token) {
        return window.location.href = "./html/loginUsuario.html";
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho.push({ nome, preco, foto });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    window.location.href = "./html/carrinho.html";
}


loginUsuario.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/usuario.html"
    }
})

carrinho.addEventListener('click', () => {
    if (!token) {
        window.location.href = "./html/loginUsuario.html"
    } else {
        window.location.href = "./html/carrinho.html"
    }
})