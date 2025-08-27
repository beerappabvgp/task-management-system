# Task Management System

A modern, scalable task management system built with the MERN stack, featuring real-time updates, team collaboration, and comprehensive project management capabilities.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Project Management**: Create, track, and manage projects with status and priority
- **Task Management**: Comprehensive task tracking with assignees, due dates, and status
- **Team Collaboration**: Team management with member roles and permissions
- **Real-time Updates**: Kafka-based event streaming for real-time notifications
- **Caching**: Redis-based caching for improved performance
- **Responsive UI**: Modern React frontend with Tailwind CSS
- **API-first Design**: RESTful API with comprehensive documentation

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Message Queue**: Apache Kafka
- **Caching**: Redis
- **Validation**: Zod
- **Logging**: Winston
- **Security**: Helmet, CORS

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Message Broker**: Apache Kafka 7.4
- **Monitoring**: Kafka UI, Redis Commander

## 📋 Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-management-system
```

### 2. Start the Infrastructure

```bash
# Start all services (PostgreSQL, Redis, Kafka, Backend, Frontend)
docker-compose up -d

# Or start only infrastructure services
docker-compose up -d postgres redis zookeeper kafka
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Kafka UI**: http://localhost:8080
- **Redis Commander**: http://localhost:8081

## 🗄️ Database Schema

The system includes the following main entities:

- **Users**: Authentication and user management
- **Projects**: Project information and status
- **Tasks**: Task details, assignments, and progress
- **Teams**: Team composition and member management
- **UserRoles**: Role-based access control

## 🔐 Authentication

The system uses JWT tokens for authentication. Users can:

- Register with email, password, and name
- Login with email and password
- Access protected routes based on their role
- Manage their profile information

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/my-tasks` - Get user's tasks

### Teams
- `GET /api/projects/teams` - List all teams
- `POST /api/projects/teams` - Create new team
- `POST /api/projects/teams/add-user` - Add user to team

## 🏗️ Project Structure

```
task-management-system/
├── backend/                 # Backend API service
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── app.ts          # Express app setup
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Database schema and migrations
│   ├── Dockerfile          # Backend container
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # App entry point
│   ├── Dockerfile          # Frontend container
│   └── package.json        # Frontend dependencies
├── docker-compose.yml      # Infrastructure orchestration
└── README.md               # Project documentation
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Management

```bash
# Access PostgreSQL
docker exec -it task-management-postgres psql -U postgres -d task_management

# Access Redis CLI
docker exec -it task-management-redis redis-cli

# Access Kafka
docker exec -it task-management-kafka kafka-topics --bootstrap-server localhost:9092 --list
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Production Build

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up -d

# Or build individual services
docker-compose build backend frontend
docker-compose up -d backend frontend
```

### Environment Variables

Create `.env` files for each service:

**Backend (.env)**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_management"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3000
NODE_ENV="production"
KAFKA_BROKERS=localhost:9092
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000/api
NODE_ENV=production
```

## 📊 Monitoring & Observability

- **Kafka UI**: Monitor Kafka topics, messages, and consumer groups
- **Redis Commander**: Monitor Redis keys, memory usage, and performance
- **Application Logs**: Winston-based structured logging
- **Health Checks**: Built-in health check endpoints

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: Security headers and protection
- **Input Validation**: Zod schema validation
- **Role-based Access Control**: Granular permission system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🗺️ Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] File upload and management
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external tools (Slack, GitHub, etc.)
- [ ] Advanced search and filtering
- [ ] Automated testing suite
- [ ] CI/CD pipeline setup
- [ ] Kubernetes deployment manifests
- [ ] Monitoring and alerting setup

---

**Built with ❤️ using modern web technologies**

# task-management-system
