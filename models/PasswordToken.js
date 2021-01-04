const knex = require('../database/connection');
const User = require('./User');
const { v4: uuidv4 } = require('uuid');

class PasswordToken {
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
}

module.exports = new PasswordToken();