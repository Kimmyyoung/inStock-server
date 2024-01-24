const userModel = require('../models/userModel');
const knex = require('knex')(require('./../knexfile'));

const getUsers = async(req,res) => {
  try{
    const users = await userModel.getUsers();
    res.status(200).json(users);
  }catch(err){
    res.status(400).send(`Error (getUser): ${err}`);
  }
}

const LoginUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.LoginUser(email, password);
    res.status(200).json(user);
  }catch(err){
    res.status(400).send(`Error (Login): ${err}`);
  }
}

const SignupUser = async (req, res) => {
  try{
    const {email, password, username} = req.body;
    const newuser = await userModel.signupUser(email, password, username);
    res.status(200).json(newuser);
  }catch(err) {
    res.status(400).send(`Error (Signup): ${err}`);
  }
}

module.exports = {
  getUsers,
  LoginUser,
  SignupUser
};

