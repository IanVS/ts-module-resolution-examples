## The use of `typesVersions` for TypeScript module resolution

Package authors sometimes want to publish different type definitions to be used in different
versions of TypeScript.  For example, if new syntax allows for more thorough typing, 
but is not supported in older versions of TypeScript, they may want to publish two definition files,
one with the old syntax, and one with the new.  The way they can accomplish this is by adding a 
`typesVersions` field to their package.json file.

[Introduced](https://devblogs.microsoft.com/typescript/announcing-typescript-3-1/#version-redirects-for-typescript-via-typesversions) in TypeScript 3.1, `typesVersions` is a powerful way to change TypeScript's module resolution.

## Example

This example includes a package named `pkg` using `typesVersions` in its package.json:

```json
{
  "name": "pkg",
  "main": "./project.js",
  "types": "./project.d.ts",
  "typesVersions": {
    ">=4.0": { "*.d.ts": ["*.v4.d.ts"] }
  }
}
```

This means that any version of TypeScript that is 4.0 or higher, when requesting a file ending in `.d.ts`, will resolve instead to a file with the same name ending in `.v4.d.ts`.  Versions of TypeScript less than this (including versions that don't support `typesVersions`), will receive the fallback specified in the `"types"` field.

Run `npm run build` in this folder to generate `example.d.ts` and see the module resolution trace.
