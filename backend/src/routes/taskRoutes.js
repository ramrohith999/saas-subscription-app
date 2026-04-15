import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
