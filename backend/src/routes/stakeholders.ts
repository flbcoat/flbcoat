import express from 'express';
import { prisma } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get stakeholders for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const stakeholders = await prisma.stakeholder.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(stakeholders);
  } catch (error) {
    console.error('Get stakeholders error:', error);
    res.status(500).json({ error: 'Failed to fetch stakeholders' });
  }
});

// Create stakeholder
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      projectId,
      firstName,
      lastName,
      email,
      position,
      department,
      influence,
      interest,
      attitude,
      notes,
    } = req.body;

    const stakeholder = await prisma.stakeholder.create({
      data: {
        projectId,
        firstName,
        lastName,
        email,
        position,
        department,
        influence: influence || 'MEDIUM',
        interest: interest || 'MEDIUM',
        attitude: attitude || 'NEUTRAL',
        notes,
      },
    });

    res.status(201).json(stakeholder);
  } catch (error) {
    console.error('Create stakeholder error:', error);
    res.status(500).json({ error: 'Failed to create stakeholder' });
  }
});

// Update stakeholder
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      position,
      department,
      influence,
      interest,
      attitude,
      notes,
    } = req.body;

    const stakeholder = await prisma.stakeholder.update({
      where: { id: req.params.id },
      data: {
        firstName,
        lastName,
        email,
        position,
        department,
        influence,
        interest,
        attitude,
        notes,
      },
    });

    res.json(stakeholder);
  } catch (error) {
    console.error('Update stakeholder error:', error);
    res.status(500).json({ error: 'Failed to update stakeholder' });
  }
});

// Delete stakeholder
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.stakeholder.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Stakeholder deleted successfully' });
  } catch (error) {
    console.error('Delete stakeholder error:', error);
    res.status(500).json({ error: 'Failed to delete stakeholder' });
  }
});

export default router;
