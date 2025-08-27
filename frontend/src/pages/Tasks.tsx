import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignee: string;
  dueDate: string;
  project: string;
  tags: string[];
}

const Tasks: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Fetch tasks from backend
    // For now, using mock data
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Implement user authentication',
          description: 'Add JWT-based authentication with login/register functionality',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          assignee: 'John Doe',
          dueDate: '2024-02-15',
          project: 'E-commerce Platform',
          tags: ['backend', 'security'],
        },
        {
          id: '2',
          title: 'Design mobile app UI',
          description: 'Create wireframes and mockups for the mobile application',
          status: 'TODO',
          priority: 'MEDIUM',
          assignee: 'Jane Smith',
          dueDate: '2024-02-28',
          project: 'Mobile App Development',
          tags: ['design', 'mobile'],
        },
        {
          id: '3',
          title: 'Write API documentation',
          description: 'Document all REST API endpoints with examples',
          status: 'REVIEW',
          priority: 'LOW',
          assignee: 'Mike Johnson',
          dueDate: '2024-02-10',
          project: 'API Integration',
          tags: ['documentation', 'api'],
        },
        {
          id: '4',
          title: 'Set up CI/CD pipeline',
          description: 'Configure Jenkins and ArgoCD for automated deployment',
          status: 'COMPLETED',
          priority: 'HIGH',
          assignee: 'Sarah Wilson',
          dueDate: '2024-01-31',
          project: 'DevOps Setup',
          tags: ['devops', 'automation'],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'TODO':
        return <Clock className="h-4 w-4" />;
      case 'IN_PROGRESS':
        return <AlertCircle className="h-4 w-4" />;
      case 'REVIEW':
        return <Clock className="h-4 w-4" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleTaskAction = (action: string, taskId?: string) => {
    switch (action) {
      case 'newTask':
        navigate('/tasks/new');
        break;
      case 'viewDetails':
        navigate(`/tasks/${taskId}`);
        break;
      case 'edit':
        navigate(`/tasks/${taskId}`);
        break;
      case 'markComplete':
        // Update task status to completed
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId 
              ? { ...task, status: 'COMPLETED' as const }
              : task
          )
        );
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
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage and track your tasks</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => handleTaskAction('newTask')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
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
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="input max-w-xs"
        >
          <option value="all">All Priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card hover:shadow-md transition-shadow flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  
                  {/* Task Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-primary-600 font-medium">{task.project}</div>
                  </div>

                  {/* Tags */}
                  {task.tags.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions - Pushed to bottom */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button 
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleTaskAction('viewDetails', task.id)}
              >
                View Details
              </button>
              <button 
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleTaskAction('edit', task.id)}
              >
                Edit
              </button>
              {task.status !== 'COMPLETED' && (
                <button 
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  onClick={() => handleTaskAction('markComplete', task.id)}
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first task.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
            <button 
              className="btn-primary"
              onClick={() => handleTaskAction('newTask')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
