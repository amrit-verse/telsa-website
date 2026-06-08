# TeLSA Information Architecture & Requirements

## Core Requirements
- Professional legal organization appearance
- Mobile-first responsive design
- Modern and premium UI
- Excellent SEO
- Accessibility compliant
- Easy content management
- Long-term maintainability
- Production-ready architecture

## Technology Stack
- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Server Actions, Route Handlers
- **Database:** PostgreSQL, Prisma ORM
- **Storage:** Cloudinary
- **Authentication:** Auth.js
- **Deployment:** Vercel

## UI Component Architecture
Using Atomic Design principles combined with Server & Client components:
- `Button`, `Card`, `Form`, `Input`, `Select`, `Table`, `Dialog`, `Toast`, `DropdownMenu`, `Avatar`, `Badge`, `Tabs`

## Workflows
1. **Membership:** GUEST -> Submits Application -> PENDING -> Admin Reviews -> ACTIVE
2. **Events:** Admin Drafts -> Uploads Poster -> Publishes
3. **Publications:** Admin Drafts -> Uploads File -> Sets Visibility -> Publishes
