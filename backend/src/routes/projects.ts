import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all projects for user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { createdById: req.userId },
          { members: { some: { userId: req.userId } } },
        ],
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
        _count: {
          select: {
            stakeholders: true,
            tasks: true,
            milestones: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, email: true },
            },
          },
        },
        stakeholders: true,
        tasks: {
          include: {
            assignee: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        milestones: true,
        adkarProgress: true,
        kotterSteps: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { name, description, framework, startDate, endDate, tenantId } = req.body;

    // Create tenant if not provided
    let finalTenantId = tenantId;
    if (!finalTenantId) {
      const tenant = await prisma.tenant.create({
        data: { name: `${name} - Tenant` },
      });
      finalTenantId = tenant.id;
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        framework: framework || 'ADKAR',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        tenantId: finalTenantId,
        createdById: req.userId!,
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    // Initialize ADKAR progress if framework is ADKAR
    if (project.framework === 'ADKAR') {
      const phases = ['AWARENESS', 'DESIRE', 'KNOWLEDGE', 'ABILITY', 'REINFORCEMENT'];
      await Promise.all(
        phases.map((phase) =>
          prisma.adkarProgress.create({
            data: {
              projectId: project.id,
              phase: phase as any,
            },
          })
        )
      );
    }

    // Initialize Kotter steps if framework is KOTTER
    if (project.framework === 'KOTTER') {
      const steps = [
        'Dringlichkeit schaffen',
        'Führungskoalition aufbauen',
        'Vision und Strategie entwickeln',
        'Vision kommunizieren',
        'Hindernisse beseitigen',
        'Kurzfristige Erfolge sichern',
        'Erfolge konsolidieren',
        'Veränderungen verankern',
      ];
      await Promise.all(
        steps.map((title, index) =>
          prisma.kotterStep.create({
            data: {
              projectId: project.id,
              step: index + 1,
              title,
            },
          })
        )
      );
    }

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { name, description, status, framework, startDate, endDate } = req.body;

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        status,
        framework,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
