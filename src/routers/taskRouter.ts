import { Router } from 'express';
import TaskController from '../controllers/taskController';
import auth from '../middlewares/auth';

const router: Router = Router();

router.post("/create/:category", auth, TaskController.create);
router.get("/getAll", auth, TaskController.getAll);
router.put("/done/:task", auth, TaskController.doneTask);
router.delete("/delete/:task", auth, TaskController.deleteTask);

export default router;