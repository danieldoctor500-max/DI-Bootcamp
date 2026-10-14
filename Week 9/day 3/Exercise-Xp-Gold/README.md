# Daymark — Authentication

A client-side demo sign-in flow using React, Redux Toolkit, and React-Redux hooks.
It demonstrates authentication state only; it does not verify credentials with a
server or provide production authentication.

## Run locally

```sh
npm install
npm run dev
```

## Features

- Sign in with a display name, email, and any non-empty password.
- Store the display name and email in the Redux authentication state.
- Show authenticated content when signed in.
- Sign out and return to the login form.
