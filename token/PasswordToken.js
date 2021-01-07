const knex = require('../database/connection');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {
    //Method responsável em realizar a criação do Token para recuperação de senha
    async create(email) {
        var user = await knex.select('*').where({email: email}).table('users').first()
        if(user != undefined) {
            try {
                const token = uuidv4()
                await knex.insert({user_id: user.id, used: 0, token: token}).table('passwordtoken')                
                return {status: true, token: token}
            } catch(error) {
                return {status: false, error: 'Não existe'}
            }

        } else {
            return {status: false, error: 'E-mail não existe'}
        }
    }

    //Method responsável em realizar a validação do token criado anteriormente
    async validate(token) {
        try {
            var result = await knex.select().where({token: token}).table('passwordtoken')

            if(result.length > 0) {
                var tk = result[0]
                if(tk.used) {
                    return {status: false, error: 'Token já foi utilizado.'}
                } else {
                    return {status: true, token: tk}
                }
            } else {
                return {status: false, error: 'Token inválido.'}
            }
        } catch(error) {
            console.log(error)
            return {status: false, error: error}
        }
    }

    //Method responsável em realizar a atualização do token (se já foi utilizado)
    async setUsed(token) {
        await knex.update({used: 1}).where({token: token}).table('passwordtoken')
    }

}

module.exports = new PasswordToken();