# KrushiBot — Intelligent Web Interface with Secure Operator Authentication

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NileshSethi/krushibot)

## 🚀 Now Deployed on Vercel + Supabase!

This project has been migrated to a modern serverless architecture:
- ✅ **Database:** Supabase (PostgreSQL)
- ✅ **Hosting:** Vercel (Serverless)
- ✅ **Framework:** Next.js 14 (App Router)

**📖 Quick Start:** See [READY-FOR-VERCEL.md](./READY-FOR-VERCEL.md) for deployment instructions.

---

## Overview

KrushiBot is a full-stack web application designed to deliver a responsive, visually immersive interface combined with a secure and efficient authentication system. The platform integrates modern frontend rendering techniques with a robust backend architecture to ensure both performance and reliability.

The system emphasizes minimal latency, clean authentication flow, and structured scalability, making it suitable for real-world deployment scenarios.

---

## Core Features

### 1. Secure Operator Authentication

* Operator-based login system using **operator ID and password**
* Passwords securely hashed using **bcrypt**
* Stateless authentication via **JWT**
* Protected routes using middleware
* Automatic redirection for unauthorized access

---

### 2. User Lifecycle Management

* Dedicated **signup flow** for new users
* Persistent storage of user credentials in **Supabase (PostgreSQL)**
* Validation for duplicate users (operator ID / email)
* Seamless transition between signup and login

---

### 3. Performance-Oriented Architecture

* Optimized database queries using indexed fields
* Non-blocking asynchronous request handling
* Serverless API routes (Next.js)
* Clean separation of concerns

---

### 4. Interactive Frontend Experience

* Fullscreen responsive layout
* Integrated **3D model rendering using Three.js**
* Smooth scroll-based transitions
* Cursor-based interaction with 3D elements
* Minimal and focused UI design with Tailwind CSS

---

### 5. Modern Stack

* **Frontend:** React 18 + Next.js 14 (App Router)
* **UI:** Tailwind CSS + Radix UI components
* **Backend:** Next.js API Routes (Serverless)
* **Database:** Supabase (PostgreSQL)
* **Deployment:** Vercel
* **Security:** bcrypt + JWT + Row Level Security

---

## Technology Stack

### Frontend
* React 18
* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Three.js (3D rendering)
* Lucide Icons

### Backend
* Next.js API Routes (Serverless)
* Supabase Client

### Database
* Supabase (PostgreSQL)
* Row Level Security (RLS)

### Security
* bcrypt (password hashing)
* JSON Web Tokens (JWT)
* HTTP-only cookies
* Environment-based secrets

---

## Authentication Flow

```
New User
→ Signup (/signup)
→ Stored in Supabase
→ Auto-login + JWT
→ Redirect to Dashboard

Existing User
→ Login (/login)
→ Credentials Verified (Supabase)
→ JWT Generated
→ HTTP-only Cookie Set
→ Access Dashboard
```

---

## Project Structure

```
krushibot/
 ├── app/
 │    ├── api/auth/          # API routes (login, signup, logout)
 │    ├── login/             # Login page
 │    ├── signup/            # Signup page
 │    ├── dashboard/         # Protected dashboard
 │    ├── layout.tsx
 │    └── page.tsx
 │
 ├── components/
 │    └── ui/                # Reusable UI components
 │
 ├── lib/
 │    ├── db.ts              # Supabase client
 │    └── utils.ts
 │
 ├── public/                 # Static assets
 │
 ├── supabase-schema.sql     # Database schema
 ├── vercel.json             # Vercel configuration
 ├── .env.local              # Environment variables (not committed)
 ├── .env.example            # Environment template
 └── READY-FOR-VERCEL.md     # Deployment guide
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/NileshSethi/krushibot.git
cd krushibot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local` (copy from `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 4. Set Up Database

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the schema from `supabase-schema.sql`

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 6. Deploy to Vercel

See [READY-FOR-VERCEL.md](./READY-FOR-VERCEL.md) for complete deployment instructions.

**Quick Deploy:**
```bash
npm i -g vercel
vercel --prod
```

Or use the **Deploy with Vercel** button at the top of this README.

---

## Design Principles

* Deterministic authentication flow (no ambiguity in access control)
* Minimal latency and reduced blocking operations
* Serverless architecture for automatic scaling
* Security-first implementation with RLS
* Modern, type-safe codebase with TypeScript

---

## Migration Notes

This project was migrated from:
- ❌ Express.js → ✅ Next.js API Routes
- ❌ MySQL → ✅ Supabase (PostgreSQL)
- ❌ Traditional hosting → ✅ Vercel (Serverless)

See [MIGRATION-COMPLETE.md](./MIGRATION-COMPLETE.md) for details.

---

## Documentation

- 📘 [Deployment Guide](./READY-FOR-VERCEL.md)
- 📗 [Migration Details](./MIGRATION-COMPLETE.md)
- 📙 [Vercel Deployment](./VERCEL-DEPLOY.md)

---

## Future Enhancements

* ✅ Serverless deployment (Done!)
* ✅ Cloud database (Done!)
* Role-based access control (RBAC)
* Real-time features with Supabase subscriptions
* Email verification flow
* OTP-based 2FA
* API rate limiting
* Advanced monitoring and analytics

---

## Author

**Nilesh Sethi**  
BTech Computer Science Engineering

---

## License

This project is intended for academic and development purposes.
