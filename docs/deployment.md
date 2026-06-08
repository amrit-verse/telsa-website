# TeLSA Deployment & Security Architecture

## Deployment Strategy
- **Hosting:** Vercel (Optimized for Next.js 15, edge caching, serverless functions).
- **Database:** PostgreSQL.
- **Storage:** Cloudinary for robust image and PDF hosting (generous free tier, automatic optimization).
- **CI/CD:** Vercel GitHub integration for automatic preview deployments on pull requests and production deployments on `main` branch merges.

## Security Strategy
- **Authentication:** `Auth.js` (NextAuth) for secure credential management and session handling.
- **Passwords:** Hashed securely using `bcrypt` before storage.
- **Validation:** `Zod` schemas for rigorous input validation on all forms and Server Actions.
- **Authorization:** Middleware checks on `/dashboard` routes to ensure `MEMBER` or `ADMIN` roles before page rendering.
- **Data Safety:** Prisma prevents SQL injection natively.
