import { Router } from 'express';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask, 
  getTasksByUser 
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All task routes require authentication
router.use(authenticateToken);

// Task CRUD operations
router.post('/', createTask);
router.get('/', getTasks);
router.get('/my-tasks', getTasksByUser);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
