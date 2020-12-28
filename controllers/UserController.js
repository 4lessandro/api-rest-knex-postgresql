class UserController {
    async index(req, res) {

    }

    async create(req, res) {
        console.log(req.body)
        res.send('REQ OK')
    }
}

module.exports = new UserController()