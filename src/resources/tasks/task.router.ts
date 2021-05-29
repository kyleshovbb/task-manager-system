import { Router } from 'express';
import { getAll, save, findById, update, removeByTaskId } from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await getAll();
    res.json(tasks.map((task) => task.toResponse()));
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/').post(async (req, res, next) => {
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
    res.json(task.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await update(req.params.taskId, req.body);
    res.json(task.toResponse());
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
