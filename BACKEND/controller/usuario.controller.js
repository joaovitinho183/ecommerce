const Usuario = require('../models/Usuario')
const { hashSenha } = require('../service/bcrypt.service')
const { validaCPF } = require('../utils/validar_cpf')

const cadastrar = async (req, res) => {
    const valores = req.body
    if (!valores.nome || !valores.email || !valores.senha || !valores.telefone || !valores.cpf) {
        return res.status(400).json({ message: 'Preencha todos os campos' })
    }

    // ---------------- regex para nome ----------------
    // Aceita apenas letras (maiúsculas e minúsculas) e espaços
    // // ^[A-Za-zÀ-ÿ\s]{3,40}$ → mínimo 3 caracteres, máximo 40
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]{3,40}$/
    if (!nomeRegex.test(valores.nome)) {
        return res.status(400).json({ message: 'Nome inválido! Use apenas letras e espaços.' })
    }

    // ---------------- validações regex para email ----------------
    // Verifica formato padrão de e-mail com letras, números e símbolos comuns
    // ^[^\s@]+@[^\s@]+\.[^\s@]+$ → exige um @ e um ponto após o domínio
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(valores.email)) {
        return res.status(400).json({ message: 'E-mail inválido!' })
    }

    // ---------------- validações regex para cpf ----------------
    // Aceita CPF no formato 000.000.000-00
    // ^\d{3}\.\d{3}\.\d{3}-\d{2}$ → três blocos de 3 dígitos e um de 2, com pontos e hífen
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(valores.cpf)) {
        return res.status(400).json({ message: 'CPF inválido! Formato esperado: 000.000.000-00' })
    }

    // Remove pontos e hífen antes de salvar no banco
    valores.cpf = valores.cpf.replace(/[.-]/g, '')

    // ---------------- validações regex para telefone ----------------
    // Aceita (DDD) com ou sem espaço e 8 ou 9 dígitos finais
    // ^(?:\(\d{2,3}\)\s?)?\d{4,5}-?\d{4}$ → ex: (11)91234-5678 ou 1123456789
    const telefoneRegex = /^(?:\(\d{2,3}\)\s?)?\d{4,5}-?\d{4}$/
    if (!telefoneRegex.test(valores.telefone)) {
        return res.status(400).json({ message: 'Telefone inválido! Formato esperado: (11)91234-5678' })
    }

    // ---------------- validações regex para senha ----------------
    // Exige ao menos 8 caracteres, com letras e números
    // ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$ → pelo menos uma letra e um número
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!senhaRegex.test(valores.senha)) {
        return res.status(400).json({ message: 'Senha inválida! Deve ter pelo menos 8 caracteres e conter letras e números.' })
    }

    // ---------------- validação algoritmo CPF ----------------
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
        res.status(201).json(dados)
    } catch (err) {
        console.error('Erro ao listar usuario', err)
        res.status(500).json({ message: "Erro ao listar usuario!" })
    }
}


module.exports = { cadastrar, listar }