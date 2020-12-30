var User = require('../models/User');

class UserController {
    async index(req, res) {

        //Listar todos os usuários cadastrados
        var users = await User.findAll()
        
        if(users) {
            res.status(200)
            res.json(users)
        } else {
            res.status(400)
            res.json(users.error)
        }
    }

    async create(req, res) {
        var { name, email, password } = req.body

        //Verificar se os campos foram preenchidos
        if(email == undefined || name == undefined || password == undefined || password.length <= 0) {
            res.status(400)
            res.json({error: 'Preencha os campos corretamente.'})
        }

        //Verificar se o e-mail  já existe no banco de dados
        var emailExists = await User.findEmail(email)

        if(emailExists) {
            res.status(401)
            res.json({error: 'E-mail já existe.'})
            return
        }

        //Criar o usuário
        var user = await User.new(name, email, password)

        res.status(200)
        res.json(user)
        res.json(user.status)


    }

    async findById(req, res) {

        //Pesquisar usuário através do ID
        var id = req.params.id;
        var user = await User.findById(id)

        if(user == undefined) {
            res.status(404)
            res.json({error: 'ID não encontrado.'})
        } else {
            res.status(200)
            res.json(user)
        }
    }

    async edit(req, res) {

        //Editar usuários
        var { id, name, role, email } = req.body

        var result = await User.update(id, name, role, email)

        if(result != undefined) {
            if(result.status) {
                res.status(200)
                res.json({success: 'Usuário atualizado com sucesso.'})
            } else {
                res.status(406)
                res.json({error: 'Erro ao atualizar. Tente novamente mais tarde..'})
            }
        } else {
            res.status(406)
            res.json({error: 'Erro no servidor. Tente novamente mais tarde.'})
        }
    }
}

module.exports = new UserController()