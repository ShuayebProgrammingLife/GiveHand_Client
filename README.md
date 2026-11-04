# GiveHand Client

GiveHand is a community event platform for creating, discovering, and joining
charitable activities. The client focuses on community drives such as blanket
distribution, education support, food distribution, health camps, tree
plantation, cleanup events, and donations.

**Live site:** https://givehand-flax.vercel.app

## Features

- Email/password and Google authentication through Better Auth
- JWT-based authenticated API requests
- Protected user routes with safe post-login redirects
- Browse upcoming events with database-backed category filters
- Search events and sort them by date
- View complete event details
- Create and edit events with validation and future-date checks
- Join or cancel participation in an event
- Manage created events and delete them with confirmation
- View joined events sorted by date
- Loading skeletons, error states, toast notifications, and light/dark themes
- Responsive interface built with shadcn/ui and Tailwind CSS

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Base UI
- Better Auth with MongoDB and JWT plugin
- MongoDB
- Vercel deployment

## Pages

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home page, recent events, gallery, and call-to-action sections |
| `/events` | Public | Search, filter, and browse upcoming events |
| `/events/[id]` | Public | View event details and join availability |
| `/login` | Public | Sign in with email/password or Google |
| `/register` | Public | Create an account |
| `/create-event` | Protected | Create a new community event |
| `/manage-events` | Protected | View, edit, and delete created events |
| `/manage-events/[id]/edit` | Protected | Update an existing event |
| `/joined-events` | Protected | View and cancel joined events |

## Prerequisites

- Node.js 20 or later
- npm
- A running MongoDB database
- A separate GiveHand API server

## Local Setup

1. Clone and enter the client repository:

   ```bash
   git clone https://github.com/ShuayebProgrammingLife/GiveHand_Client.git
   cd GiveHand_Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` in the project root:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/givehand
   BETTER_AUTH_SECRET=replace-with-a-long-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3005
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

   `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and
   `NEXT_PUBLIC_API_URL` are required for the local app. Google login is enabled
   only when both Google variables are set.

4. Start the GiveHand API on port `3005`.

5. Start the client:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string used by Better Auth |
| `BETTER_AUTH_SECRET` | Yes | Secret used to sign and encrypt authentication data |
| `BETTER_AUTH_URL` | Yes | Public URL of the Next.js authentication server |
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the Express API, such as `http://localhost:3005` |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npx tsc --noEmit` | Run TypeScript checking |

## Project Structure

```text
src/
  app/                  Next.js pages and API auth route
  components/           Shared UI and home page components
  components/ui/        shadcn/Base UI primitives
  lib/                  Auth, API, validation, formatting, and shared types
public/                 Static images and event gallery assets
```

Important integration points:

- `src/lib/api.ts` sends all Express API requests through `apiFetch` or
  `publicFetch`.
- `src/lib/auth.ts` configures Better Auth, MongoDB, and JWT support.
- `src/lib/auth-client.ts` provides the browser authentication client.
- `src/proxy.ts` protects `/create-event`, `/manage-events`, and `/joined-events`.
- `src/app/api/auth/[...all]/route.ts` exposes the Better Auth API handlers.

## Backend API

The client expects a separate Express/MongoDB server. Set
`NEXT_PUBLIC_API_URL` to the server base URL; do not append an API path unless
the backend route definitions include it.

Typical API responsibilities include authentication, event CRUD operations,
event categories, participant joins, user-created events, and joined-event
records.

## Production

Configure the environment variables in your hosting provider and use the same
values for the client deployment that are used by its authentication and API
services.

```bash
npm run build
npm start
```

For Vercel deployments, set production values for `BETTER_AUTH_URL` and
`NEXT_PUBLIC_API_URL`, and add the Google OAuth callback settings when Google
login is enabled.
