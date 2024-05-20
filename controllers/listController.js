const { pipeline } = require("nodemailer/lib/xoauth2");
const Board = require("../models/Board");
const List = require("../models/List");
const customError = require("../utils/error");

const listController = {
  createList: async (req, res) => {
    const { title } = req.body;
    const { boardId } = req.params;

    const existingBoard = await Board.findOne({ _id: boardId });
    if (!existingBoard) {
      throw new customError(404, "Board does not exist");
    }

    const newList = await List.create({
      title,
      boardId,
    });

    return res.status(200).json({
      success: true,
      message: "List created successfully",
      data: newList,
    });
  },
  updateList: async (req, res) => {
    const { title } = req.body;
    const { listId } = req.params;
    const existingList = await List.findOne({ _id: listId });
    if (!existingList) {
      throw new customError(404, "List not exist");
    }

    const updatedList = await List.findByIdAndUpdate(listId, { title });

    return res.status(200).json({
      success: true,
      message: "List updated successfully",
      data: updatedList,
    });
  },
  getAllListOfBoard: async (req, res) => {
    const { boardId } = req.params;
    const { userData } = req;
    const existingBoard = await Board.findOne({
      _id: boardId,
    });

    if (!existingBoard) {
      throw new customError(404, "Board not exist");
    }

    const memberOfBoard = existingBoard.members.some(
      (member) => member == userData._id
    );
    if (!memberOfBoard) {
      throw new customError(404, "You are not the member of the board");
    }
    const lists = await Board.aggregate([
      {
        $lookup: {
          from: "lists",
          localField: "_id",
          foreignField: "boardId",
          as: "Result",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Lists successfully fetched",
      data: lists,
    });
  },
  getAllCardsOfList: async (req, res) => {
    const { listId } = req.params;
    const { userData } = req;
    const listExist = await List.findOne({ _id: listId });
    if (!listExist) {
      throw new customError(404, "List not exist");
    }

    const result = await List.aggregate([
      {
        $lookup: {
          from: "boards",
          localField: "boardId",
          foreignField: "_id",
          as: "board",
        },
      },
      {
        $unwind: "$board",
      },
    ]);

    const memberOfBoard = result[0].board.members.some(
      (member) => member == userData._id
    );
    if (!memberOfBoard) {
      throw new customError(404, "You are not the member of the board");
    }
    let Cards = await List.aggregate([
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "listId",
          as: "Result",
        },
      },
    ]);
    Cards = Cards.filter((Card) => {
      return Card._id == listId;
    });
    return res.status(200).json({
      success: true,
      message: "Cards fetched successfully",
      data: Cards,
    });
  },
};

module.exports = listController;
