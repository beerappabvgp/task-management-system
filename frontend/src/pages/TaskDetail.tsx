import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X, Calendar, User, FolderOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignee?: string;
  dueDate?: string;
  project: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const TaskDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: 'TODO' as const,
    priority: 'MEDIUM' as const,
    assignee: '',
    dueDate: '',
    projectId: '',
  });

  useEffect(() => {
    console.log('TaskDetail useEffect triggered, id:', id); // Debug log
    // TODO: Fetch task data from backend
    // For now, using mock data
    setTimeout(() => {
      const mockTask: Task = {
        id: id || '1',
        title: 'Implement user authentication',
        description: 'Add JWT-based authentication with login/register functionality',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assignee: 'John Doe',
        dueDate: '2024-02-15',
        project: 'E-commerce Platform',
        tags: ['backend', 'security'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
      };
      console.log('Setting mock task:', mockTask); // Debug log
      setTask(mockTask);
      setEditForm({
        title: mockTask.title,
        description: mockTask.description,
        status: mockTask.status,
        priority: mockTask.priority,
        assignee: mockTask.assignee || '',
        dueDate: mockTask.dueDate || '',
        projectId: '1', // Mock project ID
      });
      setIsLoading(false);
    }, 1000);

    // Load projects and users
    setTimeout(() => {
      const mockProjects = [
        { id: '1', name: 'E-commerce Platform' },
        { id: '2', name: 'Mobile App Development' },
        { id: '3', name: 'API Integration' },
      ];
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
      ];
      console.log('Setting mock projects and users:', { projects: mockProjects, users: mockUsers }); // Debug log
      setProjects(mockProjects);
      setUsers(mockUsers);
    }, 500);
  }, [id]);

  useEffect(() => {
    console.log('isEditing state changed:', isEditing); // Debug log
  }, [isEditing]);

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
      case 'URGENT':
        return 'bg-purple-100 text-purple-800';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value); // Debug log
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Send updated task data to backend
      console.log('Updating task:', editForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      if (task) {
        setTask({
          ...task,
          title: editForm.title,
          description: editForm.description,
          status: editForm.status,
          priority: editForm.priority,
          assignee: editForm.assignee || undefined,
          dueDate: editForm.dueDate || undefined,
          updatedAt: new Date().toISOString(),
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    console.log('Canceling edit, resetting form'); // Debug log
    setIsEditing(false);
    // Reset form to original values
    if (task) {
      setEditForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee || '',
        dueDate: task.dueDate || '',
        projectId: '1',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Task not found</h3>
        <button
          onClick={() => navigate('/tasks')}
          className="btn-primary"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/tasks')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Task' : task.title}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update task details' : 'Task details and information'}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => {
                console.log('Edit button clicked, current editForm:', editForm); // Debug log
                setIsEditing(true);
              }}
              className="btn-secondary"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary"
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Task Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Information */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Information</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="title" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editForm.title}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="description" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={editForm.description}
                    onChange={handleInputChange}
                    className="input resize-none"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Title</h4>
                  <p className="text-gray-900">{task.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-gray-900">{task.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Task Details */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Details</h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="status" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Status</label>
                  <select
                    id="status"
                    name="status"
                    value={editForm.status}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="priority" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={editForm.priority}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="projectId" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Project</label>
                  <select
                    id="projectId"
                    name="projectId"
                    value={editForm.projectId}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="assignedToId" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Assign To</label>
                  <select
                    id="assignedToId"
                    name="assignee"
                    value={editForm.assignee}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  >
                    <option value="">Unassigned</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="dueDate" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={editForm.dueDate}
                    onChange={handleInputChange}
                    className="input"
                    style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Status</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Priority</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Project</h4>
                  <p className="text-gray-900">{task.project}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Assignee</h4>
                  <p className="text-gray-900">{task.assignee || 'Unassigned'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Due Date</h4>
                  <p className="text-gray-900">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Task Meta */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Meta</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
