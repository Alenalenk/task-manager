# Project Management App

A full-stack project management application built with Next.js, TypeScript, Prisma and PostgreSQL.

The application allows users to create projects, manage tasks
## Features

- User authentication
- Project creation and management
- Task management
- Comments
- Form validation
- Error handling
- Responsive UI

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Flowbite React

**Backend**
- Next.js Server Actions
- Prisma ORM
- PostgreSQL

**Authentication**
- JWT
- bcrypt

**Validation**
- Zod

## Architecture

The application uses the Next.js App Router and combines Server and Client Components.

Database access is handled through Prisma ORM. Project membership is represented by a many-to-many relationship between users and projects.

Authorization is implemented at the project level.

## Key Technical Decisions

### Server Actions

Data mutations such as creating and updating tasks are handled using Next.js Server Actions.

### Validation

User input is validated using Zod before data is processed or stored.

### Database

PostgreSQL is used as the primary database with Prisma providing type-safe database access.

## Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-secret-key"
```

## Running Locally

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run Prisma migrations
5. Start the development server

npm install <br>
npx prisma migrate dev <br>
npm run dev <br>