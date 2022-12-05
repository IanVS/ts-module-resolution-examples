# Resolving modules with relative imports

The rules for resolving module imports when using a `moduleResolution` of `"Node16"` or `"NodeNext"` are similar to the standard Node.js rules, but have some extra restrictions when using ES modules:

1. Extensionless specifiers are not allowed.  
   You must provide the extension of the expected _compiled_ file, 
   which normally means using an extension of `.js` or `.mjs`.  
   TypeScript does not change import specifiers when it emits JavaScript, 
   and so you need to use the final emitted filename in order for the generated code to be valid.
2. There's no special-handling for files named `index.js`.  
   Since all relative imports require a full extension, there's no longer any way to specify a 
   folder name and automatically resolve to an index file.

## Examples

Note that the package.json in this folder does not specify `"type": "module"`, so files ending in `.ts` are considered to be CommonJS.

### example-cjs.ts

This file will be treated as a CommonJS module, and is therefore able to use extensionless imports, which will resolve to the `target.ts` file (which is also CJS).  

Run `npm run build-cjs` to emit a type declaration file and view the module resolution trace.

### example-esm.mts

Since this file uses a `.mts` extension, it will be treated as an ES module, which means that a full filename 
of the import specifier, including the extension, must be provided.  

Note that the extension is `.mjs` and not `.mts`, because we must provide the final _compiled_ file's path.  
TypeScript does not rewrite import specifiers, and so if we used `.mts`, the final compiled file would also include `.mts`,
and Node.js would not know how to handle that TypeScript file at runtime.

Run `npm run build-esm` to compile the types and view the module resolution trace.

### example-extensionless.mts

The only real difference between this file and `example-cjs.ts` is that this file ends in `.mts`, 
so therefore TypeScript will treat it as an ES module, which means an extension is required in the import specifier.
Without providing it, TypeScript will still create a type definition file, but the type inside will be `any`,
and it will print a TypeScript error to the terminal. 

Run `npm run build-extensionless` to check it out.
