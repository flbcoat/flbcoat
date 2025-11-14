import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import StakeholderMatrix from './pages/StakeholderMatrix';
import AdkarTracker from './pages/AdkarTracker';
import KanbanBoard from './pages/KanbanBoard';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="projects/:id/stakeholders" element={<StakeholderMatrix />} />
            <Route path="projects/:id/adkar" element={<AdkarTracker />} />
            <Route path="projects/:id/kanban" element={<KanbanBoard />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Box>
  );
}

export default App;
