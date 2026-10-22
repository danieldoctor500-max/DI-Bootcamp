# StoryWeave

A collaborative storytelling app built as a small full-stack monorepo. The API uses Express and PostgreSQL; the responsive React client uses TypeScript and Redux Toolkit. Access tokens stay in Redux memory, while rotating refresh tokens are stored in HttpOnly cookies.

## Project layout

- `backend/` — Express API, PostgreSQL schema, routes, controllers, models, and helpers.
- `frontend/` — React, TypeScript, Vite, and Redux Toolkit client.
- `types/` — shared TypeScript models.

## Requirements

- Node.js 20.19+ or 22.12+
- PostgreSQL 14+

## Configure and run

1. Create a PostgreSQL database, then run `backend/src/db/schema.sql` against it.
2. Copy `backend/.env.example` to `backend/.env`. Set `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, and `CLIENT_ORIGIN`. Use different, random secrets of at least 32 characters. For example, generate each secret separately with `node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"`.
3. In one terminal, run:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

4. In another terminal, run:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

The API listens on `http://localhost:3000`, and Vite serves the client on `http://localhost:5173`. The client proxies `/api` requests to the local API. Use `npm test` in `backend` for validation tests and `npm run build` in `frontend` for a production build.

## API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/stories`, `POST /api/stories`, `PATCH /api/stories/:id`, `DELETE /api/stories/:id`
- `GET /api/stories/:id/comments`, `POST /api/stories/:id/comments`
- `POST /api/contributors`, `GET /api/contributors/:story_id`, `DELETE /api/contributors/:id`
- `GET /api/users?email=...` — look up a collaborator by exact email
- `GET /api/health`

All protected endpoints require `Authorization: Bearer <access token>`. Story authors and contributors can edit a story; only its author can delete it or manage contributors. Authenticated users can browse stories and comment on them; contributor controls are author-only. SQL queries are parameterized, and cookie-based auth endpoints reject requests from unconfigured browser origins.

## Deployment

Deploy `backend` as a Node web service and `frontend` as a static site. Set the backend start command to `npm start`, configure its database and secrets, and set `CLIENT_ORIGIN` to the deployed frontend origin. Build the frontend with `npm run build` and publish `dist`. Set `VITE_API_URL` to the deployed backend URL when building the frontend. Production refresh cookies require HTTPS.

## Notes

The token is intentionally held only in Redux memory. Reloading the page uses the HttpOnly refresh cookie to obtain another access token. The refresh token is stored server-side as a SHA-256 hash and rotated on use. Database setup is explicit; no credentials are checked into the repository. Real-time co-editing, revision history, and profile customization are future extensions; story edits are currently saved as a single current version.
