import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'secret';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default tokenValidation;
