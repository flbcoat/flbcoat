import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  ViewKanban as KanbanIcon,
} from '@mui/icons-material';
import api from '../lib/api';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  framework: string;
  _count?: {
    stakeholders: number;
    tasks: number;
    milestones: number;
  };
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (!project) {
    return <Typography>Projekt nicht gefunden</Typography>;
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={project.status} color="primary" />
          <Chip label={project.framework} variant="outlined" />
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/projects/${id}/stakeholders`)}
          >
            <CardContent>
              <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Stakeholder</Typography>
              <Typography variant="h4">
                {project._count?.stakeholders || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/projects/${id}/kanban`)}
          >
            <CardContent>
              <KanbanIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Kanban Board</Typography>
              <Typography variant="h4">
                {project._count?.tasks || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/projects/${id}/adkar`)}
          >
            <CardContent>
              <TimelineIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">ADKAR Tracker</Typography>
              <Typography variant="body2">Framework</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <AssignmentIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Meilensteine</Typography>
              <Typography variant="h4">
                {project._count?.milestones || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Übersicht" />
          <Tab label="Aktivitäten" />
          <Tab label="Team" />
        </Tabs>
        <CardContent>
          {tabValue === 0 && (
            <Typography>Projektübersicht - Hier können weitere Details angezeigt werden</Typography>
          )}
          {tabValue === 1 && (
            <Typography>Aktivitätslog - Hier werden alle Projektaktivitäten angezeigt</Typography>
          )}
          {tabValue === 2 && (
            <Typography>Team-Übersicht - Hier wird das Projektteam angezeigt</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
