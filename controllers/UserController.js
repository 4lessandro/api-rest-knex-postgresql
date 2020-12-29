var User = require('../models/User');

class UserController {
    async index(req, res) {

        //Listar todos os usuários cadastrados
        var users = await User.findUsers()
        
        if(users) {
            res.status(200)
            res.json(users)
        } else {
            res.status(400)
            res.send('Erro ao consultar os usuários')
        }
    }

    async create(req, res) {
        var { name, email, password } = req.body

        //Verificar se os campos foram preenchidos
        if(email == undefined || name == undefined || password == undefined || password.length <= 0) {
            res.status(400)
            res.send('Preencha os campos corretamente')
        }

        //Verificar se o e-mail  já existe no banco de dados
        var emailExists = await User.findEmail(email)

        if(emailExists) {
            res.status(401)
            res.send('O e-mail já existe.')
            return
        }

        //Criar o usuário
        await User.new(name, email, password)

        res.status(200)
        res.send('Usuário cadastrado com sucesso')

    }
}

module.exports = new UserController()