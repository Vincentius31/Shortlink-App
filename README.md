# Shortlink App

A full-stack URL shortener application with user authentication, link management, and profile customization.

## Tech Stack

**Frontend**
- React 19 + Vite 8
- React Router DOM v7
- Tailwind CSS v4
- React Hook Form + Yup (form validation)
- React Icons

**Backend**
- Go (Gin framework)
- PostgreSQL (via pgx/v5 connection pool)
- JWT authentication
- Argon2 password hashing

## Project Structure

```
Shortlink-App/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, Footer, Modal, ProtectedRoute
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useAuth
│   │   ├── lib/            # HTTP client, auth utilities
│   │   └── pages/          # Landing, Login, Register, Dashboard, CreateLink, Profile, NotFound
│   └── .env
└── backend/                # Go backend
    ├── cmd/main.go          # Entry point
    ├── internal/
    │   ├── di/             # Dependency injection container
    │   ├── handlers/       # Auth and link HTTP handlers
    │   ├── middleware/     # JWT auth middleware
    │   ├── model/          # User, Link, Response models
    │   ├── repository/     # Database layer
    │   ├── routes/         # Route definitions
    │   └── service/        # Business logic
    ├── migrations/         # SQL migration files
    └── uploads/            # User-uploaded profile images
```

## Features

- User registration and login with JWT-based authentication
- Create short links with custom or auto-generated slugs
- View and delete your links from a dashboard
- Click count tracking per link
- URL redirection via `/:slug`
- Profile management with avatar upload
- Protected routes on the frontend

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | — | Register a new user |
| POST | `/api/login` | — | Login and receive a JWT |
| GET | `/api/me` | ✓ | Get current user info |
| POST | `/api/profile/update` | ✓ | Update profile (name, avatar) |
| POST | `/api/links` | ✓ | Create a short link |
| GET | `/api/links` | ✓ | Get all links for current user |
| DELETE | `/api/links/:id` | ✓ | Delete a link |
| GET | `/:slug` | — | Redirect to original URL |

## Getting Started

### Prerequisites

- Go 1.25+
- Node.js 18+
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy and configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/shortlink
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   PORT=8888
   ```

3. Run database migrations:
   ```bash
   # Using golang-migrate or run the SQL files in migrations/ manually
   ```

4. Start the backend:
   ```bash
   go run cmd/main.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```env
   VITE_BASE_URL=http://localhost:8888
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Links table
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```