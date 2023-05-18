const express = require('express');
const { getAll, create, getAllSellers } = require('../controllers/OrderController');
const validateToken = require('../middlewares/TokenMiddlewares');

const sellerRouter = express.Router();
sellerRouter.post('/orders', validateToken, create);
sellerRouter.get('/orders', validateToken, getAll);
sellerRouter.get('/', getAllSellers);

module.exports = sellerRouter;