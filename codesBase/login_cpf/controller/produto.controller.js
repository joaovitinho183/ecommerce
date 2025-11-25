const Produto = require('../model/Produto')

const cadastrar = async (req,res)=>{
    const valores = req.body

    if( !valores.nome || 
        !valores.marca ||
        !valores.quantidade ||
        !valores.preco){

            return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }

    try{
        const dados = await Produto.create(valores)
        res.status(201).json(dados)
    }catch(err){
        console.error('Erro ao cadastrar os dados',err)
        res.status(500).json({message: "Erro ao cadastrar os dados!"})
    }
}

const listar  = async (req,res)=>{
    try{
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: 'Erro ao listar os dados'})
        console.error('Erro ao listar os dados',err)
    }
}

module.exports = { cadastrar, listar }