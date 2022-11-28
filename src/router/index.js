import Router from 'express'
import userController from '../controllers/user-controller.js';
import { registerValidation } from '../validation/validations.js'
import validError from '../validation/validation-errors.js'
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration', registerValidation, validError, userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)


export default router
