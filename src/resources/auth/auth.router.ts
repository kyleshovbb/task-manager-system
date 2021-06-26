import { Router } from 'express';
import asyncHandler from '../../middleware/asyncHandler';
import { AuthRequest } from '../../types/auth.types';
import { JwtPayload } from '../../types/jwt.types';
import { findByLogin } from '../users/user.service';
import { checkIfPasswordMatch, createJwtToken } from './auth.helpers';

const router = Router();

router.route('/login').put(
  asyncHandler(async (req, res, next) => {
    const { login, password } = req.body as AuthRequest;

    const user = await findByLogin(login);

    if (!user) {
      next({
        message: 'The user is not yet registered',
        statusCode: 403,
      });
    }

    const passwordMatch = checkIfPasswordMatch(password, user!.password);

    if (!passwordMatch) {
      next({ message: 'The password does not match', statusCode: 403 });
    }

    const jwtPayload: JwtPayload = {
      login: user!.login,
      userId: user!.id,
    };

    const token = createJwtToken(jwtPayload);
    res.status(200).json({ token });
  })
);

export default router;
