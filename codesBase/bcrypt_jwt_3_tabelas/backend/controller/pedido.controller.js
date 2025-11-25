const Pedido = require('../model/Pedido')

const cadastrar = async (req,res) => {
    const valores = req.body
    console.log(valores)
    try{
        const dados = await Pedido.create(valores)
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao receber os dados do pedido',err)
        res.status(500).json({message: 'Erro ao receber os dados do pedido'})
    }
}
const listar = async (req,res) => {
    try{
        const dados = await Pedido.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar os dados do pedido',err)
        res.status(500).json({message: 'Erro ao listar os dados do pedido'})
    }
}
const apagar = async (req,res) => {
    const id = req.params.id
    console.log(id)
    try{
        const dados = await Pedido.findByPk(id)
        if(dados){
            await Pedido.destroy({where: {codPedido: id}})
            res.status(204).json({message: "Dados excluídos com sucesso!"})
        }else{
            res.status(404).json({message: "Pedido não encontrado!"})
        }
    }catch(err){
        console.error('Erro ao apagar os dados do pedido',err)
        res.status(500).json({message: 'Erro ao apagar os dados do pedido'})
    }
}
const atualizar = async (req,res) => {
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)
    try{
        let dados = await Pedido.findByPk(id)
        if(dados){
            await Pedido.update(valores, {where: {codPedido: id}})
            dados = await Pedido.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: "Pedido não encontrado!"})
        }
    }catch(err){
        console.error('Erro ao apagar os dados do pedido',err)
        res.status(500).json({message: 'Erro ao apagar os dados do pedido'})
    }
}

module.exports = {cadastrar, listar, apagar, atualizar}