const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    async index (req, res) {
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

    async create (req, res) {
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

    async findById (req, res) {
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

    async edit (req, res) {
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

    async remove (req, res) {
        //Deletar usuários
        var id = req.params.id
        var result = await User.delete(id)

        if(result.status) {
            res.status(200)
            res.json({success: 'Usuário deletado com sucesso.'})
        } else {
            res.status(406)
            res.json({error: 'Usuário deletado com sucesso.'})
        }
    }

    async recoverPassword (req, res) {
        //Recuperar Senha (Através do Token)
        var email = req.body.email
        var result = await PasswordToken.create(email)

        if(result.status) {
            res.status(200)
            res.json({success: result.token})
        } else {
            res.status(406)
            res.json({error: 'E-mail não existe.'})
        }
    }

    async changePassword (req, res) {
        //Alterar Senha
        var token = req.body.token
        var password = req.body.password
        var isTokenValid = await PasswordToken.validate(token)

        if(isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
            res.status(200)
            res.json({success: 'Senha alterada com sucesso.'})
        } else {
            res.status(406)
            res.json({error: 'Token inválido.'})
        }
    }

    async login (req, res) {
        //Login
        var { email, password } = req.body
        var user = await User.findByEmail(email)

        if(user != undefined) {
            var result = await bcrypt.compare(password, user[0].password)

            if(result) {
                res.status(200)
                res.json({success: 'Logado com sucesso.'})
            } else {
                res.status(406)
                res.json({error: 'E-mail ou senha incorreta.'})
            }
        } else {
            res.json({error: 'Usuário não existe.'})
        }
    }
}

module.exports = new UserController()