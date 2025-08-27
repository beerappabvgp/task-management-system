import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Users, UserPlus, Trash2 } from 'lucide-react';

interface TeamFormData {
  name: string;
  description: string;
  projectId: string;
  members: Array<{
    name: string;
    email: string;
    role: 'MEMBER' | 'LEAD' | 'ADMIN';
    department: string;
  }>;
}

interface Project {
  id: string;
  name: string;
}

const NewTeam: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    description: '',
    projectId: '',
    members: [
      {
        name: '',
        email: '',
        role: 'MEMBER',
        department: '',
      }
    ]
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // TODO: Fetch projects from backend
    // For now, using mock data
    setTimeout(() => {
      setProjects([
        { id: '1', name: 'E-commerce Platform' },
        { id: '2', name: 'Mobile App Development' },
        { id: '3', name: 'API Integration' },
      ]);
      setIsLoadingData(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, {
        name: '',
        email: '',
        role: 'MEMBER',
        department: '',
      }]
    }));
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Send team data to backend
      console.log('Creating team:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to teams page
      navigate('/teams');
    } catch (error) {
      console.error('Failed to create team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/teams');
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCancel}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Team</h1>
            <p className="text-gray-600">Add a new team to your project</p>
          </div>
        </div>
      </div>

      {/* Team Form */}
      <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="name" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Team Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                  placeholder="Enter team name"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="projectId" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Project *
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  required
                  value={formData.projectId}
                  onChange={handleInputChange}
                  className="input"
                  style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group mt-6" style={{ marginBottom: '16px' }}>
              <label htmlFor="description" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="input resize-none"
                style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                placeholder="Describe the team's purpose and responsibilities..."
              />
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
              <button
                type="button"
                onClick={addMember}
                className="btn-secondary"
                style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.members.map((member, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Member {index + 1}</h4>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="input"
                        style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        placeholder="Enter member name"
                      />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="input"
                        style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        placeholder="Enter member email"
                      />
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Role *
                      </label>
                      <select
                        required
                        value={member.role}
                        onChange={(e) => handleMemberChange(index, 'role', e.target.value as any)}
                        className="input"
                        style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                      >
                        <option value="MEMBER">Member</option>
                        <option value="LEAD">Lead</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={member.department}
                        onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                        className="input"
                        style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', backgroundColor: '#3b82f6', color: 'white', border: '1px solid transparent' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'Creating...' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTeam;
