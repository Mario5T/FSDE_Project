# SnackSafari — ER Diagram

> Based on the current MongoDB/Mongoose schema. Relationships shown follow document embedding and reference patterns.

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name "required"
        String email UK "required, unique, validated"
        String password "required, min 6, bcrypt hashed, select:false"
        String role "enum: user | admin, default: user"
        Date createdAt "default: Date.now"
    }

    PREFERENCES {
        StringArray tastes "e.g. Sweet, Spicy, Healthy, Vegan"
        StringArray allergies "dietary restrictions"
        String boxSize "enum: Small | Medium | Large, default: Medium"
    }

    SUBSCRIPTION {
        Boolean active "default: false"
        String plan "e.g. Basic, Premium, Deluxe"
        Date startDate
        Date nextDeliveryDate
    }

    SNACK {
        ObjectId _id PK
        String name "required"
        String origin "country of origin"
        Float price
        Float rating "1-5 scale"
        String category "Sweet, Savory, Spicy, Drinks"
        String description
        String imageUrl
        Boolean available "default: true"
    }

    SUBSCRIPTION_PLAN {
        String id PK "basic | premium | deluxe"
        String name "Basic, Premium, Deluxe"
        Float monthlyPrice "19, 34, 54"
        StringArray features "included features list"
        StringArray excluded "excluded features list"
        Boolean highlight "featured plan flag"
    }

    ORDER {
        ObjectId _id PK
        ObjectId userId FK
        String planId FK
        Date orderDate
        Date deliveryDate
        String status "pending | shipped | delivered"
        Float totalAmount
    }

    ORDER_ITEM {
        ObjectId _id PK
        ObjectId orderId FK
        ObjectId snackId FK
        Int quantity
        Float unitPrice
    }

    DELIVERY {
        ObjectId _id PK
        ObjectId orderId FK
        String address
        String trackingNumber
        String status "processing | shipped | in-transit | delivered"
        Date estimatedDelivery
        Date actualDelivery
    }

    %% Relationships
    USER ||--|| PREFERENCES : "embeds"
    USER ||--o| SUBSCRIPTION : "embeds"
    USER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_ITEM : "contains"
    ORDER_ITEM }o--|| SNACK : "references"
    ORDER }o--|| SUBSCRIPTION_PLAN : "based on"
    ORDER ||--o| DELIVERY : "has"
```

---

## Entity Descriptions

### Currently Implemented (in codebase)

| Entity | Storage | Description |
|--------|---------|-------------|
| **USER** | MongoDB Collection | Core user document with auth credentials and role |
| **PREFERENCES** | Embedded in USER | User's snack taste preferences, allergies, and box size |
| **SUBSCRIPTION** | Embedded in USER | Active subscription status, plan type, and delivery dates |

### Planned / Implied by UI (future scope)

| Entity | Storage | Description |
|--------|---------|-------------|
| **SNACK** | MongoDB Collection | Individual snack products (currently static data in frontend) |
| **SUBSCRIPTION_PLAN** | MongoDB Collection | Plan tiers with pricing and features (currently static in PlansPage) |
| **ORDER** | MongoDB Collection | Monthly auto-generated orders tied to subscriptions |
| **ORDER_ITEM** | MongoDB Collection | Line items within an order linking to specific snacks |
| **DELIVERY** | MongoDB Collection | Shipping and tracking info for each order |

---

## Relationship Summary

| Relationship | Cardinality | Type | Notes |
|-------------|-------------|------|-------|
| USER → PREFERENCES | 1 : 1 | Embedded | Stored as sub-document within User |
| USER → SUBSCRIPTION | 1 : 0..1 | Embedded | Optional; null if not subscribed |
| USER → ORDER | 1 : 0..* | Reference | User can have many orders |
| ORDER → ORDER_ITEM | 1 : 1..* | Reference | Each order has multiple snack items |
| ORDER_ITEM → SNACK | * : 1 | Reference | Each item references a snack product |
| ORDER → SUBSCRIPTION_PLAN | * : 1 | Reference | Order generated based on a plan |
| ORDER → DELIVERY | 1 : 0..1 | Reference | Each order has one delivery record |

---

## Schema Notes

> [!NOTE]
> The **USER**, **PREFERENCES**, and **SUBSCRIPTION** entities are fully implemented in the Mongoose schema at `server/src/models/User.js`. The remaining entities (SNACK, SUBSCRIPTION_PLAN, ORDER, ORDER_ITEM, DELIVERY) are implied by the frontend UI and the `Idea.md` feature specification, and are shown here for a complete ER picture.
