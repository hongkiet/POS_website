const express = require('express');
const app = express.Router();
const UsersController = require('../Controllers/UsersController');
const requiredLogin = require('../middlewares/requiredLogin');


app.get('/', requiredLogin, UsersController.index)

app.put('/:userId', requiredLogin, UsersController.update)

app.delete('/:userId', requiredLogin, UsersController.destroy)


app.post('/register', requiredLogin, UsersController.register);

app.post('/resend', requiredLogin, UsersController.resendEmail);

module.exports = app;