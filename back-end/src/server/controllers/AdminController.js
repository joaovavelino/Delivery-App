const adminService = require('../services/AdminService');

const create = async (req, res, next) => {
  try {
    const newUser = await adminService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};