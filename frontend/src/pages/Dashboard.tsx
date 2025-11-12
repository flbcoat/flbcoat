import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import api from '../lib/api';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  framework: string;
  _count: {
    stakeholders: number;
    tasks: number;
    milestones: number;
  };
}

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  PLANNING: 'default',
  IN_PROGRESS: 'primary',
  COMPLETED: 'success',
  ON_HOLD: 'warning',
  CANCELLED: 'error',
};

const STATUS_LABELS: Record<string, string> = {
  PLANNING: 'Planung',
  IN_PROGRESS: 'In Bearbeitung',
  COMPLETED: 'Abgeschlossen',
  ON_HOLD: 'Pausiert',
  CANCELLED: 'Abgebrochen',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    framework: 'ADKAR',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      await api.post('/projects', newProject);
      setDialogOpen(false);
      setNewProject({ name: '', description: '', framework: 'ADKAR' });
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Neues Projekt
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{projects.length}</Typography>
                  <Typography color="text.secondary">Projekte</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {projects.reduce((sum, p) => sum + p._count.stakeholders, 0)}
                  </Typography>
                  <Typography color="text.secondary">Stakeholder</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUpIcon color="warning" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">
                    {projects.reduce((sum, p) => sum + p._count.tasks, 0)}
                  </Typography>
                  <Typography color="text.secondary">Aufgaben</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Projects */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Projekte
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{project.name}</Typography>
                  <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 40 }}
                >
                  {project.description || 'Keine Beschreibung'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={STATUS_LABELS[project.status]}
                    color={STATUS_COLORS[project.status]}
                    size="small"
                  />
                  <Chip label={project.framework} size="small" variant="outlined" />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {project._count.stakeholders} Stakeholder
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project._count.tasks} Aufgaben
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Project Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Neues Projekt erstellen</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Projektname"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Beschreibung"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Framework"
            value={newProject.framework}
            onChange={(e) => setNewProject({ ...newProject, framework: e.target.value })}
            margin="normal"
          >
            <MenuItem value="ADKAR">ADKAR</MenuItem>
            <MenuItem value="KOTTER">Kotter (8 Schritte)</MenuItem>
            <MenuItem value="LEWIN">Lewin</MenuItem>
            <MenuItem value="AGILE">Agile</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button
            onClick={handleCreateProject}
            variant="contained"
            disabled={!newProject.name}
          >
            Erstellen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
