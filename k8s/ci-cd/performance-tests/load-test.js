import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
    stages: [
        // Ramp up to 10 users over 2 minutes
        { duration: '2m', target: 10 },
        // Stay at 10 users for 5 minutes
        { duration: '5m', target: 10 },
        // Ramp up to 50 users over 3 minutes
        { duration: '3m', target: 50 },
        // Stay at 50 users for 5 minutes
        { duration: '5m', target: 50 },
        // Ramp down to 0 users over 2 minutes
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
        http_req_failed: ['rate<0.1'],     // Error rate must be below 10%
        errors: ['rate<0.1'],              // Custom error rate must be below 10%
    },
};

// Environment variables
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_URL = __ENV.API_URL || 'http://localhost:3001';

// Test data
const testUsers = [
    { email: 'test1@example.com', password: 'password123' },
    { email: 'test2@example.com', password: 'password123' },
    { email: 'test3@example.com', password: 'password123' },
];

// Helper function to get random user
function getRandomUser() {
    return testUsers[Math.floor(Math.random() * testUsers.length)];
}

// Helper function to generate random project data
function generateProjectData() {
    return {
        name: `Test Project ${Math.random().toString(36).substr(2, 9)}`,
        description: `Test project description ${Math.random().toString(36).substr(2, 9)}`,
        status: ['active', 'completed', 'on-hold'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
}

// Helper function to generate random task data
function generateTaskData() {
    return {
        title: `Test Task ${Math.random().toString(36).substr(2, 9)}`,
        description: `Test task description ${Math.random().toString(36).substr(2, 9)}`,
        status: ['todo', 'in-progress', 'review', 'completed'][Math.floor(Math.random() * 4)],
        priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedHours: Math.floor(Math.random() * 40) + 1,
    };
}

// Main test function
export default function() {
    const user = getRandomUser();
    let authToken = null;
    
    // Test 1: User Authentication
    const loginResponse = http.post(`${API_URL}/auth/login`, JSON.stringify({
        email: user.email,
        password: user.password,
    }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    check(loginResponse, {
        'login successful': (r) => r.status === 200 && r.json('token'),
        'login response time < 1000ms': (r) => r.timings.duration < 1000,
    });
    
    if (loginResponse.status === 200) {
        authToken = loginResponse.json('token');
    } else {
        errorRate.add(1);
        sleep(1);
        return;
    }
    
    // Test 2: Get User Profile
    const profileResponse = http.get(`${API_URL}/auth/profile`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    
    check(profileResponse, {
        'profile retrieved successfully': (r) => r.status === 200,
        'profile response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    if (profileResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 3: Get Projects List
    const projectsResponse = http.get(`${API_URL}/projects`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    
    check(projectsResponse, {
        'projects retrieved successfully': (r) => r.status === 200,
        'projects response time < 800ms': (r) => r.timings.duration < 800,
    });
    
    if (projectsResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 4: Create New Project
    const projectData = generateProjectData();
    const createProjectResponse = http.post(`${API_URL}/projects`, JSON.stringify(projectData), {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
    
    check(createProjectResponse, {
        'project created successfully': (r) => r.status === 201,
        'project creation response time < 1000ms': (r) => r.timings.duration < 1000,
    });
    
    if (createProjectResponse.status !== 201) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 5: Get Tasks List
    const tasksResponse = http.get(`${API_URL}/tasks`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    
    check(tasksResponse, {
        'tasks retrieved successfully': (r) => r.status === 200,
        'tasks response time < 800ms': (r) => r.timings.duration < 800,
    });
    
    if (tasksResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 6: Create New Task
    const taskData = generateTaskData();
    const createTaskResponse = http.post(`${API_URL}/tasks`, JSON.stringify(taskData), {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
    
    check(createTaskResponse, {
        'task created successfully': (r) => r.status === 201,
        'task creation response time < 1000ms': (r) => r.timings.duration < 1000,
    });
    
    if (createTaskResponse.status !== 201) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 7: Get Teams List
    const teamsResponse = http.get(`${API_URL}/teams`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    
    check(teamsResponse, {
        'teams retrieved successfully': (r) => r.status === 200,
        'teams response time < 800ms': (r) => r.timings.duration < 800,
    });
    
    if (teamsResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 8: Frontend Page Load Test
    const frontendResponse = http.get(`${BASE_URL}/`);
    
    check(frontendResponse, {
        'frontend loaded successfully': (r) => r.status === 200,
        'frontend response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    
    if (frontendResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(1);
    
    // Test 9: Dashboard Page Load
    const dashboardResponse = http.get(`${BASE_URL}/dashboard`);
    
    check(dashboardResponse, {
        'dashboard loaded successfully': (r) => r.status === 200,
        'dashboard response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    
    if (dashboardResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(1);
    
    // Test 10: Projects Page Load
    const projectsPageResponse = http.get(`${BASE_URL}/projects`);
    
    check(projectsPageResponse, {
        'projects page loaded successfully': (r) => r.status === 200,
        'projects page response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    
    if (projectsPageResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(1);
    
    // Test 11: Tasks Page Load
    const tasksPageResponse = http.get(`${BASE_URL}/tasks`);
    
    check(tasksPageResponse, {
        'tasks page loaded successfully': (r) => r.status === 200,
        'tasks page response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    
    if (tasksPageResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(1);
    
    // Test 12: Teams Page Load
    const teamsPageResponse = http.get(`${BASE_URL}/teams`);
    
    check(teamsPageResponse, {
        'teams page loaded successfully': (r) => r.status === 200,
        'teams page response time < 2000ms': (r) => r.timings.duration < 2000,
    });
    
    if (teamsPageResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(1);
    
    // Test 13: Search Functionality
    const searchResponse = http.get(`${API_URL}/search?q=test`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });
    
    check(searchResponse, {
        'search completed successfully': (r) => r.status === 200,
        'search response time < 1000ms': (r) => r.timings.duration < 1000,
    });
    
    if (searchResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 14: Health Check
    const healthResponse = http.get(`${API_URL}/health`);
    
    check(healthResponse, {
        'health check successful': (r) => r.status === 200,
        'health check response time < 200ms': (r) => r.timings.duration < 200,
    });
    
    if (healthResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
    
    // Test 15: Metrics Endpoint
    const metricsResponse = http.get(`${API_URL}/metrics`);
    
    check(metricsResponse, {
        'metrics retrieved successfully': (r) => r.status === 200,
        'metrics response time < 500ms': (r) => r.timings.duration < 500,
    });
    
    if (metricsResponse.status !== 200) {
        errorRate.add(1);
    }
    
    sleep(0.5);
}

// Setup function (runs once before the test)
export function setup() {
    console.log('🚀 Starting Task Management System Performance Test');
    console.log(`📊 Base URL: ${BASE_URL}`);
    console.log(`🔌 API URL: ${API_URL}`);
    console.log('⏱️  Test will run for 17 minutes with varying load');
    console.log('📈 Stages: Ramp up → Steady load → Peak load → Ramp down');
}

// Teardown function (runs once after the test)
export function teardown(data) {
    console.log('✅ Performance test completed');
    console.log('📊 Check the results above for performance metrics');
    console.log('🎯 Key metrics to monitor:');
    console.log('   - HTTP request duration (p95 < 2000ms)');
    console.log('   - Error rate (< 10%)');
    console.log('   - Response times for each endpoint');
}
