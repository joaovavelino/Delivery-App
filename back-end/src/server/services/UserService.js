const md5 = require('md5');
const { User } = require('../../database/models');
const errorGenerate = require('../utils/errorGenerate');

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) throw errorGenerate(404, 'User not found');

  return user;
};

const create = async ({ name, email, password, role = 'customer' }) => {
  const checkUser = await User.findOne({ where: { email } });
  
  if (checkUser) throw errorGenerate(409, 'User already exists');

  const hashPass = md5(password);
  
  const newUser = await User.create({ name, email, password: hashPass, role }); // model recebe a senha hasheada
  return newUser;
};

module.exports = {
  findUserById,
  create,
};