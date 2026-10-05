# Travel Form Challenge

A React form challenge demonstrating class-component state, controlled inputs,
props, checkbox handling, and a live preview of entered data.

## Run locally

```sh
npm install
npm run dev
```

Submit the form to send its values as GET query parameters. For example, using
John Doe, age 25, male, Japan, and selecting lactose-free produces:

```text
/?firstName=John&lastName=Doe&age=25&gender=male&destination=Japan&lactoseFree=on
```

Run `npm run build` to create a production build, or `npm run lint` to run
Oxlint.
