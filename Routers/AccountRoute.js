const express = require('express');
const app = express.Router();
const AccountController = require('../Controllers/AccountController');
const multer = require('multer');
const upload = multer();
const requiredLogin = require('../middlewares/requiredLogin');

// Get information of profile
app.get('/', requiredLogin, AccountController.getProfile);

// Update profile (image and name)
app.patch('/', requiredLogin, upload.single("file"), AccountController.updateProfile);

// Login with username and password
app.post('/login', AccountController.login);

app.post('/change-password', requiredLogin, AccountController.changePassword);

// Login via url
app.post('/direct', AccountController.directLogin);

// Renew password
app.put('/renew-password', AccountController.renewPassword);

module.exports = app;