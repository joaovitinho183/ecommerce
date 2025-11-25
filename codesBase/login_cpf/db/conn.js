const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('a','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate()
.then(()=>{
    console.log('Banco de dados Conectado!')
})
.catch((err)=>{
    console.error('Erro de conexão com banco de dados!',err)
})

module.exports = sequelize