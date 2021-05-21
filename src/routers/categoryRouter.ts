import CategoryController from '../controllers/categoryController';
import { Router } from 'express';
import auth from '../middlewares/auth';

const router: Router = Router();

router.post("/create", auth,CategoryController.create);

export default router;