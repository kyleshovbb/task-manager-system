import { Router } from 'express';
import asyncHandler from '../../middleware/async.handler';
import taskRouter from '../tasks/task.router';
import { getAll, save, findById, update, remove } from './board.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req, res, _next) => {
    const boards = await getAll();
    res.json(boards.map((board) => board.toResponse()));
  })
);

router.route('/').post(
  asyncHandler(async (req, res, _next) => {
    const newBoard = await save(req.body);
    res.status(201).json(newBoard.toResponse());
  })
);

router.route('/:boardId').get(
  asyncHandler(async (req, res, next) => {
    const board = await findById(req.params.boardId);
    if (board) {
      res.json(board.toResponse());
    } else {
      next({
        statusCode: 404,
        message: 'Board not found',
      });
    }
  })
);

router.route('/:boardId').put(
  asyncHandler(async (req, res, next) => {
    const board = await update(req.params.boardId, req.body);
    if (board) {
      res.json(board);
    } else {
      next({
        statusCode: 404,
        message: 'Board not found',
      });
    }
  })
);

router.route('/:boardId').delete(
  asyncHandler(async (req, res, _next) => {
    await remove(req.params.boardId);
    res.json();
  })
);

router.use('/:boardId/tasks', taskRouter);

export default router;
