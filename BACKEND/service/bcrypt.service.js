const bcrypt = require('bcrypt')
require('dotenv').config()  // carregar as variáveis de ambiente
const SALTOS = 10

async function hashSenha(senha){
    return await bcrypt.hash(senha,SALTOS)
}

async function compareSenha(senha,hash){
    return await bcrypt.compare(senha,hash)
}

module.exports = { hashSenha, compareSenha }