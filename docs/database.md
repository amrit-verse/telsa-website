# TeLSA Database Architecture

## ER Diagram

```mermaid
erDiagram
    USER ||--o{ ACCOUNT : has
    USER ||--o{ SESSION : has
    USER ||--o| MEMBERSHIP : "applies for"
    USER ||--o| EXECUTIVE_COMMITTEE : "serves as"

    USER {
        String id PK
        String email UK
        String passwordHash
        String name
        String phone
        String district
        String category
        Role role
    }

    MEMBERSHIP {
        String id PK
        String userId FK
        MembershipType type
        MembershipStatus status
        DateTime joinedDate
        DateTime expiryDate
        String paymentProofUrl
    }

    EXECUTIVE_COMMITTEE {
        String id PK
        String userId FK
        String position
        Int priorityOrder
        DateTime termStart
        DateTime termEnd
    }

    EVENT {
        String id PK
        String title
        String slug UK
        EventCategory category
        String description
        DateTime date
        String location
        String imageUrl
    }

    PUBLICATION {
        String id PK
        String title
        String slug UK
        String type
        String author
        String fileUrl
        Boolean isPublic
    }
```

## Prisma Schema Details
(Please refer to the `prisma/schema.prisma` file for the exact models used by the application, including the Auth.js integration).
