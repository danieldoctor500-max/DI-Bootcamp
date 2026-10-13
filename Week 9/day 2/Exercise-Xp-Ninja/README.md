# Daymark — Authenticated Todo Lists

A React and Redux learning exercise with mock browser-local registration,
sign-in, sign-out, and per-user categorized todo lists.

## Run locally

```sh
npm install
npm run dev
```

## Demo behavior

- Create an account using a valid email and a password with at least 8
  characters, including a letter and a number.
- Sign in and manage todos in the Personal, Work, and Learning categories.
- Sign out and back in to see the account's saved lists.
- Account records and todos are stored in local browser storage. Passwords are
  stored as salted PBKDF2 hashes; the sign-in token is kept in session storage.

This is a frontend-only exercise, not production authentication. Browser storage
and client-generated tokens do not provide server-side identity verification
or authorization. Use a trusted backend and secure session mechanism for a real
application.
