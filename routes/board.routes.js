const router = require("express").Router();
const boardController = require("../controllers/boardController");
const checkRole = require("../middlewares/checkRole");
const tokenVerification = require("../middlewares/tokenVerification");

router.post("/", [tokenVerification, checkRole], boardController.createBoard);

router.post(
  "/:boardId",
  [tokenVerification, checkRole],
  boardController.updateBoard
);

router.post(
  "/:boardId/invite",
  [tokenVerification, checkRole],
  boardController.sendInvitationToJoinBoard
);

router.get(
  "/:boardId/join",
  [tokenVerification],
  boardController.joinBoardByInvitation
);
router.get(
  "/:boardId",
  [tokenVerification, checkRole],
  boardController.getSpecificBoard
);

router.get("/", [tokenVerification, checkRole], boardController.getAllBoards);

router.delete(
  "/:boardId/:memberId",
  [tokenVerification, checkRole],
  boardController.removeMemberFromBoard
);
router.get(
  "/:boardId/members",
  [tokenVerification],
  boardController.getMembersOfBoard
);

const boardRouter = router;

module.exports = boardRouter;
