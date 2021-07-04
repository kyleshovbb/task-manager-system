import jwt from 'jsonwebtoken';

import { findById } from '../resources/users/user.service';
import config from '../common/config';
import asyncHandler from './async.handler';
import { JwtPayload } from '../types/jwt.types';

export default asyncHandler(async (req, _res, next) => {
  if (!req.headers.authorization) {
    next({
      message: 'You need to be logged in to visit this route',
      statusCode: 401,
    });

    return;
  }

  const token = req.headers.authorization.replace('Bearer', '').trim();

  try {
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET_KEY as string
    ) as JwtPayload;

    const user = await findById(decoded.userId);

    if (user) {
      next();
    } else {
      next({
        message: 'You need to be logged in to visit this route',
        statusCode: 401,
      });
    }
  } catch (err) {
    next({
      message: 'You need to be logged in to visit this route',
      statusCode: 401,
    });
  }
});
