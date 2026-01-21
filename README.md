# PropertyHub - Frontend

A modern property listing platform built with Next.js, JavaScript, and Tailwind CSS.

## Features

. Server-Side Rendering: Public property listings and detail pages  
. Client-Side Rendering: User dashboards with protected routes  
. Authentication: JWT-based auth with persistent login  
. Role-Based Access: Three user roles (User, Owner, Admin)  
. Image Upload: Cloudinary integration with validation  
. Optimistic UI
. State Management: Zustand
. Responsive Design: Mobile-first approach

## Tech Stack

. Framework: Next.js 14 with App Router  
. Language: JavaScript  
. Styling: Tailwind CSS  
. State Management: Zustand  
. HTTP Client: Axios  
. Forms: React Hook Form + Zod validation  
. Icons: Lucide React  
. Notifications: React Hot Toast

## Pages

### Public Pages

. `/` - Home page with property listings (SSR)  
. `/properties` - Property listings with filters (SSR)  
. `/properties/[id]` - Property detail page (SSR)  
. `/login` - Authentication page  
. `/register` - Registration page

### Protected Pages

. `/dashboard/user` - User dashboard (favorites, profile)  
. `/dashboard/owner` - Owner dashboard (property management)  
. `/dashboard/admin` - Admin dashboard (system metrics)  
. `/properties/create` - Create new property

## enviroments variable

NEXT_PUBLIC_API_URL=backend_api_url
NEXT_PUBLIC_APP_URL=frontend_url

## Getting Started

1. Clone the repository

```bash
git clone <your-repo-url>
cd frontend/my-app
```

## run dev server

npm run dev
Open http://localhost:3000
to see the app
