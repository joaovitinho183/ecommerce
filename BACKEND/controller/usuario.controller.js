const Usuario = require('../models/Usuario')
const { hashSenha } = require('../service/bcrypt.service')
const { validaCPF } = require('../utils/validar_cpf')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
    }
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]{3,40}$/
    if (!nomeRegex.test(valores.nome)) {
        return res.status(400).json({ message: 'Nome inválido! Use apenas letras e espaços.' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(valores.email)) {
        return res.status(400).json({ message: 'E-mail inválido!' })
    }
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(valores.cpf)) {
        return res.status(400).json({ message: 'CPF inválido! Formato esperado: 000.000.000-00' })
    }
    valores.cpf = valores.cpf.replace(/[.-]/g, '')
    const telefoneRegex = /^(?:\(\d{2,3}\)\s?)?\d{4,5}-?\d{4}$/
    if (!telefoneRegex.test(valores.telefone)) {
        return res.status(400).json({ message: 'Telefone inválido! Formato esperado: (11)91234-5678' })
    }
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!senhaRegex.test(valores.senha)) {
        return res.status(400).json({ message: 'Senha inválida! Deve ter pelo menos 8 caracteres e conter letras e números.' })
    }
    if (!validaCPF(valores.cpf)) {
        return res.status(400).json({ message: 'CPF inválido! Dígitos verificadores incorretos.' })
    }
    try {
        if (valores.senha) {
            valores.senha = await hashSenha(valores.senha)
        }
        const dados = await Usuario.create(valores)
        res.status(201).json({ message: 'Cadastro do usuario ralizado!!!' })
    } catch (err) {
        console.error('Erro ao cadastrar os dados', err)
        res.status(500).json({ message: "Erro ao cadastrar os dados!" })
    }
}

const listar = async (req, res) => {
    const codUsuario = req.params.id
    try {
        const dados = await Usuario.findOne({ where: { codUsuario: codUsuario } })
        if (!dados) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar usuario', err)
        res.status(500).json({ message: "Erro ao listar usuario!" })
    }
}

const apagar = async (req, res) => {
    const codUsuario = req.params.id
    try {
        const dados = await Usuario.findByPk(codUsuario)
        if (dados) {
            await Usuario.destroy({ where: { codUsuario: codUsuario } })
            res.status(204).json({ message: "Dados excluídos com sucesso!" })
        } else {
            res.status(404).json({ message: "Usuario não encontrado!" })
        }
    } catch (err) {
        console.error('Erro ao apagar os dados do usuario', err)
        res.status(500).json({ message: 'Erro ao apagar os dados do usuario' })
    }
}

module.exports = { cadastrar, listar, apagar }