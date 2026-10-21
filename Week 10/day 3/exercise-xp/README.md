# JWT Authentication Exercise

A small Express API demonstrating password hashing, short-lived access tokens, rotating refresh tokens, HttpOnly cookies, authenticated profile routes, logout revocation, and rate limiting.

## Run

```sh
npm install
```

Copy `.env.example` to `.env` and replace both JWT secrets with different random values of at least 32 characters. Generate a value with:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('base64url'))"
```

Run that command separately for each secret. Then start the API:

```sh
npm run dev
```

The server listens on `http://localhost:3000` by default. Run the integration tests with `npm test`.

## Routes

- `POST /api/auth/register` accepts `{ "email", "username", "password" }`, validates input, hashes the password with bcrypt, creates a user, and issues cookies.
- `POST /api/auth/login` accepts `{ "email", "password" }` and issues a new token pair.
- `POST /api/auth/refresh` rotates the refresh token and issues a new access token.
- `POST /api/auth/logout` revokes the current session and clears both cookies.
- `GET /api/profile` returns the authenticated user's public profile.
- `PATCH /api/profile` accepts `{ "username" }` to update the username.
- `GET /health` reports whether the server is running.

Access tokens expire after 15 minutes. Refresh tokens expire after 7 days and are stored server-side only as SHA-256 hashes. A replayed refresh token revokes all active sessions for that user. Authentication cookies are HttpOnly and SameSite=Strict; Secure is enabled in production.

## Exercise boundary

The user and refresh-session tables are in-memory Maps so the example runs without a database. They are lost on restart and are not suitable for production. Replace them with a persistent database, add email confirmation, and consider CSRF protection before using cookies across origins.
