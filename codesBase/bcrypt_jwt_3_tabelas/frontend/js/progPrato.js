let res = document.getElementById('res')

let btnPrato = document.getElementById('btnPrato')

let token = sessionStorage.getItem('token')

if(!token){
    setTimeout(()=>{
        location.href = '../index.html'
    },100)
}

btnPrato.addEventListener('click', (e)=>{
    e.preventDefault()

    let precoBase = Number(document.getElementById('precoBase').value)
    let categoria = document.getElementById('categoria').value
    let nomePrato = document.getElementById('nomePrato').value

    const valores = {
        precoBase: precoBase,
        categoria: categoria,
        nomePrato: nomePrato
    }

    fetch(`http://localhost:3000/prato`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        console.log(dados)
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar os dados',err)
    })
})