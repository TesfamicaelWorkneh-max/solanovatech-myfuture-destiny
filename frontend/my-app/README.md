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
git clone https://github.com/TesfamicaelWorkneh-max/solanovatech-myfuture-destiny.git
cd frontend/my-app
```

## run dev server

npm run dev
Open http://localhost:3000
to see the app

### Challenges & Personal Journey

This project was built under very challenging circumstances, which makes it especially meaningful to me.

Due to limited resources, I worked on this project with unstable internet access, frequent connectivity outages, and no paid workspaces or premium tools. Many development sessions were interrupted by power cuts or network failures, forcing me to repeatedly reconfigure environments, reinstall dependencies, and debug issues without online references.

Despite these constraints, I stayed committed to completing the project end-to-end:

Designing a real-world backend API

Implementing authentication and role-based authorization

Building a modern Next.js frontend

Writing clean documentation and API specs

Deploying and testing the backend independently

Every feature in this project represents persistence, self-discipline, and a strong desire to grow as a software engineer—even when conditions were far from ideal.

This experience strengthened my problem-solving skills, patience, and ability to work independently under pressure. It reflects not only my technical abilities, but also my work ethic and resilience.

I am actively seeking an internship opportunity not just to gain experience, but to grow under real mentorship, contribute meaningfully, and finally work in a stable professional environment.

An internship would allow me to:

Learn best practices from experienced engineers

Improve deployment, testing, and scaling skills

Focus fully on building value without constant resource limitations

I am deeply motivated, highly adaptable, and ready to put in the work.
This project reflects how I handle challenges: I don’t quit — I adapt and continue building.
