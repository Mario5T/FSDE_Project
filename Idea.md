#  SnackSafari – Subscription-Based Snacks E-Commerce Platform

##  Overview
Snackx is a subscription-based e-commerce platform that delivers curated snack boxes to users on a recurring basis. The platform focuses on personalized snack preferences, convenience, and discovery of new flavors, brands, and regional snacks.

Users can subscribe monthly, customize preferences, skip deliveries, and manage their plans easily through a modern web interface.

---

##  Problem Statement
- Users struggle to consistently find new and exciting snacks.
- Local and niche snack brands lack online visibility.
- Traditional e-commerce requires repeated ordering for consumables.
- Subscription snack services lack personalization and flexibility.

---

##  Solution
SnackCrate provides:
- Curated snack boxes based on user preferences
- Flexible subscription plans
- Discovery-driven shopping experience
- Support for local & indie snack brands

---

##  Target Audience
- College students & young professionals
- Snack enthusiasts
- Busy users who prefer recurring deliveries
- Users interested in discovering new snack brands

---

##  Core Features

### 1. Subscription Plans
- Monthly / Quarterly / Custom plans
- Tier-based boxes (Basic, Premium, Deluxe)
- Auto-renewal billing

### 2. Snack Personalization
- Preference selection (sweet, spicy, healthy, vegan, etc.)
- Allergy & dietary filters
- AI-based snack recommendations (future scope)

### 3. Subscription Management
- Pause / skip / cancel subscription anytime
- Change delivery address
- Upgrade or downgrade plan

### 4. One-Time Purchase Store
- Buy individual snacks outside subscription
- Limited edition snack drops

### 5. User Dashboard
- Subscription status
- Delivery history
- Preference settings
- Saved snacks

### 6. Vendor Panel (Admin / Sellers)
- Add & manage snack products
- Inventory tracking
- Order fulfillment dashboard

---

##  Delivery & Logistics
- Scheduled monthly deliveries
- Order tracking
- Delivery notifications
- Address management

---

##  Admin Dashboard
- User management
- Subscription analytics
- Revenue tracking
- Product performance insights

---

##  MVP Scope
**Phase 1 (Minimum Viable Product)**
- User authentication
- Subscription plans
- Snack preference form
- Monthly auto-order generation
- Admin product management
- Payment integration

**Phase 2**
- AI recommendations
- Vendor onboarding
- Loyalty points & rewards
- Reviews & ratings

---

##  Goal
Build a modern, scalable, and user-friendly snack subscription platform that makes snack discovery effortless and enjoyable.

---

##  Implementation Notes

### Architecture
- React + Vite frontend with reusable pages, a shared auth context, and protected routing for the dashboard.
- Express backend with Prisma ORM and SQLite storage for authentication, snacks, plans, orders, and user preferences.
- Shared API client logic in the frontend keeps request handling consistent across pages and supports local proxying and deployed API URLs.

### Workflow
- Local development runs the backend on port 3001 and the frontend on port 5000.
- Vite proxies `/api` requests during development, while the shared API client can also use `VITE_API_URL` in deployment.
- GitHub Actions runs install, lint, unit/integration tests, build, and an E2E browser flow on push and pull request events.

### Design Decisions
- The dashboard keeps preference and subscription controls together so users can manage the main subscription lifecycle in one place.
- Landing, plans, and explore pages are intentionally card-based and responsive to keep the interface readable on mobile and desktop.
- The backend app is exported separately from the process entry point so automated tests can import it directly without starting an extra listener.

### Challenges
- SQLite required a stable environment-variable-based connection string for test and CI database isolation.
- Frontend API calls needed one reusable client so the same code path works with the Vite proxy, CI, and deployment.
- Browser E2E coverage is easiest when the app can boot both client and server from the test runner, so the test config starts both services automatically.


