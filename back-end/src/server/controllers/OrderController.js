const OrderService = require('../services/OrderService');

const create = async (req, res, next) => {
  try {
    const id = await OrderService.create(req.body);
    res.status(201).json(id);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const { id, role } = req;
    const userRole = role === 'seller' ? 'sellerId' : 'userId';
    const user = { [userRole]: id };
    const orders = await OrderService.getAll(user);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await OrderService.getAllSellers();
    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  getAllSellers,
};