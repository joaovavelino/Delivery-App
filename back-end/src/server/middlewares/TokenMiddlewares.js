const { authenticateToken } = require('../utils/JWT');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const { id, role } = await authenticateToken(authorization);
    req.id = id;
    req.role = role;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};
module.exports = validateToken;