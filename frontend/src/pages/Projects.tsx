import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Calendar, Users, FolderOpen } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  startDate: string;
  endDate: string;
  teamSize: number;
  progress: number;
}

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Fetch projects from backend
    // For now, using mock data
    setTimeout(() => {
      setProjects([
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Build a modern e-commerce platform with React and Node.js',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          teamSize: 8,
          progress: 65,
        },
        {
          id: '2',
          name: 'Mobile App Development',
          description: 'iOS and Android app for task management',
          status: 'PLANNING',
          priority: 'MEDIUM',
          startDate: '2024-03-01',
          endDate: '2024-08-31',
          teamSize: 6,
          progress: 15,
        },
        {
          id: '3',
          name: 'API Integration',
          description: 'Integrate third-party APIs for payment processing',
          status: 'COMPLETED',
          priority: 'HIGH',
          startDate: '2024-01-01',
          endDate: '2024-02-28',
          teamSize: 4,
          progress: 100,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PLANNING':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'ON_HOLD':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProjectAction = (action: string, projectId?: string) => {
    switch (action) {
      case 'newProject':
        navigate('/projects/new');
        break;
      case 'viewDetails':
        navigate(`/projects/${projectId}`);
        break;
      case 'edit':
        navigate(`/projects/${projectId}/edit`);
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
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage and track your project progress</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => handleProjectAction('newProject')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input max-w-xs"
        >
          <option value="all">All Status</option>
          <option value="PLANNING">Planning</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card hover:shadow-md transition-shadow flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-primary-600 font-medium">Project</span>
                    <span>•</span>
                    <span>Started {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Status and Priority */}
              <div className="flex gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{project.teamSize} team members</span>
                </div>
              </div>
            </div>

            {/* Actions - Pushed to bottom */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-200">
              <button 
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleProjectAction('viewDetails', project.id)}
              >
                View Details
              </button>
              <button 
                className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleProjectAction('edit', project.id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <FolderOpen className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first project.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button 
              className="btn-primary"
              onClick={() => handleProjectAction('newProject')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
