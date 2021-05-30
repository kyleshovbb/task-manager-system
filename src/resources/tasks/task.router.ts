import { Router } from 'express';
import { CreateRouterParams } from './task.types';
import { getAll, save, findById, update, removeByTaskId } from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(async (_req, res, next) => {
  try {
    const tasks = await getAll();
    res.json(tasks.map((task) => task.toResponse()));
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/').post<CreateRouterParams>(async (req, res, next) => {
  try {
    const newTask = await save(req.body, req.params.boardId);
    res.status(201).json(newTask.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await findById(req.params.taskId);
    if (task) {
      res.json(task.toResponse());
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await update(req.params.taskId, req.body);
    if (task) {
      res.json(task.toResponse());
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    await removeByTaskId(req.params.taskId);
    res.json();
  } catch (err) {
    res.status(404);
  }
  next();
});

export default router;
