import { Router } from 'express';
import loginController from '../Controllers/loginController';
import loginValidation from '../middlewares/loginValidation';

const loginRouter = Router();
loginRouter.post('/', loginValidation, loginController.loginPost);

export default loginRouter;
