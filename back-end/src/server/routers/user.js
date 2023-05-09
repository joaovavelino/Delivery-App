const express = require('express');
const { create, getUserById } = require('../controllers/UserController');
const validateToken = require('../middlewares/TokenMiddlewares');
const { validateRegisterBody } = require('../middlewares/userMiddlewares');

const userRouter = express.Router();

userRouter.post('/', validateRegisterBody, create);
userRouter.get('/:id', validateToken, getUserById);

module.exports = userRouter;