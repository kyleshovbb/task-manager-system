const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map((user) => user.toResponse()));
  next();
});

router.route('/').post(async (req, res, next) => {
  const useUser = await usersService.save(req.body);
  res.status(201).json(useUser.toResponse());
  next();
});

router.route('/:userId').get(async (req, res, next) => {
  const useUser = await usersService.findById(req.params.userId);
  res.status(200).json(useUser.toResponse());
  next();
});

module.exports = router;
