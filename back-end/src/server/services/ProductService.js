const { Product } = require('../../database/models');

const getAll = () => {
  const products = Product.findAll();

  return products;
};

module.exports = {
  getAll,
};