const knex = require('../database/connection.js');
const bcrypt = require('bcrypt');

class User {

    //Method responsável em realizar a criação do usuário
    async new(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password: hash, role: 0}).table('users')
        } catch(error) {
            console.log(error)
        }
    }

    //Method responsável em verificar se o e-mail já existe no banco de dados
    async findEmail(email) {
        try {
            var result = await knex.select('*').from('users').where({email: email})

            if(result.length > 0) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }

    //Method responsável em listar todos os usuários que existe no banco de dados
    async findUsers() {
        try {
            var users = await knex.select(['id', 'name', 'email']).table('users')
            return users
        } catch(error) {
            console.log(error)
            return [];
        }
    }
}


module.exports = new User()