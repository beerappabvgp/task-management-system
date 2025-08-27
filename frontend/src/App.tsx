import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Tasks from './pages/Tasks';
import NewTask from './pages/NewTask';
import TaskDetail from './pages/TaskDetail';
import Teams from './pages/Teams';
import NewTeam from './pages/NewTeam';
import TeamDetail from './pages/TeamDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<NewProject />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/new" element={<NewTask />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="teams" element={<Teams />} />
              <Route path="teams/new" element={<NewTeam />} />
              <Route path="teams/:id" element={<TeamDetail />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
