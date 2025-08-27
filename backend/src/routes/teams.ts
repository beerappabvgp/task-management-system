import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember
} from '../controllers/teamController';

const router = Router();

// Get all teams
router.get('/', authenticateToken, getAllTeams);

// Get team by ID
router.get('/:id', authenticateToken, getTeamById);

// Create new team
router.post('/', authenticateToken, createTeam);

// Update team
router.put('/:id', authenticateToken, updateTeam);

// Delete team
router.delete('/:id', authenticateToken, deleteTeam);

// Add member to team
router.post('/:id/members', authenticateToken, addMember);

// Remove member from team
router.delete('/:id/members/:memberId', authenticateToken, removeMember);

export default router;
