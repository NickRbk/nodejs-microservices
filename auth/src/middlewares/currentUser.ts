import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

/**
 * Modify TS typedefinition and add custom optional field to req{}
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * used TS feature ?.
   * (!req.session || !req.session.jwt) === !req.session?.jwt
   */
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload; // <--- applied new field currentUser for req{}
  } catch (err) {}

  next();
};
