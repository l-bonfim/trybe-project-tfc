import { Request, Response } from 'express';
import loginService from '../Services/loginService';

const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginData = await loginService.loginPost(email, password);
  return res.status(loginData.status).json(loginData.data);
};

export default {
  loginPost,
};
