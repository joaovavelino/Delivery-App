const express = require('express');
const loginController = require('../controllers/LoginController');
const { loginInputValidation } = require('../middlewares/loginMiddlewares');

const loginRouter = express.Router();

loginRouter.post('/', loginInputValidation, loginController.login);

module.exports = loginRouter;