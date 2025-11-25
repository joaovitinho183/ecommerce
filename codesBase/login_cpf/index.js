const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost' // 127.0.0.1

const conn = require('./db/conn')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const estoqueController = require('./controller/estoque.controller')

// ------------- middleware express -------------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// ----------------------------------------------------

// ------------ rotas públicas ---------------
app.post('/usuario', usuarioController.cadastrar)

app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação Rodando!'})
})

// ---------- rotas privadas ---------------
app.use(authMiddleware)

app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)

app.post('/estoque', estoqueController.cadastrar)
app.get('/estoque', estoqueController.listar)


conn.sync()
.then(()=>{
    app.listen(PORT,hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao conectar com o banco de dados!',err)
})