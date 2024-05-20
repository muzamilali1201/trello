const listController = require("../controllers/listController");
const checkRole = require("../middlewares/checkRole");
const tokenVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

router.post(
  "/:boardId",
  [tokenVerification, checkRole],
  listController.createList
);
router.put(
  "/:listId",
  [tokenVerification, checkRole],
  listController.updateList
);
router.get("/:boardId", [tokenVerification], listController.getAllListOfBoard);

router.get(
  "/card/:listId",
  [tokenVerification],
  listController.getAllCardsOfList
);

const listRouter = router;
module.exports = listRouter;
