const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { findUser, createUser } = require("../service");

const addUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
});

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userValidationResult = addUserSchema.validate({ email, password });

    if (userValidationResult.error) {
      res.status(400).json({ message: userValidationResult.error.message });
    }

    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await createUser({ email, password: hashedPassword });

    const { subscription } = newUser;

    return res.status(201).json({
      message: "User created",
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  signup,
};
