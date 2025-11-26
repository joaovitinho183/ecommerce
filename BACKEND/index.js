const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()  // carregar as variáveis de ambiente
const hostname = process.env.DB_HOST
const PORT = process.env.PORT

const conn = require('./db/conn')

const usuarioController = require('./controller/usuario.controller')

const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.post('/login', authController.login)
app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario/:id', usuarioController.listar)

// app.use(authMiddleware)


app.get('/', (req, res) => {
    res.status(200).json({ message: "Aplicação rodando!" })
})

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao sincronizar com o banco de dados!', err)
    })