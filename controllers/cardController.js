const Card = require("../models/Card");
const List = require("../models/List");
const Board = require("../models/Board");
const customError = require("../utils/error");

const cardController = {
  createCard: async (req, res) => {
    const { listId } = req.params;
    const { title } = req.body;

    let existingList = await List.findOne({ _id: listId });
    if (!existingList) {
      throw new customError(404, "List not exist");
    }

    const newCard = await Card.create({
      title,
      listId,
    });

    return res.status(200).json({
      success: true,
      message: "Card created successfully",
      data: newCard,
    });
  },
  assignCardToBoardMember: async (req, res) => {
    const { cardId, memberId } = req.params;

    const existingBoardMember = await Board.findOne({
      members: { $in: memberId },
    });

    if (!existingBoardMember) {
      throw new customError(
        401,
        "This member has not invited to join the board"
      );
    }

    const existingCard = await Card.findOne({ _id: cardId });
    if (!existingCard) {
      throw new customError(404, "Card not found");
    }
    const alreadyAssignedMember = existingCard.members.some(
      (member) => member.toString() == memberId.toString()
    );
    if (alreadyAssignedMember) {
      throw new customError(409, "Already assigned the task to this member");
    }
    existingCard.members.push(memberId);
    await existingCard.save();
    return res.status(200).json({
      success: true,
      message: "Card successfully assigned to the member",
      data: existingCard,
    });
  },
  removeBoardMemberFromCard: async (req, res) => {
    const { cardId, memberId } = req.params;

    const cardExist = await Card.findOne({ _id: cardId });
    if (!cardExist) {
      throw new customError(404, "Card not found");
    }
    const memberIndex = cardExist.members.indexOf(memberId);
    if (memberIndex == -1) {
      throw new customError(404, "Member does not exist");
    }

    cardExist.members.splice(memberIndex, 1);
    await cardExist.save();
    return res.status(200).json({
      success: true,
      message: "Member successfull removed from the Card",
      data: cardExist,
    });
  },
  moveCardBetweenLists: async (req, res) => {
    const { cardId, listId } = req.params;

    const cardExist = await Card.findOne({ _id: cardId });

    const sourceList = await List.findOne({ _id: cardExist.listId });

    if (!cardExist) {
      throw new customError(404, "Card does not exist");
    }

    if (!sourceList) {
      throw new customError(404, "Source list does not exist");
    }

    const targetList = await List.findOne({ _id: listId });
    if (!targetList) {
      throw new customError(404, "Target List does not exist");
    }
    cardExist.listId = listId;
    await cardExist.save();
    return res.status(200).json({
      success: true,
      message: "Card successfully moved",
      data: targetList,
    });
  },
};

module.exports = cardController;
