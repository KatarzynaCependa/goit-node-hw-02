const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "secret word";
// const passport = require("passport");
const { findUser, createUser } = require("../service");

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
});

const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userValidationResult = signUpSchema.validate({ email, password });

    if (userValidationResult.error) {
      res.status(400).json({ message: userValidationResult.error.message });
    }

    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(409).json({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({ email, password: hashedPassword });

    return res.status(201).json({
      message: "User created",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUser(email);
    const userValidationResult = logInSchema.validate({ email, password });

    if (userValidationResult.error) {
      res.status(400).json({ message: userValidationResult.error.message });
    }

    if (!existingUser.validPassword(password)) {
      res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      subscription: existingUser.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    existingUser.token = token;
    await existingUser.save();

    res.status(200).json({
      token,
      user: {
        email: existingUser.email,
        subscription: existingUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  signup,
  login,
};
