const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]

        try {
            var decoded = jwt.verify(token, process.env.SECRET)

            var data = new Date()

            var formattedData = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();

            var hour = data.getHours()
            var minute = data.getMinutes()
            var seconds = data.getSeconds()

            if(hour<10) hour = "0" + hour
            if(minute<10) minute = "0" + minute
            if(seconds<10) seconds = "0" + seconds

            var clock = hour+":"+minute+":"+seconds

            if(decoded.role == 1) {
                console.log(`Administrador: ${decoded.name} consultou usuários às ${clock} do dia ${formattedData}`)
                next()
            } else {
                res.status(406).
                res.json({error: 'Você não está autorizado'})
                return
            }
        } catch (error) {
            res.status(406)
            res.json({error: 'Você não está autorizado', errorMg: error})
            return
        }
    } else {
        res.status(406)
        res.json({error: 'Você não está autorizado'})
        return
    }
}