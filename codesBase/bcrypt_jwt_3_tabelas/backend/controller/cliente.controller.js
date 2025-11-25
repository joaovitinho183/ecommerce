const Cliente = require('../model/Cliente')
const { hashSenha } = require('../service/bcrypt.service')

const cadastrar = async (req,res) => {
    const valores = req.body
    console.log(valores)
    try{
        // valores.senha é a senha digitada pelo usuário
        if(valores.senha){
            valores.senha = await hashSenha(valores.senha)
        }
        const dados = await Cliente.create(valores)
        res.status(201).json(dados)
    }catch(err){
        console.error('Erro ao receber os dados do cliente',err)
        res.status(500).json({message: 'Erro ao receber os dados do cliente'})
    }
}

module.exports = {cadastrar}