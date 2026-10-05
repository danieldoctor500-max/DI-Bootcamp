# React Compass Clock

A live analog and digital clock built with a React class component. The
component stores the year, month, weekday, day, hour, minute, and second in
state and refreshes them every second.

## Run locally

```sh
npm install
npm run dev
```

The clock uses the browser's local time. Its interval is cleared when the
component unmounts.

Run `npm run build` to create a production build, or `npm run lint` to run
Oxlint.
