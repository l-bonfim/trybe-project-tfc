import { Router } from 'express';
import loginController from '../Controllers/loginController';

const loginRouter = Router();
loginRouter.post('/', loginController.loginPost);

export default loginRouter;
