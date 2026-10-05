# React Error Modal

A class-component exercise demonstrating a modal and an error boundary.

## Run locally

```sh
npm install
npm run dev
```

Select **Show error modal** to ask the boundary to display a simulated error.
Close the modal with its button, click the shaded backdrop, or press Escape.
The boundary also implements `getDerivedStateFromError` and
`componentDidCatch` for errors thrown while rendering its child tree.

Run `npm run build` to create a production build, or `npm run lint` to run
Oxlint.
