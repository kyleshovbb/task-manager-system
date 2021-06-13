import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { CreateRouterParams } from './task.types';
import { getAll, save, findById, update, removeByTaskId } from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req, res, _next) => {
    const tasks = await getAll();
    res.json(tasks.map((task) => task.toResponse()));
  })
);

router.route('/').post<CreateRouterParams>(
  asyncHandler(async (req, res, _next) => {
    const newTask = await save(req.body, req.params.boardId);
    res.status(201).json(newTask.toResponse());
  })
);

router.route('/:taskId').get(
  asyncHandler(async (req, res, next) => {
    const task = await findById(req.params.taskId);
    if (task) {
      res.json(task.toResponse());
    } else {
      next({
        statusCode: 404,
        message: 'Task not found',
      });
    }
  })
);

router.route('/:taskId').put(
  asyncHandler(async (req, res, next) => {
    const task = await update(req.params.taskId, req.body);
    if (task) {
      res.json(task.toResponse());
    } else {
      next({
        statusCode: 404,
        message: 'Task not found',
      });
    }
  })
);

router.route('/:taskId').delete(
  asyncHandler(async (req, res, _next) => {
    await removeByTaskId(req.params.taskId);
    res.json();
  })
);

export default router;
