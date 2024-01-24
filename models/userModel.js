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
    const user = await knex('users').where({ email: email }).first();
    if(!user) {
      throw new Error('Incorrect username');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      throw new Error('Incorrect password');
    }
    
    return user;
  }catch(err) {
    throw err;
  }
}

const signupUser = async (email, password, username) => {
  try {
    const newUser = await knex('users').insert({
      email: email,
      password: password,
      username: username,
    });    
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