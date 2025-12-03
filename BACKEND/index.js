// Importa os módulos necessários para o servidor
const express = require('express')
const app = express()
const cors = require('cors')
const seed = require('./seed')

// Carrega as variáveis de ambiente
require('dotenv').config()
const hostname = process.env.DB_HOST || 'localhost'
const PORT = process.env.PORT || 3000

// Conecta com o banco de dados
const conn = require('./db/conn')

// Importa os controladores para as rotas
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')
const pedidoController = require('./controller/pedido.controller')
const authController = require('./controller/auth.controller')

// Importa o middleware de autenticação
const authMiddleware = require('./middleware/auth.middleware')

// Configura o Express para aceitar JSON e dados de formulários
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static('public'))

// ROTAS PÚBLICAS - não precisam de autenticação
app.post('/login', authController.login)
app.put('/login', authController.loginAdm)

app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario/:id', usuarioController.listar)
app.delete('/usuario/:id', usuarioController.apagar)

app.get('/produto', produtoController.listar)

// ROTAS PROTEGIDAS - precisam do middleware de autenticação
app.use(authMiddleware)

app.post('/produto', produtoController.cadastrar)
app.delete('/produto/:id', produtoController.apagar)
app.put('/produto/:id', produtoController.atualizar)

// Rotas para pedidos
app.post('/pedido/finalizar', pedidoController.finalizarCompra)
app.get('/pedidos', pedidoController.listarPedidosUsuario)
app.get('/pedido/listar', pedidoController.listarTodosPedidos)
app.get('/pedido/:id', pedidoController.detalhesDoPedido)

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.status(200).json({ message: "Aplicação rodando!" })
})

// Sincroniza o banco de dados e inicia o servidor
conn.sync()
    .then(async () => {
        // Cadastra produtos padrão no banco
        await seed()
        // Inicia o servidor na porta especificada
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao sincronizar com o banco de dados!', err)
    })
