const express = require('express');
const { getAll } = require('../controllers/ProductController');
const validateToken = require('../middlewares/TokenMiddlewares');

const ProductRouter = express.Router();

ProductRouter.get('/', validateToken, getAll);

module.exports = ProductRouter;