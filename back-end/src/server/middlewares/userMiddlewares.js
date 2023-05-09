const { registrationSchema, admRegistrationSchema } = require('../validations/JoiSchemas');

const validateRegisterBody = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

const validateAdmRegisterBody = (req, res, next) => {
  const { error } = admRegistrationSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = {
  validateRegisterBody,
  validateAdmRegisterBody,
};