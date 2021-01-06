const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]

        try {
            var decoded = jwt.verify(token, process.env.SECRET)
            console.log(decoded)
            next()
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