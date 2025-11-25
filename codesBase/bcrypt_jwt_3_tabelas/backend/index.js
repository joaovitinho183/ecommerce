const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

const clienteController = require('./controller/cliente.controller')
const pedidoController = require('./controller/pedido.controller')
const pratoController = require('./controller/prato.controller')

const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

// ----------- express middleware ---------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// ----------------------------------------------

// ------ rotas públicas -------------
app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

// ---- rotas privadas --------------------------
app.use(authMiddleware)

app.post('/prato', pratoController.cadastrar)

app.post('/pedido', pedidoController.cadastrar)
app.get('/pedido', pedidoController.listar)
app.delete('/pedido/:id', pedidoController.apagar)
app.put('/pedido/:id', pedidoController.atualizar)


app.get('/', (req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// ----------------------------------------------
conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao sincronizar com o banco de dados!',err)
})