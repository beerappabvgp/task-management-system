# Step by step devops learning plan
_Exported on 8/16/2025 at 07:35:29 GMT+5:30 from Cursor (1.4.2)_

---

**User**

@cursor_devops_practical_course_outline.md ,
I have exported the chat from other cursor tab,
I wanted to learn devops practically, using aws 

SO please go through the @cursor_devops_practical_course_outline.md  cat and give me a step by step plan 

---

**Cursor**

I'll read through your course outline and provide you with a practical, step-by-step plan to learn DevOps using AWS. Let me first examine the document to understand the complete scope.


Based on your comprehensive course outline, I'll provide you with a practical, step-by-step plan to learn DevOps using AWS while building a real-world production system. This plan incorporates all the components you mentioned (Kafka, Redis, Jenkins, Kubernetes) and follows best DevOps practices with cost optimization.

# **Complete DevOps Learning Plan - Practical AWS Implementation**
## **12-Week Journey to Master DevOps with Real-World Projects**

---

## **🎯 Your Learning Goals:**
- Build a production system handling 40M requests/second
- Implement enterprise components (Kafka, Redis, Jenkins, K8s)
- Master AWS DevOps services practically
- Follow best practices and cost optimization
- Clean up resources to manage costs

---

## **📅 Week-by-Week Implementation Plan**

### **Week 1: Foundation & AWS Setup**
**Goal**: Set up AWS infrastructure and cost management

#### **Day 1-2: AWS Account & Cost Management**
- **Practical Tasks:**
  - Create AWS account and set up billing alerts
  - Set up AWS Budgets (80% and 95% alerts)
  - Enable Cost Explorer and Cost Anomaly Detection
  - Create IAM user with least privilege access
  - Set up cost allocation tags

- **What You'll Learn:**
  - AWS account security best practices
  - Cost monitoring and alerting
  - IAM policies and security groups

#### **Day 3-4: Infrastructure Planning**
- **Practical Tasks:**
  - Design VPC architecture (multi-AZ, public/private subnets)
  - Plan auto-scaling strategy for 40M requests/second
  - Design database scaling strategy
  - Create architecture diagrams

- **What You'll Learn:**
  - High-scale system design principles
  - AWS networking fundamentals
  - Capacity planning

#### **Day 5-7: Terraform Setup**
- **Practical Tasks:**
  - Install Terraform and AWS CLI
  - Set up S3 backend for remote state
  - Create basic VPC with Terraform
  - Implement tagging strategy

- **What You'll Learn:**
  - Infrastructure as Code principles
  - Terraform syntax and best practices
  - State management

---

### **Week 2: Core Infrastructure Components**
**Goal**: Build the foundation infrastructure

#### **Day 1-3: Networking & Security**
- **Practical Tasks:**
  - Deploy VPC with public/private subnets
  - Configure security groups and network ACLs
  - Set up NAT Gateways (cost-optimized)
  - Configure Route53 for DNS

- **What You'll Learn:**
  - AWS networking concepts
  - Security group configuration
  - Cost optimization strategies

#### **Day 4-7: Load Balancing & Auto-scaling**
- **Practical Tasks:**
  - Deploy Application Load Balancer (ALB)
  - Create launch templates with optimized AMIs
  - Set up auto-scaling groups
  - Implement health checks

- **What You'll Learn:**
  - Load balancer configuration
  - Auto-scaling policies
  - Health monitoring

---

### **Week 3: Data Infrastructure - Apache Kafka**
**Goal**: Set up message queuing system

#### **Day 1-3: Kafka Cluster Setup**
- **Practical Tasks:**
  - Deploy MSK (Managed Streaming for Kafka) cluster
  - Configure multi-broker setup
  - Set up topic partitioning strategy
  - Implement replication for fault tolerance

- **What You'll Learn:**
  - Kafka architecture and concepts
  - Message queuing patterns
  - High availability setup

#### **Day 4-7: Kafka Integration**
- **Practical Tasks:**
  - Create producer/consumer applications
  - Implement partition balancing
  - Set up monitoring and alerting
  - Performance tuning

- **What You'll Learn:**
  - Kafka producer/consumer patterns
  - Performance optimization
  - Monitoring and alerting

---

### **Week 4: Caching Layer - Redis**
**Goal**: Implement caching infrastructure

#### **Day 1-3: Redis Cluster Setup**
- **Practical Tasks:**
  - Deploy ElastiCache Redis cluster
  - Configure multi-node setup
  - Implement read replicas
  - Set up auto-failover

- **What You'll Learn:**
  - Redis clustering concepts
  - High availability strategies
  - Caching patterns

#### **Day 4-7: Caching Strategy**
- **Practical Tasks:**
  - Implement application-level caching
  - Set up database query caching
  - Configure session management
  - Implement cache invalidation

- **What You'll Learn:**
  - Caching strategies
  - Performance optimization
  - Session management

---

### **Week 5: Containerization & Kubernetes**
**Goal**: Deploy containerized applications

#### **Day 1-3: Docker & ECR**
- **Practical Tasks:**
  - Containerize your application
  - Set up ECR repository
  - Implement multi-stage builds
  - Configure image lifecycle policies

- **What You'll Learn:**
  - Docker best practices
  - Container registry management
  - Image optimization

#### **Day 4-7: EKS Cluster Setup**
- **Practical Tasks:**
  - Deploy EKS cluster
  - Configure node groups
  - Set up cluster autoscaler
  - Implement HPA (Horizontal Pod Autoscaler)

- **What You'll Learn:**
  - Kubernetes fundamentals
  - EKS management
  - Auto-scaling concepts

---

### **Week 6: CI/CD Pipeline - Jenkins**
**Goal**: Build automated deployment pipeline

#### **Day 1-3: Jenkins Infrastructure**
- **Practical Tasks:**
  - Deploy Jenkins on EC2
  - Configure security and plugins
  - Set up GitHub integration
  - Implement backup strategy

- **What You'll Learn:**
  - Jenkins administration
  - CI/CD pipeline concepts
  - Security best practices

#### **Day 4-7: Pipeline Implementation**
- **Practical Tasks:**
  - Create Jenkinsfile with declarative syntax
  - Implement multi-branch pipeline
  - Add automated testing
  - Set up deployment stages

- **What You'll Learn:**
  - Pipeline as Code
  - Multi-branch strategies
  - Automated testing integration

---

### **Week 7: Advanced CI/CD & GitOps**
**Goal**: Implement advanced deployment strategies

#### **Day 1-3: Blue-Green Deployment**
- **Practical Tasks:**
  - Implement blue-green deployment
  - Set up automated rollback
  - Configure health checks
  - Implement traffic switching

- **What You'll Learn:**
  - Deployment strategies
  - Rollback mechanisms
  - Traffic management

#### **Day 4-7: GitOps with ArgoCD**
- **Practical Tasks:**
  - Deploy ArgoCD on EKS
  - Set up declarative deployments
  - Implement drift detection
  - Configure RBAC

- **What You'll Learn:**
  - GitOps principles
  - Declarative deployments
  - Infrastructure drift management

---

### **Week 8: Monitoring & Observability**
**Goal**: Set up comprehensive monitoring

#### **Day 1-3: AWS CloudWatch**
- **Practical Tasks:**
  - Configure custom metrics
  - Set up dashboards
  - Implement automated alerting
  - Configure log aggregation

- **What You'll Learn:**
  - CloudWatch monitoring
  - Metric collection
  - Alerting strategies

#### **Day 4-7: Advanced Monitoring Stack**
- **Practical Tasks:**
  - Deploy Prometheus + Grafana
  - Set up ELK Stack
  - Configure log retention policies
  - Implement centralized logging

- **What You'll Learn:**
  - Prometheus monitoring
  - ELK Stack management
  - Log analysis

---

### **Week 9: Database Scaling & Data Management**
**Goal**: Implement scalable database architecture

#### **Day 1-3: Database Architecture**
- **Practical Tasks:**
  - Deploy RDS Multi-AZ setup
  - Configure read replicas
  - Implement connection pooling
  - Set up automated backups

- **What You'll Learn:**
  - Database scaling strategies
  - High availability setup
  - Backup and recovery

#### **Day 4-7: Data Storage Strategy**
- **Practical Tasks:**
  - Configure S3 with lifecycle policies
  - Implement cross-region replication
  - Set up data lake architecture
  - Configure intelligent tiering

- **What You'll Learn:**
  - S3 management
  - Data lifecycle management
  - Cost optimization

---

### **Week 10: Performance & Load Testing**
**Goal**: Test and optimize system performance

#### **Day 1-3: Load Testing Setup**
- **Practical Tasks:**
  - Set up JMeter distributed testing
  - Configure K6 for performance testing
  - Generate test data
  - Set up monitoring during tests

- **What You'll Learn:**
  - Load testing methodologies
  - Performance monitoring
  - Test data management

#### **Day 4-7: Performance Optimization**
- **Practical Tasks:**
  - Identify performance bottlenecks
  - Optimize database queries
  - Implement caching strategies
  - Tune auto-scaling policies

- **What You'll Learn:**
  - Performance optimization
  - Bottleneck identification
  - System tuning

---

### **Week 11: Security & Compliance**
**Goal**: Implement security best practices

#### **Day 1-3: Security Hardening**
- **Practical Tasks:**
  - Configure WAF and DDoS protection
  - Implement SSL/TLS
  - Set up security groups
  - Configure KMS encryption

- **What You'll Learn:**
  - AWS security services
  - Encryption strategies
  - Network security

#### **Day 4-7: DevSecOps Integration**
- **Practical Tasks:**
  - Integrate security scanning in CI/CD
  - Implement vulnerability assessment
  - Set up compliance monitoring
  - Configure audit logging

- **What You'll Learn:**
  - DevSecOps principles
  - Security automation
  - Compliance monitoring

---

### **Week 12: Production Readiness & Cleanup**
**Goal**: Finalize system and clean up resources

#### **Day 1-3: Production Validation**
- **Practical Tasks:**
  - Final load testing
  - Security testing
  - Disaster recovery testing
  - Performance validation

- **What You'll Learn:**
  - Production readiness
  - Testing methodologies
  - Quality assurance

#### **Day 4-7: Documentation & Cleanup**
- **Practical Tasks:**
  - Create system documentation
  - Write runbooks and procedures
  - Implement cleanup scripts
  - Document cost optimization strategies

- **What You'll Learn:**
  - Documentation best practices
  - Resource management
  - Cost optimization

---

## **🛠️ Tools & Technologies You'll Master:**

### **AWS Services:**
- EC2, ECS, EKS, Lambda, S3, RDS, ElastiCache
- CloudWatch, X-Ray, CloudFormation, CDK
- IAM, KMS, Secrets Manager, WAF

### **DevOps Tools:**
- Jenkins, ArgoCD, Docker, Kubernetes
- Terraform, Prometheus, Grafana, ELK Stack
- Kafka, Redis, JMeter, K6

### **Best Practices:**
- Infrastructure as Code, GitOps, CI/CD
- Security, monitoring, cost optimization
- Auto-scaling, high availability, disaster recovery

---

## **💰 Cost Optimization Strategies:**

### **1. Instance Management:**
- Use Spot Instances for non-critical workloads
- Implement auto-scaling with minimum instances
- Right-size instances based on actual usage

### **2. Storage Optimization:**
- S3 lifecycle policies for automatic tiering
- EBS optimization and snapshot management
- Log retention policies

### **3. Automated Cleanup:**
- Daily cleanup of temporary resources
- Weekly cleanup of old snapshots and logs
- Monthly cost optimization review

---

## **🚀 What You'll Actually Build:**

### **Complete Production Infrastructure:**
- Multi-AZ, auto-scaling application servers
- Kafka cluster for message queuing
- Redis cluster for caching
- Load balancers handling millions of requests
- Database clusters with replication

### **Enterprise CI/CD Pipeline:**
- Jenkins with automated testing
- GitOps workflows with ArgoCD
- Blue-green deployments
- Automated rollback and recovery

### **Production Monitoring:**
- Real-time performance dashboards
- Centralized logging and analysis
- Automated alerting and incident response
- Cost monitoring and optimization

---

## **📋 Next Steps:**

1. **Start with Week 1** - Set up AWS account and cost management
2. **Implement cost monitoring** from day one
3. **Build incrementally** with cost optimization in mind
4. **Document everything** for your portfolio
5. **Implement cleanup scripts** as you build

This plan gives you a complete, production-ready DevOps system while being cost-conscious. You'll learn real-world DevOps skills, build something impressive for your portfolio, and manage costs effectively.

**Ready to start building?** Let's begin with Week 1 and set up your AWS infrastructure!

---

**User**

First we need to application code right before starting with the plan.
what do you say give me a plan for simple application code as well including server, db and kafka redis 

give me a step by step plan break it into pieces 

---

**Cursor**

You're absolutely right! Before we start building the DevOps infrastructure, we need a solid application to deploy. Let me give you a step-by-step plan to build a simple but scalable application that will showcase all the DevOps components.

# **Application Development Plan - Before DevOps Infrastructure**
## **Building a Scalable MERN Stack Application with Kafka & Redis**

---

## **🎯 Application Overview:**
**"Task Management System"** - A scalable application that can handle high loads and demonstrate all DevOps components:
- **Frontend**: React.js with real-time updates
- **Backend**: Node.js/Express.js microservices
- **Database**: MongoDB with sharding
- **Message Queue**: Kafka for async processing
- **Caching**: Redis for performance
- **Real-time**: WebSocket connections

---

## **📅 Week-by-Week Application Development Plan**

### **Week 1: Project Setup & Basic Backend**
**Goal**: Set up project structure and basic API

#### **Day 1-2: Project Structure & Setup**
- **Practical Tasks:**
  - Initialize Git repository
  - Set up project structure (monorepo)
  - Configure package.json and dependencies
  - Set up ESLint, Prettier, and TypeScript
  - Create Docker development environment

- **Project Structure:**
```
task-management-system/
├── frontend/                 # React.js application
├── backend/                  # Node.js microservices
│   ├── auth-service/        # Authentication service
│   ├── task-service/        # Task management service
│   ├── notification-service/ # Notification service
│   └── shared/              # Shared utilities
├── infrastructure/           # Terraform/IaC files
├── docker/                  # Docker configurations
├── scripts/                 # Utility scripts
└── docs/                    # Documentation
```

#### **Day 3-4: Basic Express.js Server**
- **Practical Tasks:**
  - Create basic Express.js server
  - Implement health check endpoints
  - Set up middleware (CORS, body-parser, helmet)
  - Configure environment variables
  - Add basic logging

- **What You'll Learn:**
  - Express.js fundamentals
  - Middleware configuration
  - Environment management
  - Basic security practices

#### **Day 5-7: Database Schema & Models**
- **Practical Tasks:**
  - Design MongoDB schemas (Users, Tasks, Projects)
  - Implement Mongoose models
  - Add validation and indexing
  - Create database connection utilities
  - Set up database seeding scripts

- **Database Schemas:**
```javascript
// User Schema
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}

// Task Schema
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,
  priority: String,
  assignedTo: ObjectId (ref: User),
  projectId: ObjectId (ref: Project),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

### **Week 2: Core Backend Services**
**Goal**: Implement core microservices

#### **Day 1-3: Authentication Service**
- **Practical Tasks:**
  - Implement user registration and login
  - JWT token generation and validation
  - Password hashing with bcrypt
  - Role-based access control (RBAC)
  - Input validation and sanitization

- **API Endpoints:**
```javascript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET /api/auth/profile
```

#### **Day 4-7: Task Management Service**
- **Practical Tasks:**
  - CRUD operations for tasks
  - Task assignment and status updates
  - Search and filtering capabilities
  - Pagination and sorting
  - Input validation and error handling

- **API Endpoints:**
```javascript
GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/search
```

---

### **Week 3: Kafka Integration & Message Queuing**
**Goal**: Implement asynchronous processing with Kafka

#### **Day 1-3: Kafka Setup & Configuration**
- **Practical Tasks:**
  - Set up Kafka producer/consumer
  - Create topics (user-events, task-events, notifications)
  - Implement message serialization/deserialization
  - Add error handling and retry logic
  - Set up dead letter queues

- **Kafka Topics:**
```javascript
// Topics
'user-events'           // User registration, updates
'task-events'           // Task creation, updates, completion
'notification-events'   // Email, push notifications
'audit-events'          // System audit logs
```

#### **Day 4-7: Event-Driven Architecture**
- **Practical Tasks:**
  - Implement event producers for user actions
  - Create event consumers for async processing
  - Add event logging and monitoring
  - Implement event replay capabilities
  - Add event versioning and schema validation

- **Event Examples:**
```javascript
// User Created Event
{
  type: 'USER_CREATED',
  data: {
    userId: '123',
    email: 'user@example.com',
    timestamp: '2024-01-01T00:00:00Z'
  }
}

// Task Assigned Event
{
  type: 'TASK_ASSIGNED',
  data: {
    taskId: '456',
    assignedTo: '123',
    assignedBy: '789',
    timestamp: '2024-01-01T00:00:00Z'
  }
}
```

---

### **Week 4: Redis Caching Layer**
**Goal**: Implement caching for performance optimization

#### **Day 1-3: Redis Setup & Configuration**
- **Practical Tasks:**
  - Set up Redis connection pool
  - Implement cache utilities and helpers
  - Add cache invalidation strategies
  - Set up Redis clustering (if needed)
  - Implement cache monitoring

- **Caching Strategy:**
```javascript
// Cache Keys
'user:123'              // User profile cache
'tasks:user:123'        // User's tasks cache
'project:456'           // Project details cache
'session:abc123'        // User session cache
'rate_limit:ip:192.168.1.1' // Rate limiting
```

#### **Day 4-7: Cache Implementation**
- **Practical Tasks:**
  - Cache frequently accessed data
  - Implement cache-aside pattern
  - Add cache warming strategies
  - Set up cache hit/miss monitoring
  - Implement cache eviction policies

- **Cache Patterns:**
```javascript
// Cache-Aside Pattern
async function getUserById(userId) {
  // Try cache first
  let user = await redis.get(`user:${userId}`);
  
  if (!user) {
    // Cache miss - get from database
    user = await User.findById(userId);
    
    // Store in cache
    await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  }
  
  return JSON.parse(user);
}
```

---

### **Week 5: Frontend Development**
**Goal**: Build responsive React.js frontend

#### **Day 1-3: React.js Setup & Components**
- **Practical Tasks:**
  - Set up React.js with TypeScript
  - Configure routing with React Router
  - Create reusable UI components
  - Implement responsive design
  - Add state management (Context API or Redux)

- **Component Structure:**
```javascript
// Components
<Header />              // Navigation and user menu
<Sidebar />             // Project navigation
<TaskList />            // Task display and management
<TaskForm />            // Task creation/editing
<ProjectDashboard />    // Project overview
<UserProfile />         // User settings and profile
```

#### **Day 4-7: Real-time Features & State Management**
- **Practical Tasks:**
  - Implement WebSocket connections
  - Add real-time task updates
  - Implement optimistic UI updates
  - Add offline support with service workers
  - Implement error boundaries and loading states

---

### **Week 6: Integration & Testing**
**Goal**: Integrate all components and add testing

#### **Day 1-3: Service Integration**
- **Practical Tasks:**
  - Connect frontend to backend APIs
  - Integrate Kafka events with frontend
  - Implement real-time notifications
  - Add error handling and retry logic
  - Set up API rate limiting

#### **Day 4-7: Testing & Quality Assurance**
- **Practical Tasks:**
  - Write unit tests for backend services
  - Add integration tests for APIs
  - Implement end-to-end testing
  - Add performance testing
  - Set up code coverage reporting

---

## **🛠️ Technology Stack:**

### **Backend:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Message Queue**: Apache Kafka
- **Caching**: Redis
- **Authentication**: JWT + bcrypt

### **Frontend:**
- **Framework**: React.js with TypeScript
- **State Management**: Context API or Redux
- **Routing**: React Router
- **Styling**: CSS Modules or Styled Components
- **Real-time**: WebSocket or Server-Sent Events

### **Development Tools:**
- **Package Manager**: npm or yarn
- **Linting**: ESLint + Prettier
- **Testing**: Jest + Supertest
- **Documentation**: JSDoc + Swagger
- **Docker**: Multi-stage builds

---

## **📁 File Structure Examples:**

### **Backend Service Structure:**
```javascript
// auth-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const kafka = require('./kafka/producer');
const redis = require('./redis/client');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/auth', routes);

// Kafka event producer
app.post('/api/auth/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    // Produce Kafka event
    await kafka.produce('user-events', {
      type: 'USER_CREATED',
      data: { userId: user._id, email: user.email }
    });
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### **Frontend Component Example:**
```javascript
// TaskList.jsx
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { data: realTimeUpdates } = useWebSocket('/ws/tasks');
  
  useEffect(() => {
    // Fetch initial tasks
    fetchTasks();
  }, []);
  
  useEffect(() => {
    // Handle real-time updates
    if (realTimeUpdates) {
      updateTaskList(realTimeUpdates);
    }
  }, [realTimeUpdates]);
  
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
```

---

## **🚀 Next Steps After Application Development:**

1. **Containerize the application** with Docker
2. **Set up CI/CD pipeline** with Jenkins
3. **Deploy to Kubernetes** on AWS EKS
4. **Implement monitoring** and logging
5. **Add load testing** and performance optimization

---

## **💡 Key Benefits of This Application:**

### **DevOps Learning:**
- **Scalability**: Can handle high loads with proper infrastructure
- **Microservices**: Demonstrates service communication patterns
- **Real-time**: Shows WebSocket and event-driven architecture
- **Caching**: Illustrates performance optimization strategies
- **Message Queuing**: Demonstrates async processing patterns

### **Portfolio Value:**
- **Real-world complexity**: Not just a simple CRUD app
- **Modern architecture**: Uses current best practices
- **Scalable design**: Can grow with infrastructure
- **Professional quality**: Production-ready code structure

---

## **📋 Ready to Start?**

This application will give you a solid foundation to:
1. **Learn modern development practices**
2. **Understand microservices architecture**
3. **Practice with real-world complexity**
4. **Build something impressive for your portfolio**
5. **Demonstrate DevOps skills effectively**

**Should we start with Week 1 of application development?** We can begin setting up the project structure and basic backend services!

```plaintext
task-management-system/
├── frontend/                 # React.js application
├── backend/                  # Node.js microservices
│   ├── auth-service/        # Authentication service
│   ├── task-service/        # Task management service
│   ├── notification-service/ # Notification service
│   └── shared/              # Shared utilities
├── infrastructure/           # Terraform/IaC files
├── docker/                  # Docker configurations
├── scripts/                 # Utility scripts
└── docs/                    # Documentation
```

```javascript
// User Schema
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}

// Task Schema
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,
  priority: String,
  assignedTo: ObjectId (ref: User),
  projectId: ObjectId (ref: Project),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

```javascript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET /api/auth/profile
```

```javascript
GET /api/tasks
POST /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/search
```

```javascript
// Topics
'user-events'           // User registration, updates
'task-events'           // Task creation, updates, completion
'notification-events'   // Email, push notifications
'audit-events'          // System audit logs
```

```javascript
// User Created Event
{
  type: 'USER_CREATED',
  data: {
    userId: '123',
    email: 'user@example.com',
    timestamp: '2024-01-01T00:00:00Z'
  }
}

// Task Assigned Event
{
  type: 'TASK_ASSIGNED',
  data: {
    taskId: '456',
    assignedTo: '123',
    assignedBy: '789',
    timestamp: '2024-01-01T00:00:00Z'
  }
}
```

```javascript
// Cache Keys
'user:123'              // User profile cache
'tasks:user:123'        // User's tasks cache
'project:456'           // Project details cache
'session:abc123'        // User session cache
'rate_limit:ip:192.168.1.1' // Rate limiting
```

```javascript
// Cache-Aside Pattern
async function getUserById(userId) {
  // Try cache first
  let user = await redis.get(`user:${userId}`);
  
  if (!user) {
    // Cache miss - get from database
    user = await User.findById(userId);
    
    // Store in cache
    await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
  }
  
  return JSON.parse(user);
}
```

```javascript
// Components
<Header />              // Navigation and user menu
<Sidebar />             // Project navigation
<TaskList />            // Task display and management
<TaskForm />            // Task creation/editing
<ProjectDashboard />    // Project overview
<UserProfile />         // User settings and profile
```

```javascript
// auth-service/index.js
const express = require('express');
const mongoose = require('mongoose');
const kafka = require('./kafka/producer');
const redis = require('./redis/client');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/auth', routes);

// Kafka event producer
app.post('/api/auth/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    // Produce Kafka event
    await kafka.produce('user-events', {
      type: 'USER_CREATED',
      data: { userId: user._id, email: user.email }
    });
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

```javascript
// TaskList.jsx
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { data: realTimeUpdates } = useWebSocket('/ws/tasks');
  
  useEffect(() => {
    // Fetch initial tasks
    fetchTasks();
  }, []);
  
  useEffect(() => {
    // Handle real-time updates
    if (realTimeUpdates) {
      updateTaskList(realTimeUpdates);
    }
  }, [realTimeUpdates]);
  
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
```

---

**User**

application development is fine, we use mern stack typescript and prisma ORM, postgres DB, kafka, redis, nodejs , express 

NOw give me step by step plan 

---

**Cursor**

Perfect! Let me give you a step-by-step plan for building the application with your preferred tech stack: MERN + TypeScript + Prisma + PostgreSQL + Kafka + Redis + Node.js + Express.

# **Application Development Plan - MERN Stack with TypeScript & Prisma**
## **Building a Scalable Task Management System**

---

## **�� Tech Stack:**
- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Message Queue**: Apache Kafka
- **Caching**: Redis
- **Authentication**: JWT + bcrypt
- **Real-time**: WebSocket

---

## **📅 Week-by-Week Development Plan**

### **Week 1: Project Setup & Backend Foundation**
**Goal**: Set up project structure and basic Express server

#### **Day 1-2: Project Structure & Dependencies**
- **Practical Tasks:**
  - Initialize Git repository
  - Set up monorepo structure
  - Install dependencies for backend and frontend
  - Configure TypeScript for both projects
  - Set up ESLint, Prettier, and Husky

- **Project Structure:**
```
task-management-system/
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Prisma models
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── app.ts           # Express app
│   ├── prisma/              # Prisma schema and migrations
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React.js + TypeScript
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── shared/                   # Shared types and utilities
├── docker/                   # Docker configurations
└── docs/                     # Documentation
```

#### **Day 3-4: Prisma Setup & Database Schema**
- **Practical Tasks:**
  - Install Prisma CLI and dependencies
  - Create Prisma schema with PostgreSQL
  - Design database models (Users, Tasks, Projects, Teams)
  - Generate Prisma client
  - Set up database connection

- **Prisma Schema Example:**
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")
  projects      Project[]
  team          Team?  @relation(fields: [teamId], references: [id])
  teamId        String?
  
  @@map("users")
}

model Task {
  id          String      @id @default(cuid())
  title       String
  description String?
  status      TaskStatus  @default(TODO)
  priority    Priority    @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relations
  assignedTo   User?   @relation("AssignedTasks", fields: [assignedToId], references: [id])
  assignedToId String?
  createdBy    User    @relation("CreatedTasks", fields: [createdById], references: [id])
  createdById  String
  project      Project @relation(fields: [projectId], references: [id])
  projectId    String
  
  @@map("tasks")
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  tasks Task[]
  users User[]
  team  Team   @relation(fields: [teamId], references: [id])
  teamId String
  
  @@map("projects")
}

model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  users    User[]
  projects Project[]
  
  @@map("teams")
}

enum UserRole {
  ADMIN
  MANAGER
  USER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
  ARCHIVED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ProjectStatus {
  ACTIVE
  PAUSED
  COMPLETED
  CANCELLED
}
```

#### **Day 5-7: Express.js Server Setup**
- **Practical Tasks:**
  - Create Express.js server with TypeScript
  - Set up middleware (CORS, helmet, morgan)
  - Configure environment variables
  - Add basic error handling
  - Set up logging with Winston

- **Server Setup Example:**
```typescript
// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import routes from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

export default app;
```

---

### **Week 2: Authentication & User Management**
**Goal**: Implement user authentication and management

#### **Day 1-3: Authentication Service**
- **Practical Tasks:**
  - Implement user registration and login
  - JWT token generation and validation
  - Password hashing with bcrypt
  - Input validation with Zod or Joi
  - Rate limiting for auth endpoints

- **Authentication Controller Example:**
```typescript
// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, name: true, role: true }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    });
  } catch (error) {
    next(error);
  }
};
```

#### **Day 4-7: User Management & Authorization**
- **Practical Tasks:**
  - Implement user CRUD operations
  - Role-based access control (RBAC)
  - JWT middleware for protected routes
  - User profile management
  - Team assignment and management

---

### **Week 3: Task & Project Management**
**Goal**: Build core business logic

#### **Day 1-3: Task Management Service**
- **Practical Tasks:**
  - CRUD operations for tasks
  - Task assignment and status updates
  - Search and filtering with Prisma
  - Pagination and sorting
  - Task dependencies and relationships

- **Task Service Example:**
```typescript
// backend/src/services/taskService.ts
import { PrismaClient, Task, TaskStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  dueDate: z.string().datetime().optional(),
  projectId: z.string(),
  assignedToId: z.string().optional()
});

export class TaskService {
  async createTask(data: z.infer<typeof createTaskSchema>, createdById: string): Promise<Task> {
    const validatedData = createTaskSchema.parse(data);
    
    return await prisma.task.create({
      data: {
        ...validatedData,
        createdById,
        status: TaskStatus.TODO
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } }
      }
    });
  }
  
  async getTasks(filters: {
    status?: TaskStatus;
    priority?: Priority;
    assignedToId?: string;
    projectId?: string;
    search?: string;
  }, page: number = 1, limit: number = 10) {
    const where: any = {};
    
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.assignedToId) where.assignedToId = filters.assignedToId;
    if (filters.projectId) where.projectId = filters.projectId;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }
    
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true } }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where })
    ]);
    
    return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
```

#### **Day 4-7: Project Management Service**
- **Practical Tasks:**
  - Project CRUD operations
  - Team management and assignments
  - Project progress tracking
  - Project templates and cloning
  - Project analytics and reporting

---

### **Week 4: Kafka Integration & Event-Driven Architecture**
**Goal**: Implement asynchronous processing with Kafka

#### **Day 1-3: Kafka Setup & Configuration**
- **Practical Tasks:**
  - Set up Kafka producer/consumer with Node.js
  - Create Kafka topics and partitions
  - Implement message serialization/deserialization
  - Add error handling and retry logic
  - Set up dead letter queues

- **Kafka Producer Example:**
```typescript
// backend/src/kafka/producer.ts
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { logger } from '../utils/logger';

export class KafkaProducer {
  private producer: Producer;
  
  constructor() {
    const kafka = new Kafka({
      clientId: 'task-management-system',
      brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092']
    });
    
    this.producer = kafka.producer();
  }
  
  async connect() {
    try {
      await this.producer.connect();
      logger.info('Kafka producer connected');
    } catch (error) {
      logger.error('Failed to connect Kafka producer:', error);
      throw error;
    }
  }
  
  async disconnect() {
    try {
      await this.producer.disconnect();
      logger.info('Kafka producer disconnected');
    } catch (error) {
      logger.error('Failed to disconnect Kafka producer:', error);
    }
  }
  
  async sendMessage(record: ProducerRecord) {
    try {
      await this.producer.send(record);
      logger.info(`Message sent to topic: ${record.topic}`);
    } catch (error) {
      logger.error('Failed to send message:', error);
      throw error;
    }
  }
  
  async sendTaskEvent(eventType: string, taskData: any) {
    await this.sendMessage({
      topic: 'task-events',
      messages: [{
        key: taskData.id,
        value: JSON.stringify({
          type: eventType,
          data: taskData,
          timestamp: new Date().toISOString()
        })
      }]
    });
  }
}
```

#### **Day 4-7: Event-Driven Business Logic**
- **Practical Tasks:**
  - Implement event producers for business actions
  - Create event consumers for async processing
  - Add event logging and monitoring
  - Implement event replay capabilities
  - Add event versioning and schema validation

---

### **Week 5: Redis Caching Layer**
**Goal**: Implement caching for performance optimization

#### **Day 1-3: Redis Setup & Configuration**
- **Practical Tasks:**
  - Set up Redis connection with Node.js
  - Implement cache utilities and helpers
  - Add cache invalidation strategies
  - Set up Redis clustering (if needed)
  - Implement cache monitoring

- **Redis Service Example:**
```typescript
// backend/src/services/cacheService.ts
import Redis from 'ioredis';
import { logger } from '../utils/logger';

export class CacheService {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3
    });
    
    this.redis.on('error', (error) => {
      logger.error('Redis connection error:', error);
    });
    
    this.redis.on('connect', () => {
      logger.info('Redis connected');
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error(`Cache set error for key ${key}:`, error);
    }
  }
  
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error(`Cache delete error for key ${key}:`, error);
    }
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
        logger.info(`Invalidated ${keys.length} cache keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      logger.error(`Cache invalidation error for pattern ${pattern}:`, error);
    }
  }
}
```

#### **Day 4-7: Cache Implementation & Optimization**
- **Practical Tasks:**
  - Implement cache-aside pattern for database queries
  - Add cache warming strategies
  - Set up cache hit/miss monitoring
  - Implement cache eviction policies
  - Add cache performance metrics

---

### **Week 6: Frontend Development & Integration**
**Goal**: Build React.js frontend and integrate with backend

#### **Day 1-3: React.js Setup & Components**
- **Practical Tasks:**
  - Set up React.js with TypeScript
  - Configure routing with React Router
  - Create reusable UI components
  - Implement responsive design
  - Add state management (Context API or Zustand)

#### **Day 4-7: API Integration & Real-time Features**
- **Practical Tasks:**
  - Connect frontend to backend APIs
  - Integrate Kafka events with frontend
  - Implement real-time notifications
  - Add WebSocket connections
  - Implement optimistic UI updates

---

## **🛠️ Key Dependencies:**

### **Backend:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.0.0",
    "kafkajs": "^2.2.4",
    "ioredis": "^5.3.2",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "prisma": "^5.0.0",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1"
  }
}
```

### **Frontend:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "axios": "^1.5.0",
    "zustand": "^4.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
```

---

## **📁 File Structure Examples:**

### **Complete Backend Structure:**
```typescript
// backend/src/index.ts
import app from './app';
import { logger } from './utils/logger';
import { kafkaProducer } from './kafka/producer';
import { cacheService } from './services/cacheService';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to Kafka
    await kafkaProducer.connect();
    
    // Test Redis connection
    await cacheService.set('health', 'ok', 60);
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await kafkaProducer.disconnect();
  process.exit(0);
});
```

---

## **🚀 Next Steps After Application Development:**

1. **Containerize with Docker** - Multi-stage builds
2. **Set up CI/CD pipeline** - Jenkins integration
3. **Deploy to Kubernetes** - EKS deployment
4. **Implement monitoring** - Prometheus + Grafana
5. **Add load testing** - Performance validation

---

## **💡 Key Benefits of This Architecture:**

### **Scalability:**
- **Microservices-ready**: Can easily split into separate services
- **Event-driven**: Asynchronous processing with Kafka
- **Caching layer**: Redis for performance optimization
- **Database optimization**: Prisma with PostgreSQL

### **DevOps Learning:**
- **Real-world complexity**: Production-ready application
- **Modern stack**: Current best practices and tools
- **Performance focus**: Built for high-scale operations
- **Monitoring ready**: Structured for observability

---

## **📋 Ready to Start Building?**

This plan will give you:
1. **Solid TypeScript backend** with Express and Prisma
2. **Event-driven architecture** with Kafka
3. **Performance optimization** with Redis caching
4. **Modern React frontend** with real-time features
5. **Production-ready code** for your DevOps portfolio

**Should we start with Week 1?** We can begin setting up the project structure and Prisma schema!

```plaintext
task-management-system/
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Prisma models
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript types
│   │   └── app.ts           # Express app
│   ├── prisma/              # Prisma schema and migrations
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React.js + TypeScript
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── shared/                   # Shared types and utilities
├── docker/                   # Docker configurations
└── docs/                     # Documentation
```

```plaintext
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  assignedTasks Task[] @relation("AssignedTasks")
  createdTasks  Task[] @relation("CreatedTasks")
  projects      Project[]
  team          Team?  @relation(fields: [teamId], references: [id])
  teamId        String?
  
  @@map("users")
}

model Task {
  id          String      @id @default(cuid())
  title       String
  description String?
  status      TaskStatus  @default(TODO)
  priority    Priority    @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relations
  assignedTo   User?   @relation("AssignedTasks", fields: [assignedToId], references: [id])
  assignedToId String?
  createdBy    User    @relation("CreatedTasks", fields: [createdById], references: [id])
  createdById  String
  project      Project @relation(fields: [projectId], references: [id])
  projectId    String
  
  @@map("tasks")
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  tasks Task[]
  users User[]
  team  Team   @relation(fields: [teamId], references: [id])
  teamId String
  
  @@map("projects")
}

model Team {
  id          String   @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  users    User[]
  projects Project[]
  
  @@map("teams")
}

enum UserRole {
  ADMIN
  MANAGER
  USER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
  ARCHIVED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum ProjectStatus {
  ACTIVE
  PAUSED
  COMPLETED
  CANCELLED
}
```

```typescript
// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import routes from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

export default app;
```

```typescript
// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, name: true, role: true }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token
    });
  } catch (error) {
    next(error);
  }
};
```

```typescript
// backend/src/services/taskService.ts
import { PrismaClient, Task, TaskStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  dueDate: z.string().datetime().optional(),
  projectId: z.string(),
  assignedToId: z.string().optional()
});

export class TaskService {
  async createTask(data: z.infer<typeof createTaskSchema>, createdById: string): Promise<Task> {
    const validatedData = createTaskSchema.parse(data);
    
    return await prisma.task.create({
      data: {
        ...validatedData,
        createdById,
        status: TaskStatus.TODO
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } }
      }
    });
  }
  
  async getTasks(filters: {
    status?: TaskStatus;
    priority?: Priority;
    assignedToId?: string;
    projectId?: string;
    search?: string;
  }, page: number = 1, limit: number = 10) {
    const where: any = {};
    
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.assignedToId) where.assignedToId = filters.assignedToId;
    if (filters.projectId) where.projectId = filters.projectId;
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }
    
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true } }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where })
    ]);
    
    return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
```

```typescript
// backend/src/kafka/producer.ts
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { logger } from '../utils/logger';

export class KafkaProducer {
  private producer: Producer;
  
  constructor() {
    const kafka = new Kafka({
      clientId: 'task-management-system',
      brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092']
    });
    
    this.producer = kafka.producer();
  }
  
  async connect() {
    try {
      await this.producer.connect();
      logger.info('Kafka producer connected');
    } catch (error) {
      logger.error('Failed to connect Kafka producer:', error);
      throw error;
    }
  }
  
  async disconnect() {
    try {
      await this.producer.disconnect();
      logger.info('Kafka producer disconnected');
    } catch (error) {
      logger.error('Failed to disconnect Kafka producer:', error);
    }
  }
  
  async sendMessage(record: ProducerRecord) {
    try {
      await this.producer.send(record);
      logger.info(`Message sent to topic: ${record.topic}`);
    } catch (error) {
      logger.error('Failed to send message:', error);
      throw error;
    }
  }
  
  async sendTaskEvent(eventType: string, taskData: any) {
    await this.sendMessage({
      topic: 'task-events',
      messages: [{
        key: taskData.id,
        value: JSON.stringify({
          type: eventType,
          data: taskData,
          timestamp: new Date().toISOString()
        })
      }]
    });
  }
}
```

```typescript
// backend/src/services/cacheService.ts
import Redis from 'ioredis';
import { logger } from '../utils/logger';

export class CacheService {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3
    });
    
    this.redis.on('error', (error) => {
      logger.error('Redis connection error:', error);
    });
    
    this.redis.on('connect', () => {
      logger.info('Redis connected');
    });
  }
  
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error(`Cache set error for key ${key}:`, error);
    }
  }
  
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error(`Cache delete error for key ${key}:`, error);
    }
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
        logger.info(`Invalidated ${keys.length} cache keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      logger.error(`Cache invalidation error for pattern ${pattern}:`, error);
    }
  }
}
```

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.0.0",
    "kafkajs": "^2.2.4",
    "ioredis": "^5.3.2",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "prisma": "^5.0.0",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1"
  }
}
```

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "axios": "^1.5.0",
    "zustand": "^4.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
```

```typescript
// backend/src/index.ts
import app from './app';
import { logger } from './utils/logger';
import { kafkaProducer } from './kafka/producer';
import { cacheService } from './services/cacheService';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to Kafka
    await kafkaProducer.connect();
    
    // Test Redis connection
    await cacheService.set('health', 'ok', 60);
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await kafkaProducer.disconnect();
  process.exit(0);
});
```

---

**User**

yes please let us start implementing

---

**Cursor**

Perfect! Let's start implementing the application step by step. We'll begin with Week 1: Project Setup & Backend Foundation.

## **🚀 Week 1: Project Setup & Backend Foundation**

### **Day 1-2: Project Structure & Dependencies**

Let's start by creating the project structure and setting up all the necessary dependencies.

#### **Step 1: Create Project Directory Structure**


