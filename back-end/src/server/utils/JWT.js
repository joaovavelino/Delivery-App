require('dotenv');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtKey = fs.readFileSync(`${__dirname}/../../../jwt.evaluation.key`, 'utf-8');

const generateToken = (payload) => {  
    const token = jwt.sign(payload, jwtKey);
    return token;
};

const authenticateToken = async (token) => {
    const validateToken = jwt.verify(token, jwtKey);
    
    return validateToken;
};

module.exports = {
  generateToken,
  authenticateToken,
};