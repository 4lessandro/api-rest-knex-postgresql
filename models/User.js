const knex = require('../database/connection.js');
const bcrypt = require('bcrypt');

class User {

    //Method responsável em realizar a criação do usuário
    async new(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({name, email, password: hash, role: 0}).table('users')
            return {success: 'Usuário cadastrado com sucesso'}
        } catch(error) {
            return {error: 'Erro ao cadastrar usuário'}
        }
    }

    //Method responsável em verificar se o e-mail já existe no banco de dados
    async findEmail(email) {
        try {
            var result = await knex.select('*').from('users').where({email: email})

            if(result.length > 0) {
                return true
            } else {
                return false //Possível cadastrar email
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }

    //Method responsável em listar todos os usuários que existe no banco de dados
    async findAll() {
        try {
            var users = await knex.select(['id', 'name', 'email']).table('users')
            return users
        } catch(error) {
            console.log(error)
            return [];
        }
    }
    
    //Method responsável em pesquisar um usuário através do ID
    async findById(id) {
    
        try {
            var result = await knex.select(['id', 'name', 'email']).table('users').where({id: id})

            if(result.length > 0) {
                return result
            } else {
                return undefined
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }

    //Method responsável por editar informações de usuários
    async update(id, name, email, role) {
        var user = await this.findById(id)

        if(user != undefined) {
            var updatedUser = {};

            if(email != undefined) {
                if(email != user.email) {
                    var result = await this.findEmail(email)
                    if(result == false) {
                        updatedUser.email = email
                    }
                }
            }

            if(name != undefined) {
                updatedUser.name = name
            }

            if(role != undefined) {
                updatedUser.role = role
            }

            try {
                await knex.update(updatedUser).where({id: id}).table('users')
                return {status: true}
            } catch (error) {
                return {status: false, error: error}
            }

        } else {
            return {error: 'Não foi possível editar dados, tente mais tarde.'}
        }
    }
}


module.exports = new User()