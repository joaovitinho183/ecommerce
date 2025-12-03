const Usuario = require('../models/Usuario')
require('dotenv').config()
const { compareSenha } = require('../service/bcrypt.service')
const { gerarToken } = require('../service/jwt.service')

const login = async (req, res) => {
    const valores = req.body
    try {
        const usuario = await Usuario.findOne({ where: { email: valores.email } })
        if (!usuario) {
            return res.status(404).json({ message: "Usuario não encontrado!" })
        }
        const senhaValida = await compareSenha(valores.senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: "Senha inválida!" })
        }
        const token = gerarToken({
            codUsuario: usuario.codUsuario,
            email: usuario.email
        })
        res.status(200).json({ message: "Login realizado com sucesso!", token, codUsuario: usuario.codUsuario, tipo_usuario: usuario.tipo_usuario })
    } catch (err) {
        res.status(500).json({ message: "Erro ao realizar o login!" })
    }
}

const loginAdm = async (req, res) => {
    const valores = req.body
    if (!valores.codAdimin) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
    }
    try {
        if (valores.codAdimin !== process.env.adimin_pass) {
            return res.status(401).json({ message: "Senha inválida!" })
        }
        let usuario = await Usuario.findByPk(valores.codUsuario)
        await Usuario.update({ tipo_usuario: 'ADMIN' }, { where: { codUsuario: valores.codUsuario } })
        usuario = await Usuario.findByPk(valores.codUsuario)
        res.status(200).json({ message: "Login realizado com sucesso!", tipo_usuario: usuario.tipo_usuario })
    } catch (err) {
        res.status(500).json({ message: "Erro ao realizar o login!" })
    }
}

module.exports = { login, loginAdm }