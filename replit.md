# SnackSafari

A subscription-based snack e-commerce platform that delivers curated global snack boxes to users monthly.

## Architecture

**Full-stack monorepo** with separate `client/` and `server/` directories.

### Backend (`server/`)
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: SQLite3 via Prisma ORM
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Port**: 3001 (binds to 0.0.0.0)
- **Entry**: `server/src/index.js`
- **DB file**: `server/prisma/dev.db`

### Frontend (`client/`)
- **Framework**: React 18
- **Build tool**: Vite 5
- **Router**: React Router v6
- **HTTP client**: Axios (proxied via Vite to backend)
- **Port**: 5000 (binds to 0.0.0.0)

## API Routes

- `GET /api/health` — health check
- `POST /api/auth/register` — user registration
- `POST /api/auth/login` — user login
- `GET /api/auth/me` — get current user (protected)
- `GET /api/snacks` — list all snacks (with optional ?category= filter)
- `GET /api/snacks/:id` — get snack by id
- `POST /api/snacks` — create snack (admin only)
- `PUT /api/snacks/:id` — update snack (admin only)
- `DELETE /api/snacks/:id` — delete snack (admin only)
- `GET /api/plans` — list subscription plans
- `GET /api/plans/:id` — get plan by id
- `GET /api/orders` — user's orders (protected)
- `POST /api/orders` — create order (protected)
- `PUT /api/users/preferences` — update user preferences (protected)
- `PUT /api/users/subscription` — update subscription status (protected)
- `GET /api/users` — list all users (admin only)

## Frontend Pages

- `/` — Landing page with hero, how-it-works, features, testimonials
- `/explore` — Browse snacks with category filtering
- `/plans` — Subscription plan selection (Basic $19, Premium $34, Deluxe $54)
- `/login` — Login form
- `/register` — Registration form
- `/dashboard` — User dashboard (protected) with tabs: overview, preferences, subscription

## Database

Prisma schema at `server/prisma/schema.prisma` with models:
- `User` — auth, role (user/admin)
- `Preferences` — tastes, allergies, boxSize (one-to-one with User)
- `Subscription` — active, plan, dates (one-to-one with User)
- `Snack` — product catalog
- `SubscriptionPlan` — Basic/Premium/Deluxe tiers
- `Order` — user orders
- `OrderItem` — line items per order
- `Delivery` — delivery tracking

## Running

Workflow: `Start application`
Command: `bash start.sh`

The `start.sh` script:
1. Kills any existing backend
2. Starts Node backend via `nohup` (detached)
3. Waits for backend to be healthy
4. Starts Vite dev server in foreground

## Seeded Data

- Admin user: `admin@snacksafari.com` / `admin123`
- 12 snacks across categories (Sweet, Spicy, Savory, Drinks)
- 3 subscription plans (Basic, Premium, Deluxe)

## Notes

- The server must bind to `0.0.0.0` (not `localhost`) for Vite proxy to work in Replit
- DATABASE_URL is runtime-managed by Replit; Prisma schema uses hardcoded `file:./dev.db`
- Vite proxy config in `client/vite.config.js` proxies `/api` requests to `http://localhost:3001`
