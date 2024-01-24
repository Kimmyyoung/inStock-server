const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router
.route('/api/users')
.get(usersController.getUsers)
.post(usersController.LoginUser);

router.route('/api/users/signup')
.post(usersController.SignupUser)

module.exports = router;

