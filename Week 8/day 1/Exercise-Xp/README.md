# React Lifecycle & Error Boundaries

A single React app for the Week 8 Day 1 exercises on error boundaries, class
component update lifecycles, and unmounting.

## Run locally

```sh
npm install
npm run dev
```

## Exercises

- **Error boundary simulation:** Choose shared, separate, or no error boundaries.
  Click a counter five times to trigger the `I crashed!` render error. The
  unprotected simulation intentionally clears the React tree; refresh the page
  to restore the app.
- **Updating lifecycle:** The favorite color starts red, changes to yellow
  after mounting, and can be changed to blue. Check the browser console for
  `getSnapshotBeforeUpdate` and `componentDidUpdate`.
- **Unmounting lifecycle:** Delete the child to run `componentWillUnmount` and
  display its unmount alert.

Run `npm run build` to verify a production build, or `npm run lint` to run
Oxlint.
