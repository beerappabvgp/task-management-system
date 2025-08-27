import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckSquare, 
  FolderOpen, 
  Users, 
  TrendingUp, 
  Clock,
  Calendar,
  Plus
} from 'lucide-react';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalProjects: number;
  activeProjects: number;
  teamMembers: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalProjects: 0,
    activeProjects: 0,
    teamMembers: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard data from backend
    // For now, using mock data
    setTimeout(() => {
      setStats({
        totalTasks: 24,
        completedTasks: 18,
        pendingTasks: 6,
        totalProjects: 8,
        activeProjects: 5,
        teamMembers: 12,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="card">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'newTask':
        navigate('/tasks');
        break;
      case 'newProject':
        navigate('/projects');
        break;
      case 'inviteMember':
        navigate('/teams');
        break;
      case 'scheduleMeeting':
        // TODO: Implement meeting scheduling
        console.log('Schedule meeting clicked');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/tasks')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Tasks
          </button>
          <button 
            className="btn-primary"
            onClick={() => navigate('/tasks')}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={CheckSquare}
          color="bg-blue-500"
          change="+12% from last week"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={CheckSquare}
          color="bg-green-500"
          change="+8% from last week"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={FolderOpen}
          color="bg-purple-500"
        />
        <StatCard
          title="Team Members"
          value={stats.teamMembers}
          icon={Users}
          color="bg-orange-500"
        />
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Progress */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Completed</span>
                <span>{stats.completedTasks}/{stats.totalTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pending</span>
                <span>{stats.pendingTasks}/{stats.totalTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.pendingTasks / stats.totalTasks) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button 
              className="btn-primary w-full"
              onClick={() => navigate('/tasks')}
            >
              View All Tasks
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Task "Update documentation" completed</span>
              <span className="text-xs text-gray-400 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New project "Mobile App" created</span>
              <span className="text-xs text-gray-400 ml-auto">4h ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Team member John Doe joined</span>
              <span className="text-xs text-gray-400 ml-auto">1d ago</span>
            </div>
          </div>
          <div className="mt-4">
            <button 
              className="btn-secondary w-full"
              onClick={() => navigate('/projects')}
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            onClick={() => handleQuickAction('newTask')}
          >
            <Plus className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">New Task</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            onClick={() => handleQuickAction('newProject')}
          >
            <FolderOpen className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">New Project</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            onClick={() => handleQuickAction('inviteMember')}
          >
            <Users className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Invite Member</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
            onClick={() => handleQuickAction('scheduleMeeting')}
          >
            <Clock className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
