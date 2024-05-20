const cardController = require("../controllers/cardController");
const checkRole = require("../middlewares/checkRole");
const tokenVerification = require("../middlewares/tokenVerification");

const router = require("express").Router();

router.post(
  "/:listId",
  [tokenVerification, checkRole],
  cardController.createCard
);

router.post(
  "/:cardId/:memberId",
  [tokenVerification, checkRole],
  cardController.assignCardToBoardMember
);

router.delete(
  "/:cardId/:memberId",
  [tokenVerification, checkRole],
  cardController.removeBoardMemberFromCard
);
router.post(
  "/move/:cardId/:listId",
  [tokenVerification],
  cardController.moveCardBetweenLists
);

const CardRouter = router;
module.exports = CardRouter;
