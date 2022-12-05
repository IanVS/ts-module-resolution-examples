- Show `pkg` folder

- Open package.json, note the `main` points to a .js file, `types` points to a .d.ts

- `npm run build`, show the resolution path, resulting `.d.ts` file

- Delete `types` from package.json, build again

- Show how the .js file is invalid, looks for `.js.ts` files, then strips `.js`, finds `.ts` file before `.d.ts`
