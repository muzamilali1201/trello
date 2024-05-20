# Trello Clone API Documentation

Welcome to the API documentation for Trello Clone, a project management tool inspired by Trello. This documentation provides detailed information on how to interact with the various endpoints of the Trello Clone API to manage boards, lists, cards, checklists, and user authentication.

## Table of Contents

- [Authentication Routes](#authentication-routes)
- [Board Routes](#board-routes)
- [List Routes](#list-routes)
- [Card Routes](#card-routes)
- [Checklist Routes](#checklist-routes)

---

## Authentication Routes

### Register a User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user into the system.
- **Body Requirements:** Validated against a Joi schema.
- **Parameters:** None
- **Returns:** A confirmation of registration.

### Login a User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and issues a token.
- **Body Requirements:** Validated against a Joi schema.
- **Parameters:** None
- **Returns:** An authentication token.

---

## Board Routes

### Create Board

- **URL:** `/board/`
- **Method:** `POST`
- **Description:** Creates a new board.
- **Middlewares:** Token verification, role check.
- **Body Requirements:** None specified.
- **Parameters:** None
- **Returns:** Details of the newly created board.

### Update Board

- **URL:** `/board/:boardId`
- **Method:** `POST`
- **Description:** Updates an existing board.
- **Middlewares:** Token verification, role check.
- **Body Requirements:** Changes to the board details.
- **Parameters:** `boardId` - ID of the board to update.
- **Returns:** Updated board details.

### Send Board Invitation

- **URL:** `/board/:boardId/invite`
- **Method:** `POST`
- **Description:** Sends an invitation to join a board.
- **Middlewares:** Token verification, role check.
- **Body Requirements:** Email or user identifier of the invitee.
- **Parameters:** `boardId` - ID of the board.
- **Returns:** Confirmation of the invitation sent.

### Join Board by Invitation

- **URL:** `/board/:boardId/join`
- **Method:** `GET`
- **Description:** Allows a user to join a board using an invitation.
- **Middlewares:** Token verification.
- **Parameters:** `boardId` - ID of the board to join.
- **Returns:** Confirmation of joining the board.

### Get Specific Board

- **URL:** `/board/:boardId`
- **Method:** `GET`
- **Description:** Retrieves details of a specific board.
- **Middlewares:** Token verification, role check.
- **Parameters:** `boardId` - ID of the board.
- **Returns:** Board details.

### Get All Boards

- **URL:** `/board/`
- **Method:** `GET`
- **Description:** Retrieves all boards accessible to the user.
- **Middlewares:** Token verification, role check.
- **Parameters:** None
- **Returns:** List of all boards.

### Remove Member from Board

- **URL:** `/board/:boardId/:memberId`
- **Method:** `DELETE`
- **Description:** Removes a member from a board.
- **Middlewares:** Token verification, role check.
- **Parameters:** `boardId` - ID of the board, `memberId` - ID of the member to remove.
- **Returns:** Confirmation of member removal.

### Get Members of Board

- **URL:** `/board/:boardId/members`
- **Method:** `GET`
- **Description:** Retrieves all members of a board.
- **Middlewares:** Token verification.
- **Parameters:** `boardId` - ID of the board.
- **Returns:** List of members.

---

## List Routes

### Create List

- **URL:** `/list/:boardId`
- **Method:** `POST`
- **Description:** Creates a new list within a specified board.
- **Middlewares:** Token verification, role check.
- **Parameters:** `boardId` - ID of the board.
- **Returns:** Details of the newly created list.

### Update List

- **URL:** `/list/:listId`
- **Method:** `PUT`
- **Description:** Updates details of a specific list.
- **Middlewares:** Token verification, role check.
- **Parameters:** `listId` - ID of the list.
- **Returns:** Updated list details.

### Get All Lists of a Board

- **URL:** `/list/:boardId`
- **Method:** `GET`
- **Description:** Retrieves all lists associated with a specific board.
- **Middlewares:** Token verification.
- **Parameters:** `boardId` - ID of the board.
- **Returns:** List of all

lists in the board.

### Get All Cards of a List

- **URL:** `/list/card/:listId`
- **Method:** `GET`
- **Description:** Retrieves all cards within a specific list.
- **Middlewares:** Token verification.
- **Parameters:** `listId` - ID of the list.
- **Returns:** List of all cards in the list.

---

## Card Routes

### Create Card

- **URL:** `/card/:listId`
- **Method:** `POST`
- **Description:** Creates a new card within a list.
- **Middlewares:** Token verification, role check.
- **Parameters:** `listId` - ID of the list.
- **Returns:** Details of the newly created card.

### Assign Card to Board Member

- **URL:** `/card/:cardId/:memberId`
- **Method:** `POST`
- **Description:** Assigns a card to a board member.
- **Middlewares:** Token verification, role check.
- **Parameters:** `cardId` - ID of the card, `memberId` - ID of the member.
- **Returns:** Confirmation of assignment.

### Remove Board Member from Card

- **URL:** `/card/:cardId/:memberId`
- **Method:** `DELETE`
- **Description:** Removes a board member from a card.
- **Middlewares:** Token verification, role check.
- **Parameters:** `cardId` - ID of the card, `memberId` - ID of the member.
- **Returns:** Confirmation of member removal.

### Move Card Between Lists

- **URL:** `/card/move/:cardId/:listId`
- **Method:** `POST`
- **Description:** Moves a card from one list to another.
- **Middlewares:** Token verification.
- **Parameters:** `cardId` - ID of the card, `listId` - ID of the new list.
- **Returns:** Confirmation of the move.

---

## Checklist Routes

### Create Checklist

- **URL:** `/check-list/card/:cardId`
- **Method:** `POST`
- **Description:** Creates a new checklist associated with a card.
- **Middlewares:** Token verification, role check.
- **Parameters:** `cardId` - ID of the card.
- **Returns:** Details of the newly created checklist.

### Add Check to List

- **URL:** `/check-list/:checkListId`
- **Method:** `POST`
- **Description:** Adds a check item to an existing checklist.
- **Middlewares:** Token verification, role check.
- **Parameters:** `checkListId` - ID of the checklist.
- **Returns:** Updated checklist details.

### Change Status of Task

- **URL:** `/check-list/:checkListId/:checkId`
- **Method:** `PUT`
- **Description:** Updates the status of a task within a checklist.
- **Middlewares:** Token verification.
- **Parameters:** `checkListId` - ID of the checklist, `checkId` - ID of the task.
- **Returns:** Updated task details.

---
