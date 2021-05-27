const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map((user) => user.toResponse()));
  next();
});

router.route('/').post(async (req, res, next) => {
  const newUser = await usersService.save(req.body);
  res.status(201).json(newUser.toResponse());
  next();
});

router.route('/:userId').get(async (req, res, next) => {
  const user = await usersService.findById(req.params.userId);
  res.status(200).json(user.toResponse());
  next();
});

router.route('/:userId').put(async (req, res, next) => {
  const user = await usersService.update(req.params.userId, req.body);
  res.status(200).json(user.toResponse());
  next();
});

router.route('/:userId').delete(async (req, res, next) => {
  await usersService.remove(req.params.userId);
  res.status(204).json();
  next();
});

module.exports = router;
