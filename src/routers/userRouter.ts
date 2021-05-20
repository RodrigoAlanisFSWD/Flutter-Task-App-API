import UserController from '../controllers/userController';
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import auth from '../middlewares/auth';

const router: Router = Router();

router.use(fileUpload())

router.post("/avatar", auth, UserController.uploadAvatar);

export default router;