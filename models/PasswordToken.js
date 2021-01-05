const knex = require('../database/connection');
const User = require('./User');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {
    //Method responsável em realizar a criação do Token para recuperação de senha
    async create(email) {
        var user = await User.findByEmail(email)
        if(user != undefined) {
            try {
                const token = uuidv4()
                await knex.insert({user_id: user[0].id, used: 0, token: token}).table('passwordtoken')                
                return {status: true, token: token}

            } catch(error) {
                return {status: false, error: error}
            }

        } else {
            return {status: false, error: 'E-mail não existe'}
        }
    }

    //Method responsável em realizar a validação do token criado anteriromente
    async validate(token) {
        try {
            var result = await knex.select().where({token: token}).table('passwordtoken')

            if(result.length > 0) {
                var tk = result[0]
                if(tk.used) {
                    return {status: false}
                } else {
                    return {status: true, token: tk}
                }
            } else {
                return {status: false}
            }
        } catch(error) {
            console.log(error)
            return {status: false, error: error}
        }
    }

}

module.exports = new PasswordToken();