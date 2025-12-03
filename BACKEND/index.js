const express = require('express');
const app = express();
const cors = require('cors');
const seed = require('./seed');

require('dotenv').config();
const hostname = process.env.DB_HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const conn = require('./db/conn');

// Controllers
const usuarioController = require('./controller/usuario.controller');
const produtoController = require('./controller/produto.controller');
const pedidoController = require('./controller/pedido.controller');
const authController = require('./controller/auth.controller');

// Middleware
const authMiddleware = require('./middleware/auth.middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve pasta pública
app.use(express.static('public'));

// ROTAS PÚBLICAS
app.post('/login', authController.login);
app.put('/login', authController.loginAdm);

app.post('/usuario', usuarioController.cadastrar);
app.get('/usuario/:id', usuarioController.listar);
app.delete('/usuario/:id', usuarioController.apagar);

app.get('/produto', produtoController.listar);

// ROTAS PROTEGIDAS
app.use(authMiddleware);

app.post('/produto', produtoController.cadastrar);
app.delete('/produto/:id', produtoController.apagar);
app.put('/produto/:id', produtoController.atualizar);

// Pedidos
app.post('/pedido/finalizar', pedidoController.finalizarCompra);
app.get('/pedidos', pedidoController.listarPedidosUsuario);
app.get('/pedido/listar', pedidoController.listarTodosPedidos);
app.get('/pedido/:id', pedidoController.detalhesDoPedido);

// Rota raiz teste
app.get('/', (req, res) => {
    res.status(200).json({ message: "Aplicação rodando!" });
});

// SYNC e START
conn.sync()
    .then(async () => {
        await seed(); // cadastra produtos padrão
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar com o banco de dados!', err);
    });
