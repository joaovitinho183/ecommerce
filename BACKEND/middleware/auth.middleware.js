const { verificarToken } = require('../service/jwt.service')

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido!' })
    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Token inválido!' })
    try {
        const dadosToken = verificarToken(token)
        if (!dadosToken) return res.status(403).json({ error: 'Token inválido!' })
        req.usuario = dadosToken
        next()
    } catch (err) {
        console.error('Erro verificarToken:', err)
        return res.status(403).json({ error: 'Token inválido!' })
    }
}

module.exports = authMiddleware
