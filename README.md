# SnackSafari (FSDE Project)

Full-stack snack subscription platform with:
- React + Vite frontend
- Express + Prisma backend
- SQLite storage
- Unit, integration, and E2E tests
- GitHub Actions CI + EC2 deploy workflow

## Tech Stack

- Frontend: React 18, Vite, React Router
- Backend: Express, Prisma
- Database: SQLite3
- Testing: Vitest, React Testing Library, Supertest, Playwright
- Quality: ESLint, Prettier

## Project Structure

- `client/` React app
- `server/` Express API + Prisma
- `.github/workflows/main.yml` CI checks (lint, tests, build, E2E)
- `.github/workflows/deploy-ec2.yml` manual EC2 deployment workflow

## Local Setup

### 1) Install dependencies

```bash
cd server && npm ci
cd ../client && npm ci
```

### 2) Configure backend environment

Create `server/.env`:

```env
PORT=3001
DATABASE_URL=file:./dev.db
JWT_SECRET=change-me
```

### 3) Initialize database

```bash
cd server
npx prisma migrate deploy
node src/seed.js
```

### 4) Run locally

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Quality and Test Commands

### Server

```bash
cd server
npm run lint
npm test
```

### Client

```bash
cd client
npm run lint
npm test
npm run test:watch
npm run build
```

### End-to-End

```bash
cd client
npm run e2e
```

## CI

GitHub Actions workflow in `.github/workflows/main.yml` runs on push and pull request to `main`:
- install dependencies (server + client)
- lint server and client
- run server integration tests and client unit tests
- build client
- run Playwright E2E in a separate job

## Deployment

### Render (Backend) + Vercel (Frontend)

- Backend uses `render.yaml`
- Frontend can be deployed to Vercel from `client/`
- Ensure frontend API base URL points to deployed backend:
	- set `VITE_API_URL` in frontend environment variables

### EC2 Deployment via GitHub Actions

Use `.github/workflows/deploy-ec2.yml` via **Run workflow**.

Required repository secrets:
- `EC2_HOST` - public host/IP
- `EC2_PORT` - SSH port (usually `22`)
- `EC2_USER` - SSH user
- `EC2_SSH_KEY` - private SSH key
- `EC2_HOST_FINGERPRINT` - SSH host fingerprint for strict verification
- `EC2_APP_DIR` - deployment directory on EC2 (example: `/var/www/FSDE_Project`)
- `DATABASE_URL` - production Prisma SQLite URL (or other Prisma DB URL)
- `JWT_SECRET` - backend JWT secret

What the workflow does:
- checks out selected git ref
- validates all required secrets are present
- securely SSHs to EC2 with host fingerprint verification
- fetches and checks out the selected ref on the server
- installs production dependencies with `npm ci --omit=dev`
- writes backend `.env` from secrets
- runs `npx prisma migrate deploy`
- restarts (or creates) PM2 process `snacksafari-server`
- verifies `/api/health` on the EC2 host

## Notes

- Prisma datasource is environment-driven (`DATABASE_URL`) in `server/prisma/schema.prisma`.
- Vite dev server proxies API requests to backend during local development.
- If deploying with SQLite, ensure persistent storage strategy on your host.
