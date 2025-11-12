import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Pending } from '@mui/icons-material';
import api from '../lib/api';

interface AdkarProgress {
  id: string;
  phase: string;
  status: string;
  progress: number;
  notes?: string;
}

const PHASE_LABELS: Record<string, { title: string; description: string }> = {
  AWARENESS: {
    title: 'Awareness (Bewusstsein)',
    description: 'Verständnis für die Notwendigkeit der Veränderung schaffen',
  },
  DESIRE: {
    title: 'Desire (Wunsch)',
    description: 'Den Wunsch wecken, die Veränderung zu unterstützen',
  },
  KNOWLEDGE: {
    title: 'Knowledge (Wissen)',
    description: 'Wissen vermitteln, wie die Veränderung umgesetzt wird',
  },
  ABILITY: {
    title: 'Ability (Fähigkeit)',
    description: 'Fähigkeiten entwickeln, um die Veränderung umzusetzen',
  },
  REINFORCEMENT: {
    title: 'Reinforcement (Verstärkung)',
    description: 'Die Veränderung nachhaltig verankern',
  },
};

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success'> = {
  NOT_STARTED: 'default',
  IN_PROGRESS: 'primary',
  COMPLETED: 'success',
};

const STATUS_LABELS: Record<string, string> = {
  NOT_STARTED: 'Nicht begonnen',
  IN_PROGRESS: 'In Arbeit',
  COMPLETED: 'Abgeschlossen',
};

export default function AdkarTracker() {
  const { id } = useParams();
  const [progress, setProgress] = useState<AdkarProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState<AdkarProgress | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState({ status: '', progress: 0, notes: '' });

  useEffect(() => {
    loadProgress();
  }, [id]);

  const loadProgress = async () => {
    try {
      const response = await api.get(`/adkar/project/${id}`);
      setProgress(response.data);
    } catch (error) {
      console.error('Error loading ADKAR progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (phase: AdkarProgress) => {
    setSelectedPhase(phase);
    setEditData({
      status: phase.status,
      progress: phase.progress,
      notes: phase.notes || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedPhase) return;

    try {
      await api.put(`/adkar/${selectedPhase.id}`, editData);
      setDialogOpen(false);
      loadProgress();
    } catch (error) {
      console.error('Error updating ADKAR progress:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle color="success" />;
      case 'IN_PROGRESS':
        return <Pending color="primary" />;
      default:
        return <RadioButtonUnchecked />;
    }
  };

  const totalProgress = progress.length > 0
    ? progress.reduce((sum, p) => sum + p.progress, 0) / progress.length
    : 0;

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        ADKAR-Framework Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Verfolgen Sie den Fortschritt durch die 5 Phasen des ADKAR-Modells
      </Typography>

      {/* Overall Progress */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Gesamtfortschritt
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={totalProgress}
              sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
            />
            <Typography variant="h6" color="primary">
              {Math.round(totalProgress)}%
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* ADKAR Phases */}
      <Grid container spacing={3}>
        {progress.map((phase, index) => {
          const phaseInfo = PHASE_LABELS[phase.phase];
          return (
            <Grid item xs={12} key={phase.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {getStatusIcon(phase.status)}
                      <Box>
                        <Typography variant="h6">
                          {index + 1}. {phaseInfo.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {phaseInfo.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        label={STATUS_LABELS[phase.status]}
                        color={STATUS_COLORS[phase.status]}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" color="primary">
                        {phase.progress}%
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={phase.progress}
                    sx={{ mb: 2, height: 8, borderRadius: 4 }}
                  />

                  {phase.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {phase.notes}
                    </Typography>
                  )}

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(phase)}
                  >
                    Bearbeiten
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPhase && PHASE_LABELS[selectedPhase.phase].title} bearbeiten
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Status"
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            margin="normal"
          >
            <MenuItem value="NOT_STARTED">Nicht begonnen</MenuItem>
            <MenuItem value="IN_PROGRESS">In Arbeit</MenuItem>
            <MenuItem value="COMPLETED">Abgeschlossen</MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Fortschritt (%)"
            value={editData.progress}
            onChange={(e) =>
              setEditData({
                ...editData,
                progress: Math.min(100, Math.max(0, Number(e.target.value))),
              })
            }
            margin="normal"
            inputProps={{ min: 0, max: 100 }}
          />

          <TextField
            fullWidth
            label="Notizen"
            value={editData.notes}
            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={handleSave} variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
