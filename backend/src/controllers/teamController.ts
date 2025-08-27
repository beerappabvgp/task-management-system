import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

// Get all teams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, project, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (project) where.projects = { some: { id: project } };
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [teams, total] = await Promise.all([
      prisma.team.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          users: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          projects: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.team.count({ where })
    ]);

    res.json({
      success: true,
      data: teams,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    logger.error('Error fetching teams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teams'
    });
  }
};

// Get team by ID
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        projects: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    logger.error('Error fetching team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team'
    });
  }
};

// Create new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, projectId } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    const team = await prisma.team.create({
      data: {
        name,
        description
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        projects: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // If projectId is provided, connect the project to the team
    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: { teamId: team.id }
      });
    }

    logger.info(`Team created: ${team.id}`);
    res.status(201).json({
      success: true,
      data: team
    });
  } catch (error) {
    logger.error('Error creating team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create team'
    });
  }
};

// Update team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const team = await prisma.team.findUnique({
      where: { id }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
        updatedAt: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        projects: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    logger.info(`Team updated: ${id}`);
    res.json({
      success: true,
      data: updatedTeam
    });
  } catch (error) {
    logger.error('Error updating team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update team'
    });
  }
};

// Delete team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    await prisma.team.delete({
      where: { id }
    });

    logger.info(`Team deleted: ${id}`);
    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    logger.error('Error deleting team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete team'
    });
  }
};

// Add user to team
export const addMember = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if team exists
    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    // Check if user is already a member
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
        teamId
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this team'
      });
    }

    // Add user to team
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { teamId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    logger.info(`User added to team: ${teamId} - ${userId}`);
    res.status(201).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    logger.error('Error adding user to team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add user to team'
    });
  }
};

// Remove user from team
export const removeMember = async (req: Request, res: Response) => {
  try {
    const { teamId, memberId } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: memberId,
        teamId
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await prisma.user.update({
      where: { id: memberId },
      data: { teamId: null }
    });

    logger.info(`User removed from team: ${teamId} - ${memberId}`);
    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    logger.error('Error removing user from team:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove user from team'
    });
  }
};
