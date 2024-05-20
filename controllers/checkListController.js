const Card = require("../models/Card");
const CheckList = require("../models/CheckList");
const customError = require("../utils/error");

const checkListController = {
  createCheckList: async (req, res) => {
    const { cardId } = req.params;
    const { title } = req.body;
    const existingCard = await Card.findOne({ _id: cardId });
    if (!existingCard) {
      throw new customError(404, "Card does not exist");
    }

    const newCheckList = await CheckList.create({
      title,
    });

    existingCard.checkList = newCheckList._id;
    await existingCard.save();
    return res.status(200).json({
      success: true,
      message: "Check list created successfully",
      data: newCheckList,
    });
  },
  addCheckToList: async (req, res) => {
    const { checkListId } = req.params;
    const { title } = req.body;

    const existingCheckList = await CheckList.findOne({ _id: checkListId });

    if (!existingCheckList) {
      throw new customError(404, "CheckList not exist");
    }

    existingCheckList.items.push({
      title,
      completed: false,
    });
    await existingCheckList.save();
    return res.status(200).json({
      success: true,
      message: "Check is successfully added to the CheckList",
      data: existingCheckList,
    });
  },
  changeStatusOfTask: async (req, res) => {
    const { checkListId, checkId } = req.params;

    const existingCheckList = await CheckList.findOne({ _id: checkListId });
    if (!existingCheckList) {
      throw new customError(404, "CheckList not exist");
    }
    const existingCheck = existingCheckList.items.some(
      (item) => item._id == checkId
    );
    if (!existingCheck) {
      throw new customError(404, "Check not exist in checklist");
    }

    let checkIndex = existingCheckList.items.forEach((item) => {
      if (item._id == checkId && item.completed == false) {
        item.completed = true;
      } else {
        item.completed = false;
      }
    });
    await existingCheckList.save();
    return res.status(200).json({
      success: true,
      message: "Task Status changed successfully",
      data: existingCheckList,
    });
  },
};

module.exports = checkListController;
