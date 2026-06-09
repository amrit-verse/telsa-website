<div align="center">
  <img src="https://via.placeholder.com/150x150/000000/FFFFFF/?text=TeLSA+Logo" alt="TeLSA Logo" width="120" height="120" />
  
  # Terai Law Students Association (TeLSA) Platform

  **The Official Web and Management Platform for TeLSA**

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma" alt="Prisma" /></a>
  </p>
</div>

---

## 📖 Overview

The **TeLSA Website** is the official digital hub and organizational management platform for the Terai Law Students Association (TeLSA). Founded in 2080 B.S. at Prithvi Narayan Campus, Pokhara, Nepal, TeLSA represents and supports Terai-origin law students. This platform is built to provide an institutional online presence, facilitate member management, highlight ongoing activities, and streamline the administrative workflows of the executive committee.

## ✨ Key Features

- **Dynamic Content Management:** Easily update events, publications, and gallery images.
- **Member Directory:** Browse verified members, alumni, and executive committee profiles.
- **Robust Authentication:** Secure access control via Auth.js v5 for administrative tasks.
- **Media Optimization:** Cloudinary integration for fast, reliable image hosting.
- **Responsive & Accessible Design:** A beautifully styled, fully responsive UI built on Tailwind CSS v4 and Shadcn components.
- **Type-Safe Database Access:** PostgreSQL schema management using Prisma ORM.

## 🛠 Tech Stack

Our platform leverages a modern, cutting-edge web stack for maximal performance and developer experience:

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Auth.js v5](https://authjs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Validation:** [Zod](https://zod.dev/) & React Hook Form
- **Media Hosting:** [Cloudinary](https://cloudinary.com/)

## 📂 Project Structure

```text
website/
├── app/                  # Next.js App Router endpoints and layouts
├── components/           # Reusable UI components (Base UI, Shadcn, custom layouts)
├── lib/                  # Core utilities, Auth.js config, Server Actions, and validations
├── prisma/               # Prisma schema and database migrations
├── public/               # Static assets
└── types/                # Global TypeScript declarations
```

## 🚀 Local Development Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Node.js** (v20+ recommended)
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (local or hosted)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/telsa/website.git
   cd website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Duplicate the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Fill in your configuration details (see the Environment Variables section below).*

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Environment Variables

The project requires the following environment variables to function correctly. 

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/telsa_db` |
| `AUTH_SECRET` | Secret string for Auth.js sessions | `generated-via-openssl` |
| `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret | `your_api_secret` |

## 🗄 Database Setup

The project uses Prisma to interact with a PostgreSQL database.

1. Ensure your PostgreSQL service is running.
2. Update the `DATABASE_URL` in your `.env` file.
3. Run `npx prisma studio` to open a visual database editor on `localhost:5555`.

## 🛡 Authentication Overview

Authentication is handled securely via **Auth.js v5**. It utilizes session-based authentication to verify user roles (e.g., standard users vs. administrators). Administrative routes and API actions validate the active session server-side before processing requests or mutating database records.

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). 

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Ensure all environment variables from `.env` are configured in the Vercel dashboard.
4. Deploy. Vercel automatically detects the Next.js framework and runs `npm run build`.

## 📸 Screenshots

| Homepage Overview | Administrative Dashboard |
| :---: | :---: |
| ![Homepage](https://via.placeholder.com/600x400/1e293b/ffffff?text=Homepage+Overview) | ![Dashboard](https://via.placeholder.com/600x400/1e293b/ffffff?text=Admin+Dashboard) |
| *Clean, professional landing page showcasing TeLSA.* | *Secure dashboard for managing members and events.* |

## 🤝 Contribution Guidelines

We welcome contributions from developers and law students alike! To contribute:

1. **Fork** the repository.
2. **Create** a new branch (`git checkout -b feature/amazing-feature`).
3. **Commit** your changes (`git commit -m 'Add amazing feature'`).
4. **Push** to the branch (`git push origin feature/amazing-feature`).
5. **Open** a Pull Request against the `main` branch.

Please ensure your code passes linting (`npm run lint`) and builds successfully before submitting a PR.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Maintainers

- **Terai Law Students Association (TeLSA)** – Executive Committee
- **Technical Contact:** [asktelsa@gmail.com](mailto:asktelsa@gmail.com)

For major feature requests or organizational inquiries, please open an issue or contact the administration directly.
