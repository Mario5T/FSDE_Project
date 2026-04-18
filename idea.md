# SnackSafari Project Idea

## Scope
SnackSafari is a full stack snack subscription platform where users can register, manage preferences, browse snacks, select plans, and place recurring snack-box orders.

The project is intentionally backend-heavy (about 75%) with a production-style API and layered server architecture. The frontend (about 25%) focuses on user flows and API integration.

## Key Features
- User authentication with JWT (register, login, profile)
- Role-based access control (user/admin)
- Snack catalog APIs (public read, admin CRUD)
- Subscription plan APIs (public read, admin create)
- Order APIs for authenticated users
- User preference and subscription management
- Prisma ORM + SQLite relational data model
- React + Vite frontend consuming backend APIs

## Architecture Direction
- Backend uses clean layering:
  - controllers: HTTP request/response orchestration
  - services: business logic and validations
  - repositories: data access via Prisma
- Frontend uses reusable pages, auth context, and shared API client

## Why This Scope Fits FSDE
- Demonstrates OOP-aligned modular design and separation of concerns
- Uses practical design patterns:
  - Repository Pattern for persistence abstraction
  - Service Layer Pattern for business workflows
  - Middleware Pattern for authentication/authorization
- Supports real deployment flow:
  - backend hosted separately (provided API)
  - frontend deployed on Vercel with environment-driven API URL
