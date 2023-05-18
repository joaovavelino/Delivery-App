const productService = require('../services/ProductService');

const getAll = async (_req, res, next) => {
  try {
    const products = await productService.getAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};