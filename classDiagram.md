# SnackSafari — Class Diagram

```mermaid
classDiagram
    direction TB

    %% ─── SERVER-SIDE CLASSES ─────────────────────────────

    class App {
        +express app
        +use(cors)
        +use(json)
        +use("/api/auth", authRoutes)
        +get("/api/health")
        +get("/")
    }

    class ConnectDB {
        +connectDB() Promise~void~
    }

    class AuthRoutes {
        +POST /register → registerUser
        +POST /login → loginUser
        +GET /me → protect, getMe
    }

    class AuthController {
        -generateToken(id) string
        +registerUser(req, res) Promise~void~
        +loginUser(req, res) Promise~void~
        +getMe(req, res) Promise~void~
    }

    class AuthMiddleware {
        +protect(req, res, next) Promise~void~
    }

    class UserModel {
        +String name
        +String email
        +String password
        +String role ["user" | "admin"]
        +Preferences preferences
        +Subscription subscription
        +Date createdAt
        +pre("save") hashPassword()
        +matchPassword(entered) Promise~boolean~
    }

    class Preferences {
        +String[] tastes
        +String[] allergies
        +String boxSize ["Small" | "Medium" | "Large"]
    }

    class Subscription {
        +Boolean active
        +String plan
        +Date startDate
        +Date nextDeliveryDate
    }

    %% Server-side relationships
    App --> AuthRoutes : mounts
    App --> ConnectDB : calls on startup
    AuthRoutes --> AuthController : delegates to
    AuthRoutes --> AuthMiddleware : uses protect
    AuthController --> UserModel : queries / creates
    AuthMiddleware --> UserModel : findById
    UserModel --> Preferences : embeds
    UserModel --> Subscription : embeds

    %% ─── CLIENT-SIDE CLASSES ─────────────────────────────

    class AppComponent {
        +Router
        +LazyMotion
        +AuthProvider
        +Navigation
        +Routes
    }

    class Navigation {
        +NavLink[] navLinks
        +isLanding boolean
        +render() JSX
    }

    class AuthContext {
        +user State
        +loading State
        +login(email, password) Promise~void~
        +register(name, email, password) Promise~void~
        +logout() void
        +checkUserLoggedIn() Promise~void~
    }

    class LandingPage {
        +Hero
        +HowItWorks
        +SnackDiscovery
        +SubscriptionPlans
        +Testimonials
        +Footer
    }

    class LoginPage {
        +email State
        +password State
        +error State
        +isLoading State
        +handleSubmit(e) Promise~void~
    }

    class RegisterPage {
        +name State
        +email State
        +password State
        +error State
        +isLoading State
        +handleSubmit(e) Promise~void~
    }

    class ExplorePage {
        +snacks[] staticData
        +categories[] filters
        +activeCategory State
        +usePexelsImages() hook
        +SnackGridCard
        +SkeletonGridCard
    }

    class PlansPage {
        +plans[] staticData
        +billingToggle State
        +selectedPlan State
    }

    class ProductPage {
        +quantity State
        +handleAdd() void
    }

    class DashboardPage {
        +subscriptionStatus
        +deliveryHistory
        +preferenceSettings
    }

    class UsePexelsImages {
        +images PexelsPhoto[]
        +loading boolean
        +error string?
        +fetchImages() Promise~void~
        +refetch() void
    }

    class PexelsPhoto {
        +number id
        +string url
        +string photographer
        +string avg_color
        +Src src
        +string alt
    }

    %% UI Component Library
    class UIComponents {
        <<abstract>>
        +Button
        +Card
        +Container
        +Input
        +Section
        +Typography (Heading, Text)
    }

    class LandingComponents {
        <<abstract>>
        +Hero
        +HowItWorks
        +SnackDiscovery
        +SubscriptionPlans
        +Testimonials
        +Footer
        +MotionWrappers
        +SmoothScroll
    }

    %% Client-side relationships
    AppComponent --> AuthContext : provides
    AppComponent --> Navigation : renders
    AppComponent --> LandingPage : route "/"
    AppComponent --> LoginPage : route "/login"
    AppComponent --> RegisterPage : route "/register"
    AppComponent --> PlansPage : route "/plans"
    AppComponent --> ExplorePage : route "/explore"
    AppComponent --> ProductPage : route "/product"
    AppComponent --> DashboardPage : route "/dashboard"

    LoginPage --> AuthContext : uses login()
    RegisterPage --> AuthContext : uses register()
    DashboardPage --> AuthContext : uses user data

    LandingPage --> LandingComponents : composes
    ExplorePage --> UsePexelsImages : uses hook
    UsePexelsImages --> PexelsPhoto : returns

    LoginPage --> UIComponents : uses
    RegisterPage --> UIComponents : uses
    ExplorePage --> UIComponents : uses
    PlansPage --> UIComponents : uses
    ProductPage --> UIComponents : uses
    DashboardPage --> UIComponents : uses

    %% Cross-boundary
    AuthContext ..> App : HTTP requests via Axios
```

## Class Summary

| Layer | Class | Responsibility |
|-------|-------|----------------|
| **Server** | `App` | Express app setup, middleware, route mounting |
| **Server** | `ConnectDB` | MongoDB connection via Mongoose |
| **Server** | `AuthRoutes` | Route definitions for `/api/auth` |
| **Server** | `AuthController` | Business logic for register, login, getMe |
| **Server** | `AuthMiddleware` | JWT token verification, route protection |
| **Server** | `UserModel` | Mongoose schema with password hashing |
| **Server** | `Preferences` | Embedded sub-document (tastes, allergies, boxSize) |
| **Server** | `Subscription` | Embedded sub-document (plan, dates, status) |
| **Client** | `AppComponent` | Root component with routing and providers |
| **Client** | `AuthContext` | Global auth state management (login/register/logout) |
| **Client** | `LoginPage` / `RegisterPage` | Authentication forms |
| **Client** | `ExplorePage` | Snack browsing with filtering and Pexels images |
| **Client** | `PlansPage` | Subscription plan display and selection |
| **Client** | `ProductPage` | Individual product detail and cart interaction |
| **Client** | `DashboardPage` | User subscription and preference management |
| **Client** | `UsePexelsImages` | Custom hook for Pexels API integration |
| **Client** | `UIComponents` | Reusable UI primitives (Button, Card, Input, etc.) |
