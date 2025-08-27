// backend/src/controllers/taskController.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/database';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { TaskStatus, Priority } from '@prisma/client';

// Validation schemas
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional().default(Priority.MEDIUM),
  dueDate: z.string().datetime().optional(),
  projectId: z.string().min(1, 'Project ID is required'),
  assignedToId: z.string().optional()
});

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  dueDate: z.string().datetime().optional(),
  assignedToId: z.string().optional()
});

const taskFiltersSchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  assignedToId: z.string().optional(),
  projectId: z.string().optional(),
  search: z.string().optional(),
  page: z.string().transform(val => parseInt(val) || 1).optional(),
  limit: z.string().transform(val => parseInt(val) || 10).optional()
});

// Create a new task
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    // @ts-ignore - JWT middleware will add user to req
    const createdById = req.user?.userId;
    
    if (!createdById) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Verify assigned user exists if provided
    if (validatedData.assignedToId) {
      const assignedUser = await prisma.user.findUnique({
        where: { id: validatedData.assignedToId }
      });

      if (!assignedUser) {
        return res.status(404).json({ error: 'Assigned user not found' });
      }
    }

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        createdById,
        status: TaskStatus.TODO
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true, email: true } }
      }
    });

    logger.info(`Task created: ${task.id} by user: ${createdById}`);
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Get all tasks with filtering and pagination
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = taskFiltersSchema.parse(req.query);
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.assignedToId) where.assignedToId = filters.assignedToId;
    if (filters.projectId) where.projectId = filters.projectId;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true, email: true } }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where })
    ]);

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true, email: true } }
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateTaskSchema.parse(req.body);
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Verify assigned user exists if provided
    if (validatedData.assignedToId) {
      const assignedUser = await prisma.user.findUnique({
        where: { id: validatedData.assignedToId }
      });

      if (!assignedUser) {
        return res.status(404).json({ error: 'Assigned user not found' });
      }
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: validatedData,
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true, email: true } }
      }
    });

    logger.info(`Task updated: ${id} by user: ${userId}`);

    res.json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    next(error);
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id }
    });

    logger.info(`Task deleted: ${id} by user: ${userId}`);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get tasks by user (assigned to or created by)
export const getTasksByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore - JWT middleware will add user to req
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assignedToId: userId },
          { createdById: userId }
        ]
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};

