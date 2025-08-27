// backend/src/controllers/projectController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/database';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { ProjectStatus } from '@prisma/client';

// Validation schemas
const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
  description: z.string().optional(),
  teamId: z.string().min(1, 'Team ID is required')
});

const updateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long').optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional()
});

const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required').max(100, 'Team name too long'),
  description: z.string().optional()
});

// Create a new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createProjectSchema.parse(req.body);
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify team exists
    const team = await prisma.team.findUnique({
      where: { id: validatedData.teamId }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        users: {
          connect: { id: userId }
        }
      },
      include: {
        users: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true } }
      }
    });

    logger.info(`Project created: ${project.id} by user: ${userId}`);

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true } },
        tasks: { select: { id: true, status: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ projects });
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true } },
        tasks: {
          include: {
            assignedTo: { select: { id: true, name: true, email: true } },
            createdBy: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateProjectSchema.parse(req.body);
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: validatedData,
      include: {
        users: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true } }
      }
    });

    logger.info(`Project updated: ${id} by user: ${userId}`);

    res.json({
      message: 'Project updated successfully',
      project: updatedProject
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id }
    });

    logger.info(`Project deleted: ${id} by user: ${userId}`);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Create a new team
export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createTeamSchema.parse(req.body);
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const team = await prisma.team.create({
      data: {
        ...validatedData,
        users: {
          connect: { id: userId }
        }
      },
      include: {
        users: { select: { id: true, name: true, email: true } }
      }
    });

    logger.info(`Team created: ${team.id} by user: ${userId}`);

    res.status(201).json({
      message: 'Team created successfully',
      team
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Get all teams
export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        users: { select: { id: true, name: true, email: true } },
        projects: { select: { id: true, name: true, status: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ teams });
  } catch (error) {
    next(error);
  }
};

// Add user to team
export const addUserToTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamId, userId } = req.body;
    // @ts-ignore - JWT middleware will add user to req
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify both team and user exist
    const [team, user] = await Promise.all([
      prisma.team.findUnique({ where: { id: teamId } }),
      prisma.user.findUnique({ where: { id: userId } })
    ]);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add user to team
    await prisma.team.update({
      where: { id: teamId },
      data: {
        users: {
          connect: { id: userId }
        }
      }
    });

    logger.info(`User ${userId} added to team ${teamId} by user: ${currentUserId}`);

    res.json({ message: 'User added to team successfully' });
  } catch (error) {
    next(error);
  }
};

