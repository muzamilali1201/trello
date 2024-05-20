const authRouter = require("./auth.routes");
const boardRouter = require("./board.routes");
const CardRouter = require("./card.routes");
const checkListRouter = require("./checkList.routes");
const listRouter = require("./list.routes");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/board", boardRouter);
router.use("/list", listRouter);
router.use("/card", CardRouter);
router.use("/check-list", checkListRouter);

module.exports = router;
