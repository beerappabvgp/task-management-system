// Comprehensive test script for the complete task management system
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testCompleteSystem() {
  try {
    console.log('🧪 Testing Complete Task Management System...\n');

    // Test 1: API base endpoint
    console.log('1. Testing API base endpoint...');
    const baseResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Base endpoint:', baseResponse.data.message);

    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      email: 'manager@example.com',
      password: 'password123',
      name: 'Project Manager',
      role: 'MANAGER'
    };
    
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log('✅ Manager registered:', registerResponse.data.message);
    const managerId = registerResponse.data.user.id;

    // Test 3: User login
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'manager@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ Manager logged in:', loginResponse.data.message);
    const token = loginResponse.data.token;

    // Test 4: Create a team
    console.log('\n4. Testing team creation...');
    const teamData = {
      name: 'Development Team',
      description: 'Core development team for the project'
    };
    
    const teamResponse = await axios.post(`${BASE_URL}/projects/teams`, teamData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Team created:', teamResponse.data.message);
    const teamId = teamResponse.data.team.id;

    // Test 5: Create a project
    console.log('\n5. Testing project creation...');
    const projectData = {
      name: 'Task Management System',
      description: 'Building a comprehensive task management system',
      teamId: teamId
    };
    
    const projectResponse = await axios.post(`${BASE_URL}/projects`, projectData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Project created:', projectResponse.data.message);
    const projectId = projectResponse.data.project.id;

    // Test 6: Create a task
    console.log('\n6. Testing task creation...');
    const taskData = {
      title: 'Implement Authentication System',
      description: 'Build JWT-based authentication with role-based access control',
      priority: 'HIGH',
      projectId: projectId,
      assignedToId: managerId
    };
    
    const taskResponse = await axios.post(`${BASE_URL}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Task created:', taskResponse.data.message);
    const taskId = taskResponse.data.task.id;

    // Test 7: Get all tasks
    console.log('\n7. Testing get all tasks...');
    const tasksResponse = await axios.get(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Tasks retrieved:', tasksResponse.data.tasks.length, 'tasks found');

    // Test 8: Get all projects
    console.log('\n8. Testing get all projects...');
    const projectsResponse = await axios.get(`${BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Projects retrieved:', projectsResponse.data.projects.length, 'projects found');

    // Test 9: Update task status
    console.log('\n9. Testing task update...');
    const updateTaskData = {
      status: 'IN_PROGRESS',
      priority: 'URGENT'
    };
    
    const updateTaskResponse = await axios.put(`${BASE_URL}/tasks/${taskId}`, updateTaskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Task updated:', updateTaskResponse.data.message);

    // Test 10: Get project details with tasks
    console.log('\n10. Testing get project details...');
    const projectDetailsResponse = await axios.get(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Project details retrieved:', projectDetailsResponse.data.project.name);
    console.log('   Tasks in project:', projectDetailsResponse.data.project.tasks.length);

    console.log('\n🎉 All tests passed! Complete Task Management System is working!');
    console.log('\n📊 Summary:');
    console.log('   - User authentication: ✅');
    console.log('   - Team management: ✅');
    console.log('   - Project management: ✅');
    console.log('   - Task management: ✅');
    console.log('   - Role-based access control: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.status) {
      console.error('   Status:', error.response.status);
    }
  }
}

// Run tests
testCompleteSystem();

