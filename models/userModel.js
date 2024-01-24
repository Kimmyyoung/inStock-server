const knex = require('knex')(require('./../knexfile'));
const bcrypt = require('bcrypt');

const getUsers = async () => {
  try {
    const users = await knex('users');
    return users;
  }catch(err) {
    throw err;
  }
};

const LoginUser = async (email, password) => {
  try {
    const user = await knex('users').where({ email }).first();
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      throw new Error('Incorrect password');
    }
    
    return user;
  }catch(err) {
    throw err;
  }
}

const signupUser = async (user) => {
  try {
    const newUser = await knex('users').insert(user);
    return newUser;
  }catch(err) {
    throw err;
  }
}

module.exports = {
  getUsers,
  LoginUser,
  signupUser
};