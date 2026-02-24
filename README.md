# Auth Server TypeScript

A production-ready JWT authentication server built with TypeScript, Fastify, and PostgreSQL. Designed with clean architecture principles and comprehensive test coverage.

## Features

- 🔐 **JWT Token Management** - Secure token generation and validation using SHA256
- 🗄️ **PostgreSQL Integration** - Connection pooling with transaction support
- 🏗️ **Clean Architecture** - Repository pattern with dependency injection
- ⚡ **Fastify Framework** - High-performance HTTP server
- 🧪 **Complete Test Suite** - Unit and integration tests with Vitest
- 🔧 **TypeScript** - Full type safety with strict mode enabled
- 📦 **Production Ready** - Webpack bundling and Docker-compatible

## Prerequisites

- **Node.js** >= 18.0.0
- **PostgreSQL** >= 12.0
- **npm** or **bun** package manager

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd auth-server-ts

# Install dependencies
npm install
# or with bun
bun install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/auth_server?schema=public"
AUTH_SECRET="your-secret-key-here-min-32-chars"
APP_TIMEZONE="Asia/Dhaka"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Or use Prisma CLI directly
bunx prisma migrate dev
```

### 4. Run the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

The server will start on `http://0.0.0.0:4000`

## Project Structure

```
auth-server-ts/
├── index.ts                 # Fastify server entry point
├── settings.ts              # Configuration and environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── webpack.config.js        # Build configuration
├── vitest.config.ts         # Test configuration
│
├── lib/                      # Core utilities and services
│   ├── factory.ts           # Dependency injection / Factory pattern
│   ├── jwt.ts               # JWT token generation and parsing
│   ├── mapper.ts            # Data transformation functions
│   ├── postgres.ts          # PostgreSQL pool and transaction helpers
│   └── settingsUtil.ts      # Settings utilities (token expiration)
│
├── interface/               # TypeScript interfaces
│   └── IUserRepository.ts   # Repository contract
│
├── repository/              # Data access layer
│   ├── Repository.ts        # Main repository facade
│   └── PgUserRepository.ts  # PostgreSQL implementation
│
├── service/                 # Business logic layer
│   └── service.ts           # Service implementation
│
├── type/                    # TypeScript type definitions
│   └── type.ts              # All type exports
│
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Prisma schema
│   └── migrations/          # Migration files
│
└── tests/                   # Test suite
    ├── setup.ts             # Test setup and configuration
    ├── index.test.ts        # API endpoint tests
    ├── jwt.test.ts          # JWT functionality tests
    ├── mapper.test.ts       # Data mapper tests
    ├── service.test.ts      # Service layer tests
    ├── PgUserRepository.test.ts  # Repository tests
    ├── settings.test.ts     # Settings tests
    └── time.test.ts         # Time utility tests
```

## API Endpoints

### Health Check

```bash
GET /health
```

Response:
```json
{
  "status": "UP"
}
```

### Root Endpoint

```bash
GET /
```

Response: `API is running...`

### Check User Existence

```bash
GET /user_exists?email=user@example.com
```

Response:
```json
{
  "exists": false
}
```

### Generate JWT Token

```bash
POST /get_token?email=user@example.com
```

Response:
```json
{
  "success": true,
  "tokenInfo": {
    "email": "user@example.com",
    "expireAt": "2026-02-24T22:45:04Z",
    "hash": "sha256_hash_here"
  }
}
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test -- --watch
```

### Coverage Report

```bash
npm run test -- --coverage
```

### Test Categories

- **Unit Tests** - Isolated component testing with mocks
- **Integration Tests** - Database and service integration tests
- **API Tests** - HTTP endpoint validation

## Development Workflow

### Add a New Feature

1. **Create the type** in `type/type.ts`
2. **Implement repository method** in `repository/PgUserRepository.ts`
3. **Add service logic** in `service/service.ts`
4. **Create API endpoint** in `index.ts`
5. **Write tests** in `tests/`

### Environment-Specific Configs

Settings are loaded from `.env` and `settings.ts`:

```typescript
export const settings = {
  tokenTTLSec: 60 * 60,           // 1 hour
  authSecret: process.env.AUTH_SECRET,
  databaseAdapter: 'postgresql',
  databaseUrl: process.env.DATABASE_URL
};
```

### Database Transactions

Use the transaction helper for multi-step operations:

```typescript
import { withTransaction } from '../lib/postgres';

await withTransaction(async (client) => {
  // Your database operations
  await client.query('...');
});
```

## Architecture Decisions

### Repository Pattern
Decouples business logic from data access. Allows swapping PostgreSQL for MongoDB or other databases.

### Service Layer
Contains all business logic. Easy to test and reuse across different interfaces.

### Factory Pattern
Centralized dependency injection. Clear wiring of dependencies in `lib/factory.ts`.

### JWT Implementation
Uses SHA256 hashing of user info + expiration + secret. Token stored in base64.

## Common Tasks

### Update Database Schema

```bash
# Modify prisma/schema.prisma
npx prisma migrate dev --name <migration_name>
```

### Generate Prisma Client

```bash
npx prisma generate
```

### View Database

```bash
npx prisma studio
```

### Build for Production

```bash
npm run build
# Creates dist/bundle.js
node dist/bundle.js
```

## Troubleshooting

### Database Connection Fails

- Check `DATABASE_URL` in `.env`
- Verify PostgreSQL is running
- Ensure database exists: `createdb auth_server`

### Tests Fail

- Run migrations: `npx prisma migrate dev`
- Check environment variables in `.env`
- Verify PostgreSQL is accessible

### Port Already in Use

Change the port in `index.ts`:

```typescript
const port: number = 4000; // Change this
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/user-feature

# Make changes and commit
git add .
git commit -m "feat: add user feature"

# Follow Conventional Commits:
# feat: new feature
# fix: bug fix
# docs: documentation
# test: add/update tests
# refactor: code restructuring
```

## Performance Optimization

- **Connection Pooling** - PostgreSQL pool with max 20 connections
- **Timezone Handling** - Server sets timezone on each connection
- **Efficient Queries** - Parameterized queries prevent SQL injection

## Security Considerations

- 🔒 **Environment Secrets** - Never commit `.env` file
- 🔐 **Auth Secret** - Use strong, cryptographically random secret
- 🛡️ **SQL Injection** - All queries use parameterized statements
- ⏰ **Token Expiration** - Configurable TTL (default 1 hour)

## Production Deployment

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist
CMD ["node", "dist/bundle.js"]
```

### Environment Variables Required

```env
DATABASE_URL="postgresql://prod_user:password@prod_host:5432/auth_server"
AUTH_SECRET="<strong-random-secret>"
NODE_ENV="production"
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/awesome-feature`
3. Write tests for new features
4. Ensure all tests pass: `npm test`
5. Commit with conventional commits
6. Push and create a Pull Request

## License

MIT - See [LICENSE](LICENSE) file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues and documentation
- Review test files for usage examples

---

**Happy coding! 🚀**
