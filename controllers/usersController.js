const userModel = require('../models/userModel');
const knex = require('knex')(require('./../knexfile'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

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
    const payload = { id: user.id, email: user.email};

    if(user) {
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h'
      });

      console.log(token);

      res.json({
        success: true,
        token: token
      })
    }else {
      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      })
    }
  }catch(err){
    res.status(400).send(`Error (Login): ${err}`);
  }
}

const SignupUser = async (req, res) => {
  try{
    const {email, password, username} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await userModel.signupUser(email, hashedPassword, username);
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

