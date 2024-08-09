import { Router } from 'express';
import loginController from '../Controllers/loginController';
import loginValidation from '../middlewares/loginValidation';
import tokenValidation from '../middlewares/tokenValidation';

const loginRouter = Router();
loginRouter.post('/', loginValidation, loginController.loginPost);
loginRouter.get('/role', tokenValidation, loginController.loginRole);

export default loginRouter;
