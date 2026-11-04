# Rakan API

Express (JavaScript, functions only) + Prisma + Supabase (Postgres database and image storage).

## Set up
1. In Supabase, create a project. Then go to Storage and create a **public** bucket named `rakan`.
2. `cp .env.example .env` and fill it in (database URLs, Supabase URL and service role key, admin login, JWT secret).
3. `npm install`
4. `npm run db:push` creates the tables. `npm run db:seed` adds the six categories.
5. `npm run dev` starts the API on http://localhost:4000

## Folder layout
Each feature has its own folder in `src/modules` with four files:

| File | Job |
|---|---|
| `*.routes.js` | which URL calls which controller, and who may call it |
| `*.controller.js` | reads the request, validates it, sends the reply |
| `*.service.js` | the real work: database and storage |
| `*.validation.js` | the rules for the data we accept |

Shared code: `src/lib` (database, storage, helpers), `src/middlewares`, `src/config/env.js`.

## Endpoints
| Method | URL | Who |
|---|---|---|
| POST | `/api/auth/login` | anyone |
| GET | `/api/categories`, `/api/categories/:id` | anyone |
| POST, PUT, DELETE | `/api/categories`, `/api/categories/:id` | admin |
| GET | `/api/products?category=&q=&sort=`, `/api/products/:id` | anyone |
| POST, PUT, DELETE | `/api/products`, `/api/products/:id` | admin |

Create and update accept `multipart/form-data` (so an `image` file can be sent) or JSON.
Admin requests need the header `Authorization: Bearer <token>` from the login reply.

## Adding a new feature
Copy a module folder, rename the files, then mount the routes in `src/app.js`.
