import { Request, Response, NextFunction } from 'express';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export default tokenValidation;
