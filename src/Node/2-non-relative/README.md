# TypeScript module resolution for non-relative imports

When using `--moduleResolution node`, imports without a `"/"`, `"./"`, or `"../"` (so called 
"non-relative" imports) use the Node.js convention of looking inside special 
folders named "node_modules".
TypeScript will start in the same directory as the file performing the import, and then walk up
the directory structure looking through each "node_modules" folder it finds until it locates
the module being imported.

Check out the typescript [module resolution documentation](https://www.typescriptlang.org/docs/handbook/module-resolution.html#how-nodejs-resolves-modules) 
for more details on the process it follows.

## Example

The simple example shown in this folder demonstrates a non-relative import in `example.ts`.  
TypeScript resolves the module to `node_modules/pkg/file.d.ts`. 
It also imports from `"typescript"`, which is located in the node_modules folder at the root
of this repository.

You can run `npm run build` in this folder to see a trace of the module resolution 
and generate a type definition file.  You'll notice that TypeScript looks for node_modules folders up 
the directory tree until it finds what it is looking for.
