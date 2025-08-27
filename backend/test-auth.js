// Simple test script for authentication endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication System...\n');

    // Test 1: API base endpoint
    console.log('1. Testing API base endpoint...');
    const baseResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Base endpoint:', baseResponse.data.message);

    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'USER'
    };
    
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log('✅ User registered:', registerResponse.data.message);
    console.log('   User ID:', registerResponse.data.user.id);

    // Test 3: User login
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ User logged in:', loginResponse.data.message);
    console.log('   Token received:', loginResponse.data.token ? 'Yes' : 'No');

    // Test 4: Get user profile (protected route)
    console.log('\n4. Testing protected route (get profile)...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.user.name);

    // Test 5: Test invalid token
    console.log('\n5. Testing invalid token...');
    try {
      await axios.get(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: 'Bearer invalid-token' }
      });
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ Invalid token properly rejected');
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }

    console.log('\n🎉 All authentication tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests
testAuth();

