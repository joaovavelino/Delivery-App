const { Sale, SaleProduct, User } = require('../../database/models');
const errorGenerate = require('../utils/errorGenerate');

const create = async ({ orderData, productData }) => {
  const { id } = await Sale.create(orderData);
  if (!id) throw errorGenerate(409, 'Error ao criar o pedido');
  await Promise.all(
    productData.map(
      (product) =>
          SaleProduct.create({
          saleId: id,
          productId: product.productId,
          quantity: product.quantity,
        }),
    ),
  );
  return id;
};

const getAll = async (user) => {  
  const orders = await Sale.findAll({ where: user });
  return orders;
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' }, attributes: ['id', 'name'] });

  return sellers;
};

module.exports = {
  getAll,
  create,
  getAllSellers,
};
