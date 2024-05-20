const Board = require("../models/Board");
const User = require("../models/User");
const customError = require("../utils/error");
const invitationSender = require("../utils/invitationSender");

const boardController = {
  createBoard: async (req, res) => {
    const { title } = req.body;
    const { userData } = req;
    const newBoard = await Board.create({
      title,
      createdBy: userData._id,
      members: userData._id,
    });
    return res.status(200).json({
      success: true,
      message: "Board created successfully",
      data: newBoard,
    });
  },
  sendInvitationToJoinBoard: async (req, res) => {
    const { email } = req.body;
    const { boardId } = req.params;
    const { userData } = req;
    // const boardOwner = await Board.findOne({
    //   // _id: boardId,
    //   createdBy: userData._id,
    // });
    const boardOwner = await Board.findOne({
      _id: boardId,
      createdBy: userData._id,
    });
    if (!boardOwner) {
      throw new customError(
        401,
        "You are not eligible for sending the invitation link"
      );
    }
    const userExistinDb = await User.findOne({ email });
    if (userExistinDb) {
      const alreadyJoined = boardOwner.members.some(
        (member) => member == userExistinDb._id
      );

      if (alreadyJoined) {
        throw new customError(409, "User already joined the board");
      }
      const newUserToBoard = await Board.findByIdAndUpdate(
        boardId,
        {
          $push: { members: userExistinDb._id },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "User successfully joined the board",
        data: newUserToBoard,
      });
    }

    const invitationLink = `http://localhost:3000/api/v1/board/${boardId}/join`;
    await invitationSender(email, invitationLink);
    return res.status(200).json({
      success: true,
      message: "Invitation send to the user for joining the board successfully",
    });
  },
  joinBoardByInvitation: async (req, res) => {
    const { boardId } = req.params;
    const { userData } = req;

    const boardExist = await Board.findOne({ _id: boardId });
    if (!boardExist) {
      throw new customError(404, "Board does not exist");
    }

    const alreadyMember = boardExist.members.some(
      (member) => member == userData._id
    );
    if (alreadyMember) {
      throw new customError(409, "You have already joined the board");
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: { members: userData._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User successfully joined the board",
      data: updatedBoard,
    });
  },
  getSpecificBoard: async (req, res) => {
    const { boardId } = req.params;
    const boardExist = await Board.findOne({ _id: boardId });
    if (!boardExist) {
      throw new customError(404, "Board does not exist");
    }
    return res.status(200).json({
      success: true,
      message: "Board fetched successfully",
      data: boardExist,
    });
  },
  getAllBoards: async (req, res) => {
    const { userData } = req;
    const boards = await Board.find({ createdBy: userData._id });
    return res.status(200).json({
      success: true,
      message: "Boards fetched successfully",
      data: boards,
    });
  },
  removeMemberFromBoard: async (req, res) => {
    const { userData } = req;
    const { memberId, boardId } = req.params;

    if (memberId == userData._id) {
      throw new customError(401, "You cannot remove yourself from the board");
    }
    let boardExist = await Board.findOne({
      _id: boardId,
      createdBy: userData._id,
    });
    if (!boardExist) {
      throw new customError(404, "Board not exist");
    }
    let memberIndex = boardExist.members.indexOf(memberId);
    boardExist.members.splice(memberIndex, 1);
    await boardExist.save();
    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
      data: boardExist,
    });
  },
  getMembersOfBoard: async (req, res) => {
    const { boardId } = req.params;
    const { userData } = req;
    const boardExist = await Board.findOne({
      _id: boardId,
    }).populate({
      path: "members",
      model: "User",
      select: "-password -role",
    });
    if (!boardExist) {
      throw new customError(404, "Board does not exist");
    }
    const memberOfBoard = boardExist.members.some(
      (member) => member._id == userData._id
    );
    if (!memberOfBoard) {
      throw new customError(404, "You are not the member of this board");
    }
    return res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: boardExist.members,
    });
  },
  updateBoard: async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    const existingBoard = await Board.findOne({ _id: boardId });
    if (!existingBoard) {
      throw new customError(404, "Board does not exist");
    }

    const updatedBoard = await Board.findByIdAndUpdate(boardId, { title });
    return res.status(200).json({
      success: true,
      message: "Board updated successfully",
      data: updatedBoard,
    });
  },
};
module.exports = boardController;
