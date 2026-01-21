# Solanova Tech Backend API

This is the backend API for a property listing platform, built using Node.js, Express, and MongoDB. It provides authentication, role-based authorization, property management, admin operations, image uploads, and system metrics.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer and Cloudinary for image uploads
- Helmet for security headers
- CORS for cross-origin support

## Project Structure

backend/
├── src/
│ ├── app.js
│ ├── Server.js
│ ├── config/
│ │ ├── db.js
│ │ └── env.js
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── createAdmin.js
├── README.md
├── .env
└── package.json

## Environment Variables

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb_uri
JWT_SECRET=jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret

## Running the Server

Install dependencies:

npm install

Start the server:

node src/Server.js

The API will run on [http://localhost:5000](http://localhost:5000).

## Authentication and Authorization

- JWT-based authentication
- Role-based access: user, owner, admin
- Middleware: protect to verify JWT, authorize to restrict access by role

## API Routes Overview

### Auth Routes (/api/auth)

- POST /register - Register user
- POST /login - Login user
- GET /me - Get current user
- GET /logout - Logout user

### Property Routes (/api/properties)

- GET / - Get all properties
- GET /search - Search properties
- GET /:id - Get property by ID
- POST / - Create property (owner only)
- PUT /:id - Update property
- DELETE /:id - Delete property
- PUT /:id/publish - Publish property
- PUT /:id/archive - Archive property
- PUT /:id/draft - Revert property to draft
- GET /my/properties - Get owner properties
- POST /:id/favorite - Add property to favorites
- DELETE /:id/favorite - Remove property from favorites
- GET /favorites/my - Get all favorites
- GET /stats/dashboard - Property stats

### Admin Routes (/api/admin)

(All routes require admin role)

- GET /properties - Manage properties
- PUT /properties/:id/archive - Archive property
- GET /users - Manage users
- PUT /users/:id/toggle-status - Enable or disable user
- GET /metrics - Get system metrics

## Image Uploads

- Handled using Multer and Cloudinary
- Supports up to 10 images per property
- Accepted formats: jpg, jpeg, png, gif, webp
- Fallback to memory storage if Cloudinary is not configured

## Utility Scripts

### Create Admin User

node src/createAdmin.js

Creates an initial admin user.

## Error Handling

Centralized error handling includes:

- Invalid ObjectId
- Duplicate key errors
- Validation errors
- JWT errors

All errors return a consistent JSON response.

## Why Express instead of NestJS?

Express was chosen over NestJS for this project because:

- It is lightweight and flexible
- Easier to debug and customize
- Faster development for small to medium projects
- No enforced abstractions, making learning core backend concepts easier

## Status

Backend development is complete.

## Author

Solanova Tech Backend
