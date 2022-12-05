# TypeScript module resolution for index files

Node.js treats files named `index.js` specially, and allows requiring them by folder name alone,
so instead of `require("./subfolder/index")`, it's possible to use `require("./subfolder")`.

When using `--moduleResolution node`, TypeScript will also look for files named `index.ts`, `index.tsx`, or `index.d.ts` (in that order).

## Example

The example here (`"example.ts"`) imports from a subfolder containing an `index.ts` file, which will be correctly resolved by TypeScript.

You can run `npm run build` to see a trace of the module resolution and generate a type definition file.
