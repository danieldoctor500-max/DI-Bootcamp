# Error Boundaries in React

A React app demonstrating a rendering error caught by nested error boundaries,
an event-handler error that error boundaries do not catch, and an image request
in a separate column that stays available when the right column fails.

## Run locally

```sh
npm install
npm run dev
```

## Try the demo

- Select **Get images** to load two photos from the Picsum API.
- Select **Replace string with object** to trigger a React rendering error.
  The paragraph-level boundary shows the fallback and component stack, while
  the rest of the right column and the image column stay rendered.
- Select **Invoke event handler** and check the browser console. Error
  boundaries do not catch errors thrown by event handlers.

Run `npm run build` to create a production build, or `npm run lint` to run
Oxlint.
