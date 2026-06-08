# TeLSA Complete Sitemap & Routes

## Public Sitemap
```text
/ (Home)
├── /about
│   ├── /about/executive-committee
│   └── /about/mission-and-vision
├── /events
│   └── /events/[slug]
├── /publications
│   └── /publications/[slug]
├── /contact
├── /join
└── /login
```

## Protected Routes & Roles

| Route | Type | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/dashboard/member/profile` | Protected | MEMBER/ADMIN | View status, digital ID, renew membership |
| `/dashboard/admin/members` | Protected | ADMIN | Verify/Approve membership applications |
| `/dashboard/admin/events` | Protected | ADMIN | CRUD for Events |
| `/dashboard/admin/publications` | Protected | ADMIN | CRUD for Publications |
