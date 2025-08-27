import { Router } from 'express';
import authRoutes from './auth';
import taskRoutes from './tasks';
import projectRoutes from './projects';
import teamRoutes from './teams';

const router = Router();

// Basic route for testing
router.get('/', (req: any, res: any) => {
  res.json({ message: 'Task Management API is running!' });
});

// Mount authentication routes
router.use('/auth', authRoutes);

// Mount task and project routes
router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);

// Mount team routes
router.use('/teams', teamRoutes);

// Dashboard routes
router.get('/dashboard/stats', (req: any, res: any) => {
  // TODO: Implement real dashboard stats
  res.json({
    success: true,
    data: {
      totalProjects: 12,
      totalTasks: 45,
      completedTasks: 23,
      totalTeams: 8,
      recentActivity: []
    }
  });
});

router.get('/dashboard/recent-activity', (req: any, res: any) => {
  // TODO: Implement real recent activity
  res.json({
    success: true,
    data: []
  });
});

router.get('/dashboard/quick-actions', (req: any, res: any) => {
  // TODO: Implement real quick actions
  res.json({
    success: true,
    data: []
  });
});

export default router;

