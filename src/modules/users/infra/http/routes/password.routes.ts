import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const sessionsRouter = Router();
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()


sessionsRouter.post('/', forgotPasswordController.create)
sessionsRouter.post('/', resetPasswordController.create)


export default sessionsRouter;
