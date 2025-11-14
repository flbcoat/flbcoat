import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import api from '../lib/api';

interface Stakeholder {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  position?: string;
  department?: string;
  influence: string;
  interest: string;
  attitude: string;
  notes?: string;
}

const ATTITUDE_COLORS: Record<string, 'success' | 'info' | 'default' | 'warning' | 'error'> = {
  STRONG_SUPPORTER: 'success',
  SUPPORTER: 'info',
  NEUTRAL: 'default',
  SKEPTIC: 'warning',
  BLOCKER: 'error',
};

const ATTITUDE_LABELS: Record<string, string> = {
  STRONG_SUPPORTER: 'Starker Befürworter',
  SUPPORTER: 'Befürworter',
  NEUTRAL: 'Neutral',
  SKEPTIC: 'Skeptiker',
  BLOCKER: 'Blockierer',
};

export default function StakeholderMatrix() {
  const { id } = useParams();
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStakeholder, setNewStakeholder] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    influence: 'MEDIUM',
    interest: 'MEDIUM',
    attitude: 'NEUTRAL',
    notes: '',
  });

  useEffect(() => {
    loadStakeholders();
  }, [id]);

  const loadStakeholders = async () => {
    try {
      const response = await api.get(`/stakeholders/project/${id}`);
      setStakeholders(response.data);
    } catch (error) {
      console.error('Error loading stakeholders:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post('/stakeholders', {
        ...newStakeholder,
        projectId: id,
      });
      setDialogOpen(false);
      setNewStakeholder({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        influence: 'MEDIUM',
        interest: 'MEDIUM',
        attitude: 'NEUTRAL',
        notes: '',
      });
      loadStakeholders();
    } catch (error) {
      console.error('Error creating stakeholder:', error);
    }
  };

  const getStakeholdersByQuadrant = (influence: string[], interest: string[]) => {
    return stakeholders.filter(
      (s) => influence.includes(s.influence) && interest.includes(s.interest)
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Stakeholder-Matrix</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Stakeholder hinzufügen
        </Button>
      </Box>

      {/* Power-Interest Grid */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Power-Interest-Grid
          </Typography>
          <Grid container spacing={2} sx={{ height: 600 }}>
            {/* High Influence, High Interest */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'error.light',
                  color: 'error.contrastText',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Key Players (Hoher Einfluss, Hohes Interesse)
                </Typography>
                {getStakeholdersByQuadrant(
                  ['HIGH', 'VERY_HIGH'],
                  ['HIGH', 'VERY_HIGH']
                ).map((s) => (
                  <Chip
                    key={s.id}
                    label={`${s.firstName} ${s.lastName}`}
                    color={ATTITUDE_COLORS[s.attitude]}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Paper>
            </Grid>

            {/* Low Influence, High Interest */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'warning.light',
                  color: 'warning.contrastText',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Show Consideration (Niedriger Einfluss, Hohes Interesse)
                </Typography>
                {getStakeholdersByQuadrant(
                  ['LOW', 'MEDIUM'],
                  ['HIGH', 'VERY_HIGH']
                ).map((s) => (
                  <Chip
                    key={s.id}
                    label={`${s.firstName} ${s.lastName}`}
                    color={ATTITUDE_COLORS[s.attitude]}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Paper>
            </Grid>

            {/* High Influence, Low Interest */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'info.light',
                  color: 'info.contrastText',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Keep Satisfied (Hoher Einfluss, Niedriges Interesse)
                </Typography>
                {getStakeholdersByQuadrant(
                  ['HIGH', 'VERY_HIGH'],
                  ['LOW', 'MEDIUM']
                ).map((s) => (
                  <Chip
                    key={s.id}
                    label={`${s.firstName} ${s.lastName}`}
                    color={ATTITUDE_COLORS[s.attitude]}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Paper>
            </Grid>

            {/* Low Influence, Low Interest */}
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Monitor (Niedriger Einfluss, Niedriges Interesse)
                </Typography>
                {getStakeholdersByQuadrant(['LOW', 'MEDIUM'], ['LOW', 'MEDIUM']).map(
                  (s) => (
                    <Chip
                      key={s.id}
                      label={`${s.firstName} ${s.lastName}`}
                      color={ATTITUDE_COLORS[s.attitude]}
                      sx={{ m: 0.5 }}
                    />
                  )
                )}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stakeholder List */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Alle Stakeholder ({stakeholders.length})
          </Typography>
          <Grid container spacing={2}>
            {stakeholders.map((stakeholder) => (
              <Grid item xs={12} md={6} key={stakeholder.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">
                      {stakeholder.firstName} {stakeholder.lastName}
                    </Typography>
                    {stakeholder.position && (
                      <Typography variant="body2" color="text.secondary">
                        {stakeholder.position}
                      </Typography>
                    )}
                    {stakeholder.department && (
                      <Typography variant="body2" color="text.secondary">
                        {stakeholder.department}
                      </Typography>
                    )}
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Chip
                        label={ATTITUDE_LABELS[stakeholder.attitude]}
                        color={ATTITUDE_COLORS[stakeholder.attitude]}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Neuer Stakeholder</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vorname"
                value={newStakeholder.firstName}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, firstName: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Nachname"
                value={newStakeholder.lastName}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, lastName: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-Mail"
                type="email"
                value={newStakeholder.email}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Position"
                value={newStakeholder.position}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, position: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Abteilung"
                value={newStakeholder.department}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, department: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="Einfluss"
                value={newStakeholder.influence}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, influence: e.target.value })
                }
              >
                <MenuItem value="LOW">Niedrig</MenuItem>
                <MenuItem value="MEDIUM">Mittel</MenuItem>
                <MenuItem value="HIGH">Hoch</MenuItem>
                <MenuItem value="VERY_HIGH">Sehr hoch</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="Interesse"
                value={newStakeholder.interest}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, interest: e.target.value })
                }
              >
                <MenuItem value="LOW">Niedrig</MenuItem>
                <MenuItem value="MEDIUM">Mittel</MenuItem>
                <MenuItem value="HIGH">Hoch</MenuItem>
                <MenuItem value="VERY_HIGH">Sehr hoch</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                select
                label="Haltung"
                value={newStakeholder.attitude}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, attitude: e.target.value })
                }
              >
                <MenuItem value="STRONG_SUPPORTER">Starker Befürworter</MenuItem>
                <MenuItem value="SUPPORTER">Befürworter</MenuItem>
                <MenuItem value="NEUTRAL">Neutral</MenuItem>
                <MenuItem value="SKEPTIC">Skeptiker</MenuItem>
                <MenuItem value="BLOCKER">Blockierer</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notizen"
                value={newStakeholder.notes}
                onChange={(e) =>
                  setNewStakeholder({ ...newStakeholder, notes: e.target.value })
                }
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={!newStakeholder.firstName || !newStakeholder.lastName}
          >
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
