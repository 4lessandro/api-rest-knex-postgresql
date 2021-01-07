const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]

        try {
            var decoded = jwt.verify(token, process.env.SECRET)
            var date = new Date()
            
            if(decoded.role == 1) {
                console.log(`Admin: ${decoded.name} consultou usuários às ${date}`)
                next()
            } else {
                res.status(406).
                res.json('Você não está autorizado.')
                return
            }
        } catch (error) {
            console.log(error)
            res.status(406)
            res.json('Você não está autorizado.')
            return
        }
    } else {
        res.status(406)
        res.json('Você não está autorizado.')
        return
    }
}