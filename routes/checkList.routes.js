const checkListController = require("../controllers/checkListController");
const tokenVerification = require("../middlewares/tokenVerification");
const checkRole = require("../middlewares/checkRole");

const router = require("express").Router();

router.post(
  "/card/:cardId",
  [tokenVerification, checkRole],
  checkListController.createCheckList
);

router.post(
  "/:checkListId",
  [tokenVerification, checkRole],
  checkListController.addCheckToList
);

router.put(
  "/:checkListId/:checkId",
  [tokenVerification],
  checkListController.changeStatusOfTask
);

const checkListRouter = router;
module.exports = checkListRouter;
