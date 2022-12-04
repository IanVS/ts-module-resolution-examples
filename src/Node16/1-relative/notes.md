- Show package.json and tsconfig.json files


CJS

- Show the file, explain why it's cjs

- Build with `npm run build-cjs`

- Everything's fine, view output types.


ESM

- Open example-esm.mts, point out extension is `.mjs`

- build again with `npm run build-esm`, no error, has type


Extensionless

- VSCode does not complain about missing extension (!?)

- Run `npm run build-extensionless

- Build finishes, but does complain about extension, no type in .d.mts

- Delete `target.ts`

- VSCode starts to complain about file not found, so it was somehow using the old module resolution rules
