const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks.map((task) => task.toResponse()));
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/').post(async (req, res, next) => {
  try {
    const newTask = await tasksService.save(req.body, req.params.boardId);
    res.status(201).json(newTask.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.findById(req.params.taskId);
    res.json(task.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.json(task.toResponse());
  } catch (err) {
    res.status(404);
  }
  next();
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    await tasksService.removeByTaskId(req.params.taskId);
    res.json();
  } catch (err) {
    res.status(404);
  }
  next();
});

module.exports = router;
