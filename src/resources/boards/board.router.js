const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards.map((board) => board.toResponse()));
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardsService.save(req.body);
    res.status(201).json(newBoard.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const board = await boardsService.findById(req.params.boardId);
    res.json(board.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.json(board.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    await boardsService.remove(req.params.boardId);
    res.json();
  } catch (err) {
    res.status(404);
  }
  next();
});

module.exports = router;
