const LoginService = require('../services/LoginService');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await LoginService.login(req.body);
    const { token, name, role, id } = data;
    return res.status(200).json({ name, email, role, token, id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};