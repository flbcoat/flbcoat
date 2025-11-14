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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import api from '../lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignee?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

const COLUMNS = [
  { id: 'TODO', label: 'To Do', color: '#e0e0e0' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: '#2196f3' },
  { id: 'REVIEW', label: 'Review', color: '#ff9800' },
  { id: 'DONE', label: 'Done', color: '#4caf50' },
];

const PRIORITY_COLORS: Record<string, 'default' | 'info' | 'warning' | 'error'> = {
  LOW: 'default',
  MEDIUM: 'info',
  HIGH: 'warning',
  CRITICAL: 'error',
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Niedrig',
  MEDIUM: 'Mittel',
  HIGH: 'Hoch',
  CRITICAL: 'Kritisch',
};

export default function KanbanBoard() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '',
  });

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = async () => {
    try {
      const response = await api.get(`/tasks/project/${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post('/tasks', {
        ...newTask,
        projectId: id,
        dueDate: newTask.dueDate || null,
      });
      setDialogOpen(false);
      setNewTask({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '',
      });
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      loadTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Aufgabe wirklich löschen?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Kanban Board</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Neue Aufgabe
        </Button>
      </Box>

      {/* Kanban Columns */}
      <Grid container spacing={2}>
        {COLUMNS.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          return (
            <Grid item xs={12} md={3} key={column.id}>
              <Paper
                sx={{
                  p: 2,
                  minHeight: 600,
                  bgcolor: 'grey.100',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">{column.label}</Typography>
                  <Chip label={columnTasks.length} size="small" />
                </Box>

                {columnTasks.map((task) => (
                  <Card key={task.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {task.title}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(task.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>

                      {task.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {task.description}
                        </Typography>
                      )}

                      <Chip
                        label={PRIORITY_LABELS[task.priority]}
                        color={PRIORITY_COLORS[task.priority]}
                        size="small"
                        sx={{ mb: 1 }}
                      />

                      {task.assignee && (
                        <Typography variant="body2" color="text.secondary">
                          {task.assignee.firstName} {task.assignee.lastName}
                        </Typography>
                      )}

                      {/* Move buttons */}
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {column.id !== 'TODO' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              const currentIndex = COLUMNS.findIndex(
                                (c) => c.id === column.id
                              );
                              if (currentIndex > 0) {
                                handleStatusChange(
                                  task.id,
                                  COLUMNS[currentIndex - 1].id
                                );
                              }
                            }}
                          >
                            ←
                          </Button>
                        )}
                        {column.id !== 'DONE' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              const currentIndex = COLUMNS.findIndex(
                                (c) => c.id === column.id
                              );
                              if (currentIndex < COLUMNS.length - 1) {
                                handleStatusChange(
                                  task.id,
                                  COLUMNS[currentIndex + 1].id
                                );
                              }
                            }}
                          >
                            →
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Create Task Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Neue Aufgabe</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titel"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Beschreibung"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            margin="normal"
          >
            {COLUMNS.map((col) => (
              <MenuItem key={col.id} value={col.id}>
                {col.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="Priorität"
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            margin="normal"
          >
            <MenuItem value="LOW">Niedrig</MenuItem>
            <MenuItem value="MEDIUM">Mittel</MenuItem>
            <MenuItem value="HIGH">Hoch</MenuItem>
            <MenuItem value="CRITICAL">Kritisch</MenuItem>
          </TextField>
          <TextField
            fullWidth
            type="date"
            label="Fälligkeitsdatum"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={!newTask.title}
          >
            Erstellen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
