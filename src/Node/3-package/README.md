# Package module resolution

TypeScript does its best to mimic the module resolution features of the runtime it is configured for.
With a `moduleResolution` of `"Node"`, it will look for a file named "package.json", which in Node.js
is used to define a package, and often specifies the main entrypoint in a field named `"main"`.
A TypeScript main "entrypoint" (i.e. types for the main entrypoint) can be specified using a field named
`"typings"` or `"types"` (they work the same).

## Examples

These examples demonstrate TypeScript module resolution when using package.json files.
The packages being imported are in `node_modules`, but they don't need to be for package.json
processing to work.  These could also be relative imports to a package inside your monorepo project, 
for instance.

In these examples, the contents of `pkg/file.d.ts` differ from `pkg/file.ts`, 
to make it more clear which is being used in the emitted definition files.

### example1.ts

This example imports from `"pkg"`, which specifies `"types": "./file.d.ts"` in its package.json file.

Run `npm run build1` to view the module resolution trace and the resulting `example1.d.ts` file.

### example2.ts

This example causes TypeScript to use a bit more complex logic to find type definitions.
The example imports from `"pkg-only-main"`, which specifies only a `"main"` field in its package.json 
(no "types" field).  TypeScript is able to use the "main" field to locate "file.ts", and uses
its types.

Run `npm run build2` to see the details of the resolution process that TypeScript uses.
