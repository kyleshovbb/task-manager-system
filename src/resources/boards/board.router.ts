import { Router } from 'express';
import taskRouter from '../tasks/task.router';
import { getAll, save, findById, update, remove } from './board.service';

const router = Router();

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await getAll();
    res.json(boards.map((board) => board.toResponse()));
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await save(req.body);
    res.status(201).json(newBoard.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const board = await findById(req.params.boardId);
    res.json(board.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const board = await update(req.params.boardId, req.body);
    res.json(board.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    await remove(req.params.boardId);
    res.json();
  } catch (err) {
    res.status(404);
  }
  next();
});

router.use('/:boardId/tasks', taskRouter);

export default router;
