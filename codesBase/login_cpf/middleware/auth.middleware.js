function authMiddleware(req,res,next){

    const statusLog = req.query.statusLog
    console.log('valor statusLog =',statusLog)

    if(statusLog !== "true"){
        return res.status(401).json({message: 'Acesso negado! Faça o login!'})
    }

    next()
}

module.exports = authMiddleware