import { Router } from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject,
  createTeam,
  getTeams,
  addUserToTeam
} from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All project routes require authentication
router.use(authenticateToken);

// Project CRUD operations
router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Team management
router.post('/teams', createTeam);
router.get('/teams', getTeams);
router.post('/teams/add-user', addUserToTeam);

export default router;
