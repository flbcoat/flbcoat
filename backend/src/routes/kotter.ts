import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get Kotter steps for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const steps = await prisma.kotterStep.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { step: 'asc' },
    });

    res.json(steps);
  } catch (error) {
    console.error('Get Kotter steps error:', error);
    res.status(500).json({ error: 'Failed to fetch Kotter steps' });
  }
});

// Update Kotter step
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, progress, notes } = req.body;

    const kotterStep = await prisma.kotterStep.update({
      where: { id: req.params.id },
      data: {
        status,
        progress: progress !== undefined ? Math.min(100, Math.max(0, progress)) : undefined,
        notes,
      },
    });

    res.json(kotterStep);
  } catch (error) {
    console.error('Update Kotter step error:', error);
    res.status(500).json({ error: 'Failed to update Kotter step' });
  }
});

export default router;
