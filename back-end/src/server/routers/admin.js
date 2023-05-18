const express = require('express');
const { create } = require('../controllers/AdminController');
const validateToken = require('../middlewares/TokenMiddlewares');
const { validateAdmRegisterBody } = require('../middlewares/userMiddlewares');

const adminRouter = express.Router();

adminRouter.post('/register', validateToken, validateAdmRegisterBody, create);

module.exports = adminRouter;
