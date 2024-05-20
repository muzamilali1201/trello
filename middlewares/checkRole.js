const User = require("../models/User");
const customError = require("../utils/error");

const checkRole = async (req, res, next) => {
  const { userData } = req;
  const userExist = await User.findOne({ _id: userData._id });
  if (!userExist) {
    throw new customError(404, "User does not exist");
  }
  if (userExist.role == "User") {
    throw new customError(401, "You are not admin");
  }
  next();
};

module.exports = checkRole;
