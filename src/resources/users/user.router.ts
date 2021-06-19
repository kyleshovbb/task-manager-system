import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { getAll, save, findById, update, remove } from './user.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req, res, _next) => {
    const users = await getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map((user) => user.toResponse()));
  })
);

router.route('/').post(
  asyncHandler(async (req, res, _next) => {
    const newUser = await save(req.body);
    res.status(201).json(newUser.toResponse());
  })
);

router.route('/:userId').get(
  asyncHandler(async (req, res, next) => {
    const user = await findById(req.params.userId);
    if (user) {
      res.status(200).json(user.toResponse());
    } else {
      next({
        message: 'User not found',
        statusCode: 404,
      });
    }
  })
);

router.route('/:userId').put(
  asyncHandler(async (req, res, next) => {
    const user = await update(req.params.userId, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      next({
        message: 'User not found',
        statusCode: 404,
      });
    }
  })
);

router.route('/:userId').delete(
  asyncHandler(async (req, res, _next) => {
    await remove(req.params.userId);
    res.status(204).json();
  })
);

export default router;
