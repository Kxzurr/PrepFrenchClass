# Dynamic Course Management System - Setup Guide

## Overview

This is a fully dynamic, database-driven course management system with:
- **Backend**: Next.js API Routes + PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js with JWT and OAuth support
- **Admin Panel**: Full CRUD operations for courses, categories, and more
- **Frontend**: Dynamic course pages with SEO optimization
- **API Integration**: RESTful API endpoints for all operations

---

## Prerequisites

- Node.js 18.0+ 
- PostgreSQL 12+
- npm or yarn package manager

---

## 1. Database Setup

### PostgreSQL Installation

**Windows:**
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database for the project
CREATE DATABASE prepfrench;

# Create a user for the app
CREATE USER prepfrench_user WITH PASSWORD 'your_secure_password';

# Grant privileges
ALTER ROLE prepfrench_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE prepfrench TO prepfrench_user;

# Exit
\q
```

---

## 2. Environment Variables Setup

Create a `.env.local` file in the project root:

```env
# Database Configuration
DATABASE_URL="postgresql://prepfrench_user:your_secure_password@localhost:5432/prepfrench?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-a-random-secret-key-here"  # Use: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# Public API URL
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Generate NextAuth Secret:

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Maximum 10000000000000).ToString()))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

---

## 3. Initialize Database with Prisma

### Generate Prisma Client

```bash
npm run db:generate
```

### Run Migrations

```bash
npm run db:migrate:dev
```

This will:
1. Create all database tables
2. Set up relationships
3. Create initial indexes

### Seed Database (Optional)

```bash
npm run db:seed
```

---

## 4. Create Admin User

Run the following command to create an admin user:

```bash
npm run create-admin
```

Follow the prompts to enter:
- Email
- Password
- Name

Or manually insert using Prisma Studio:

```bash
npm run db:studio
```

Then navigate to the Users table and:
1. Create a new user
2. Set the `role` field to `ADMIN`
3. Hash the password using bcrypt (use an online tool or node script)

---

## 5. Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/       # Authentication routes
│   │   ├── courses/                   # Public course API
│   │   │   ├── route.ts              # Get all courses
│   │   │   └── [slug]/route.ts       # Get single course by slug
│   │   ├── categories/                # Public categories API
│   │   └── admin/                     # Admin-only routes
│   │       ├── courses/               # Course management
│   │       └── categories/            # Category management
│   ├── auth/
│   │   ├── signin/page.tsx           # Sign in page
│   │   └── error/page.tsx            # Auth error page
│   ├── admin/                         # Admin dashboard
│   │   ├── layout.tsx                # Admin layout
│   │   ├── page.tsx                  # Dashboard
│   │   ├── courses/                  # Course management pages
│   │   ├── categories/               # Category management pages
│   │   ├── instructors/              # Instructor management
│   │   └── students/                 # Student management
│   └── (Courses)/
│       └── course/
│           └── [slug]/page.tsx       # Dynamic course page
├── components/
│   ├── Courses/Overview/             # Course detail component
│   └── ... (other components)
├── lib/
│   ├── prisma.ts                     # Prisma client
│   ├── auth.ts                       # NextAuth configuration
│   └── api.ts                        # API utility functions
└── types/                            # TypeScript type definitions

prisma/
└── schema.prisma                      # Database schema

.env.local                             # Environment variables (not committed)
```

---

## 6. Available Scripts

```bash
# Development
npm run dev                            # Start dev server on localhost:3000

# Building
npm run build                          # Build for production
npm start                              # Start production server

# Database
npm run db:generate                    # Generate Prisma client
npm run db:migrate:dev                 # Create and run migrations
npm run db:migrate:deploy              # Deploy migrations to production
npm run db:studio                      # Open Prisma Studio (DB GUI)
npm run db:seed                        # Seed database with sample data

# Linting
npm run lint                           # Run ESLint

# Admin User
npm run create-admin                   # Create new admin user
```

---

## 7. API Documentation

### Public API Endpoints

#### Get All Courses
```
GET /api/courses?page=1&limit=12&categoryId=xyz&search=query&level=BEGINNER&featured=true&sortBy=createdAt&order=desc

Response:
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "totalCourses": 50,
    "totalPages": 5
  }
}
```

#### Get Single Course by Slug
```
GET /api/courses/course-slug

Response:
{
  "success": true,
  "data": {
    "id": "...",
    "title": "...",
    "slug": "...",
    "description": "...",
    "image": "...",
    "rating": 4.5,
    "category": {},
    "instructor": {},
    "pricing": {},
    "lessons": [],
    "reviews": [],
    "seo": {},
    "_count": {}
  }
}
```

#### Get All Categories
```
GET /api/categories

Response:
{
  "success": true,
  "data": [...]
}
```

### Admin API Endpoints (Requires Authentication)

#### Get All Courses (Admin)
```
GET /api/admin/courses?page=1&limit=10&status=PUBLISHED
```

#### Create Course
```
POST /api/admin/courses

Body:
{
  "title": "...",
  "slug": "...",
  "description": "...",
  "shortDescription": "...",
  "image": "...",
  "categoryId": "...",
  "instructorId": "...",
  "level": "BEGINNER",
  "language": "English",
  "duration": 12,
  "lessonsCount": 45,
  "pricing": {
    "originalPrice": 99.99,
    "discountedPrice": 49.99,
    "discountPercentage": 50,
    "currency": "USD"
  },
  "seo": {
    "metaTitle": "...",
    "metaDescription": "...",
    "metaKeywords": "...",
    "ogImage": "...",
    "ogTitle": "...",
    "ogDescription": "..."
  }
}
```

#### Update Course
```
PUT /api/admin/courses/:id

Body: (same as create, but all fields optional)
```

#### Delete Course
```
DELETE /api/admin/courses/:id
```

#### Get/Create/Update/Delete Categories
```
GET /api/admin/categories
POST /api/admin/categories
PUT /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

---

## 8. Frontend Integration

### Using API in Components

```typescript
import { courseApi, categoryApi } from '@/src/lib/api';

// Get all courses
const { success, data: courses } = await courseApi.getAllCourses({
    page: 1,
    limit: 12,
    categoryId: 'xyz',
    search: 'french',
});

// Get single course
const { success, data: course } = await courseApi.getCourseBySlug('course-slug');

// Get categories
const { success, data: categories } = await categoryApi.getAllCategories();
```

### Dynamic Course Pages

Course pages are automatically generated with:
- Dynamic routing: `/course/[slug]`
- SEO metadata (meta title, description, OG tags)
- Server-side data fetching with caching (1 hour)
- Mobile-optimized responsive design

---

## 9. Authentication

### Sign In

Navigate to `/auth/signin` to:
- Sign in with email/password
- Sign in with Google
- Sign in with GitHub

### Admin Access

AdminPanel is at `/admin` and requires:
- Active session (JWT)
- User role = `ADMIN`

---

## 10. Database Models

### Users
- Authentication support (local + OAuth)
- Roles: STUDENT, INSTRUCTOR, ADMIN
- Email verification
- Avatar support

### Courses
- Full course information
- Dynamic pricing with discounts
- SEO metadata
- Status management (DRAFT, PUBLISHED, ARCHIVED)
- Featured courses support

### Categories
- Course organization
- Course count tracking
- Unique slugs for URLs

### Instructors
- User association
- Bio, avatar, expertise
- Verification status
- Social links (LinkedIn, Twitter, etc.)

### Course Lessons
- Organized by course
- Video support
- Duration tracking
- Publishing control

### Course Reviews
- 5-star rating system
- Student feedback
- Helpful count tracking

---

## 11. Production Deployment

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:password@production-host:5432/dbname"
NEXTAUTH_SECRET="strong-random-secret"
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### Build and Deploy
```bash
npm run build
npm start
```

### Database Migration in Production
```bash
npm run db:migrate:deploy
```

---

## 12. Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database and user exist

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### 404 on Course Pages
- Verify database has courses with published status
- Check slug matches course slug in database
- Verify API is responding correctly

### Permission Denied on Admin Pages
- Check user role is set to ADMIN in database
- Verify session is active
- Check browser console for errors

---

## 13. Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 14. Security Recommendations

✅ Change `NEXTAUTH_SECRET` for production
✅ Use HTTPS for production deployment
✅ Set strong database passwords
✅ Regular database backups
✅ Use environment variables for sensitive data
✅ Implement rate limiting for APIs
✅ Validate all user inputs
✅ Use CSRF protection
✅ Keep dependencies updated

---

Generated: 2026-02-12
Version: 1.0.0
