import { Request, Response } from 'express';
import loginService from '../Services/loginService';

const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginData = await loginService.loginPost(email, password);
  return res.status(loginData.status).json(loginData.data);
};

const loginRole = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = authorization.split(' ')[1];
  const roleData = await loginService.loginRole(token);
  return res.status(roleData.status).json(roleData.data);
};

export default {
  loginPost,
  loginRole,
};
