# StoryWeave — Advanced

An advanced collaborative storytelling monorepo. The Express/PostgreSQL API and the React/TypeScript/Redux Toolkit client include comments and reactions, JWT-authenticated WebSocket collaboration, version history, profile/avatar uploads, and public share links.

## Project layout

- `backend/` — API, database schema, routes, authorization, Cloudinary integration, and Socket.IO.
- `frontend/` — responsive React/Vite application, Redux slices, and Socket.IO client.
- `types/` — shared TypeScript models.

## Requirements and setup

- Node.js 20.19+ or 22.12+
- PostgreSQL 14+

1. Create a PostgreSQL database and run `backend/src/db/schema.sql`.
2. Copy `backend/.env.example` to `backend/.env`. Set `DATABASE_URL`, distinct random `JWT_SECRET` and `REFRESH_SECRET` values (each at least 32 characters), and `CLIENT_ORIGIN`. Generate secrets separately with `node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"`.
3. Optional avatar uploads require Cloudinary credentials in `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Set `PUBLIC_APP_ORIGIN` to the public frontend origin when deployed.
4. Start the API from `backend/` with `npm install` then `npm run dev`.
5. Start the frontend from `frontend/` with `npm install` then `npm run dev`.

The API runs on `http://localhost:3000`; Vite serves `http://localhost:5173` and proxies API and WebSocket traffic. Run `npm test` from `backend/` and `npm run build` from `frontend/`.

## Advanced API

- Comments: `POST /api/comments`, `GET /api/comments/:story_id`, `PATCH /api/comments/:id`, `DELETE /api/comments/:id`, `POST /api/comments/:id/reactions`
- Versions: `GET /api/versions/:storyId`, `POST /api/versions/:storyId/restore`
- Profiles and avatars: `GET /api/profile/me`, `POST /api/profile/me/avatar` (multipart field `avatar`; images up to 5 MB)
- Share links: `POST /api/stories/:storyId/share`, public `GET /api/share/:token`
- Stories: `PATCH /api/stories/:id` accepts `comments_enabled` for the author to toggle comments.

Socket.IO uses the access JWT in the handshake auth payload. Join a room with `story:join`, send cursor positions with `story:cursor`, and send live drafts with `story:edit`. Story edits re-check contributor membership; saving through the REST API records a version. WebSocket draft events broadcast live without adding a version for each keystroke.

Comment editing is restricted to its author; the comment author or story author can delete it. Reactions are persisted per user and optimistically updated in Redux with rollback on failure. Only story authors can view or restore versions. Share tokens are random, stored as hashes, and can be sent to X or Facebook from the story view. Avatar uploads return a clear configuration error until Cloudinary is configured.

All protected HTTP routes use `Authorization: Bearer <access token>`. Access tokens stay in Redux memory; refresh tokens are HttpOnly cookies. Use HTTPS in production. SQL uses parameters, credentials are not committed, and API errors avoid exposing internal details.

## Deployment

Deploy `backend/` as a Node web service (`npm start`) and `frontend/` as a static site (`npm run build`, publish `dist`). Configure `DATABASE_URL`, JWT secrets, Cloudinary credentials if desired, and `CLIENT_ORIGIN`/`PUBLIC_APP_ORIGIN`. Set frontend `VITE_API_URL` to the deployed API origin; configure the production API for HTTPS and WebSocket traffic. The frontend `_redirects` file keeps shared-story links on the client-side app route.
