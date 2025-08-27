import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Save, X, Users, UserPlus, Trash2, Mail, Phone, MapPin, Crown } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'MEMBER' | 'LEAD' | 'ADMIN';
  avatar: string;
  department: string;
  joinDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  project: string;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
}

const TeamDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    projectId: '',
    members: [] as Array<{
      name: string;
      email: string;
      role: 'MEMBER' | 'LEAD' | 'ADMIN';
      department: string;
    }>
  });

  useEffect(() => {
    // TODO: Fetch team data from backend
    // For now, using mock data
    setTimeout(() => {
      const mockTeam: Team = {
        id: id || '1',
        name: 'Frontend Development',
        description: 'Responsible for building user interfaces and client-side functionality',
        project: 'E-commerce Platform',
        createdAt: '2024-01-15',
        members: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'LEAD',
            avatar: 'JD',
            department: 'Engineering',
            joinDate: '2024-01-15',
            status: 'ACTIVE',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'MEMBER',
            avatar: 'JS',
            department: 'Engineering',
            joinDate: '2024-01-20',
            status: 'ACTIVE',
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            role: 'MEMBER',
            avatar: 'MJ',
            department: 'Engineering',
            joinDate: '2024-01-25',
            status: 'ACTIVE',
          },
        ],
      };
      setTeam(mockTeam);
      setEditForm({
        name: mockTeam.name,
        description: mockTeam.description,
        projectId: '1', // Mock project ID
        members: mockTeam.members.map(member => ({
          name: member.name,
          email: member.email,
          role: member.role,
          department: member.department,
        }))
      });
      setIsLoading(false);
    }, 1000);

    // Load projects
    setTimeout(() => {
      setProjects([
        { id: '1', name: 'E-commerce Platform' },
        { id: '2', name: 'Mobile App Development' },
        { id: '3', name: 'API Integration' },
      ]);
    }, 500);
  }, [id]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'LEAD':
        return <Users className="h-4 w-4 text-blue-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-yellow-100 text-yellow-800';
      case 'LEAD':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      members: prev.members.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addMember = () => {
    setEditForm(prev => ({
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
    if (editForm.members.length > 1) {
      setEditForm(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Send updated team data to backend
      console.log('Updating team:', editForm);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      if (team) {
        setTeam({
          ...team,
          name: editForm.name,
          description: editForm.description,
          project: projects.find(p => p.id === editForm.projectId)?.name || team.project,
          members: editForm.members.map((member, index) => ({
            ...team.members[index] || {},
            name: member.name,
            email: member.email,
            role: member.role,
            department: member.department,
          }))
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update team:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (team) {
      setEditForm({
        name: team.name,
        description: team.description,
        projectId: '1',
        members: team.members.map(member => ({
          name: member.name,
          email: member.email,
          role: member.role,
          department: member.department,
        }))
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

  if (!team) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Team not found</h3>
        <button
          onClick={() => navigate('/teams')}
          className="btn-primary"
        >
          Back to Teams
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
            onClick={() => navigate('/teams')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Team' : team.name}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update team details' : 'Team details and information'}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
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

      {/* Team Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Information */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Information</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="name" className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Team Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
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
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Team Name</h4>
                  <p className="text-gray-900">{team.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-gray-900">{team.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Project</h4>
                  <p className="text-gray-900">{team.project}</p>
                </div>
              </div>
            )}
          </div>

          {/* Team Members */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
              {isEditing && (
                <button
                  type="button"
                  onClick={addMember}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db' }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                {editForm.members.map((member, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">Member {index + 1}</h4>
                      {editForm.members.length > 1 && (
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
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          className="input"
                          style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        />
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          className="input"
                          style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        />
                      </div>
                      
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Role</label>
                        <select
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
                        <label className="form-label" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Department</label>
                        <input
                          type="text"
                          value={member.department}
                          onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                          className="input"
                          style={{ border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{member.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {member.email}
                          </span>
                          <span>{member.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Meta */}
          <div className="card" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '24px' }}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Meta</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>Members: {team.members.length}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;

