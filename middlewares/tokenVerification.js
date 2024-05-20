const jwt = require("jsonwebtoken");
const User = require("../models/User");
const customError = require("../utils/error");

const tokenVerification = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    throw new customError(400, "User is not logged in");
  }
  token = token.split(" ")[1];
  let decodeToken = "";
  try {
    decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    // if (decodeToken.exp < Date.now()) {
    //   throw new customError(401, "Token is expired");
    // }
    const userExist = await User.findOne({ email: decodeToken.email });
    if (!userExist) {
      throw new customError(401, "Unauthorized access");
    }
  } catch (error) {
    throw new customError(401, error.message);
  }
  req.userData = decodeToken;
  next();
};

module.exports = tokenVerification;
