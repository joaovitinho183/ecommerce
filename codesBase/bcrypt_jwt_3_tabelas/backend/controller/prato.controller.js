const Prato = require('../model/Prato')

const cadastrar = async (req,res) => {
    const valores = req.body
    console.log(valores)
    try{
        const dados = await Prato.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao receber os dados do prato',err)
        res.status(500).json({message: 'Erro ao receber os dados do prato'})
    }
}

module.exports = {cadastrar}