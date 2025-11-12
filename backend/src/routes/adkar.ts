import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get ADKAR progress for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const progress = await prisma.adkarProgress.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { phase: 'asc' },
    });

    res.json(progress);
  } catch (error) {
    console.error('Get ADKAR progress error:', error);
    res.status(500).json({ error: 'Failed to fetch ADKAR progress' });
  }
});

// Update ADKAR phase progress
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, progress, notes } = req.body;

    const adkarProgress = await prisma.adkarProgress.update({
      where: { id: req.params.id },
      data: {
        status,
        progress: progress !== undefined ? Math.min(100, Math.max(0, progress)) : undefined,
        notes,
      },
    });

    res.json(adkarProgress);
  } catch (error) {
    console.error('Update ADKAR progress error:', error);
    res.status(500).json({ error: 'Failed to update ADKAR progress' });
  }
});

export default router;
