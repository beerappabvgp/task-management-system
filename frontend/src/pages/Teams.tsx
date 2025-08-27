import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, UserPlus, Mail, Phone, MapPin, Users, Crown } from 'lucide-react';

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

const Teams: React.FC = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Fetch teams from backend
    // For now, using mock data
    setTimeout(() => {
      setTeams([
        {
          id: '1',
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
        },
        {
          id: '2',
          name: 'Backend Development',
          description: 'Handles server-side logic, APIs, and database operations',
          project: 'E-commerce Platform',
          createdAt: '2024-01-10',
          members: [
            {
              id: '4',
              name: 'Sarah Wilson',
              email: 'sarah.wilson@example.com',
              role: 'LEAD',
              avatar: 'SW',
              department: 'Engineering',
              joinDate: '2024-01-10',
              status: 'ACTIVE',
            },
            {
              id: '5',
              name: 'David Brown',
              email: 'david.brown@example.com',
              role: 'MEMBER',
              avatar: 'DB',
              department: 'Engineering',
              joinDate: '2024-01-12',
              status: 'ACTIVE',
            },
          ],
        },
        {
          id: '3',
          name: 'DevOps Team',
          description: 'Manages infrastructure, CI/CD, and deployment processes',
          project: 'Infrastructure',
          createdAt: '2024-01-05',
          members: [
            {
              id: '6',
              name: 'Alex Chen',
              email: 'alex.chen@example.com',
              role: 'ADMIN',
              avatar: 'AC',
              department: 'Operations',
              joinDate: '2024-01-05',
              status: 'ACTIVE',
            },
            {
              id: '7',
              name: 'Lisa Garcia',
              email: 'lisa.garcia@example.com',
              role: 'MEMBER',
              avatar: 'LG',
              department: 'Operations',
              joinDate: '2024-01-08',
              status: 'ACTIVE',
            },
          ],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  const filteredTeams = teams.filter(team => {
    return team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           team.project.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleTeamAction = (action: string, teamId?: string) => {
    switch (action) {
      case 'newTeam':
        navigate('/teams/new');
        break;
      case 'viewDetails':
        navigate(`/teams/${teamId}`);
        break;
      case 'addMember':
        // TODO: Navigate to add member form
        console.log('Add member to team:', teamId);
        break;
      case 'editTeam':
        navigate(`/teams/${teamId}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600">Manage your project teams and members</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => handleTeamAction('newTeam')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Team
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="card hover:shadow-md transition-shadow flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{team.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{team.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-primary-600 font-medium">{team.project}</span>
                    <span>•</span>
                    <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Team Members ({team.members.length})</h4>
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
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => handleTeamAction('addMember', team.id)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions - Pushed to bottom */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button 
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleTeamAction('viewDetails', team.id)}
              >
                View Details
              </button>
              <button 
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleTeamAction('addMember', team.id)}
              >
                Add Member
              </button>
              <button 
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                onClick={() => handleTeamAction('editTeam', team.id)}
              >
                Edit Team
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <Users className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search criteria.'
              : 'Get started by creating your first team.'
            }
          </p>
          {!searchTerm && (
            <button 
              className="btn-primary"
              onClick={() => handleTeamAction('newTeam')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Team
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Teams;
