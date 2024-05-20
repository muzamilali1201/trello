const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const customError = require("../utils/error");

const userController = {
  registerUser: async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      throw new customError(409, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    newUser = newUser.toObject();
    delete newUser.password;

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    let userExist = await User.findOne({ email });
    if (!userExist) {
      throw new customError(404, "User does not exist");
    }
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      throw new customError(401, "Invalid Credentials");
    }
    userExist = userExist.toObject();
    delete userExist.password;
    const token = jwt.sign(userExist, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token,
    });
  },
};
module.exports = userController;
