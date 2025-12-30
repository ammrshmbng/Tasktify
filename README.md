# 🚀 Taskify - Task Management REST API

A modern Task Management REST API built with **NestJS**, **TypeORM**, and **PostgreSQL**. Features JWT authentication, role-based access control (RBAC), task labeling, and comprehensive CRUD operations.

## ✨ Features

- 🔐 **Authentication** - JWT-based auth with Passport
- 👥 **Role-based Access** - Admin & User roles with guards
- 📝 **Task Management** - Full CRUD with labels, status tracking
- 🔍 **Advanced Queries** - Search, filter, sort, pagination
- ✅ **Validation** - Request validation with class-validator
- 🗄️ **Database** - PostgreSQL with TypeORM migrations

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| NestJS | v10 |
| TypeORM | v0.3 |
| PostgreSQL | 14+ |
| Node.js | 18+ |

## 📦 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd project_src
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=taskify
DB_SYNC=false

# For Neon DB (Cloud PostgreSQL), use:
# DB_HOST=ep-xxx-xxx.aws.neon.tech
# Note: SSL is required for cloud databases

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1d

# App
PORT=3000
```

### 4. Run migrations
```bash
npm run migration:run
```

### 5. Start the application

**Development:**
```bash
npm run start:dev
```

**Production:**
```bash
npm run build
npm run start:prod
```

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PATCH | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### Query Parameters
```
GET /tasks?status=OPEN&search=nestjs&limit=10&offset=0&sortBy=createdAt&sortOrder=DESC&labels=urgent,bug
```

## 📁 Project Structure

```
src/
├── config/          # App & database configuration
├── tasks/           # Tasks module (entity, service, controller)
├── users/           # Users module with auth
│   ├── auth/        # Auth controller & service
│   ├── decorators/  # Custom decorators (@Roles, @Public)
│   ├── guards/      # JWT & Roles guards
│   └── dtos/        # Request DTOs
├── common/          # Shared utilities
└── migrations/      # Database migrations
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start in development mode |
| `npm run build` | Build for production |
| `npm run migration:generate` | Generate new migration |
| `npm run migration:run` | Run pending migrations |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 📄 License

This project is [UNLICENSED](LICENSE).

---

Made with ❤️ using NestJS
