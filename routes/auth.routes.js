const router = require("express").Router();
const userController = require("../controllers/userController");
const joiSchemaValidation = require("../middlewares/joiSchemaValidation");
const schemaValidation = require("../validation/shemaValidation");

router.post(
  "/register",
  [joiSchemaValidation(schemaValidation.registerSchema)],
  userController.registerUser
);
router.post(
  "/login",
  [joiSchemaValidation(schemaValidation.loginSchema)],
  userController.loginUser
);

const authRouter = router;
module.exports = authRouter;
