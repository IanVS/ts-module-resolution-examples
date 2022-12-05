# moduleResolution: "Node"

Currently the most common `moduleResolution` setting for TypeScript is `"Node"`.
It mimics many of the module resolution features of Node.js, specifically the 
CommonJS module resolution of Node.js version 11 and lower.

This is also the recommended setting when using a bundler like Webpack or Vite.
These have their own module resolution rules, but in general they more-or-less
match up with the behavior of Node.js. However, new `moduleResolution` settings 
are currently being developed to allow more flexibility in the resolution features 
that TypeScript uses, in order to better support different bundlers and runtimes
like browser ES Modules (ESM).

Speaking of ESM, the `"Node"` setting does not support Node ESM or features like
`"exports"` in package.json files.  For this, `"Node16"` or `"NodeNext"` is required.
Read more in the [README](../Node16/README.md) for the Node16 examples.

## Examples

The examples in this directory all use `"moduleResolution": "Node"`, and are loosely 
ordered from simple to more complex.  Each example contains a `README.md` file to explain
the concepts demonstrated, one or more `example.ts` files performing an import,
a `package.json` file defining one or more build scripts to generate type definition files
and print module resolution debugging information, and one or more `tsconfig.json` files
specifying any special settings for the example.

The examples are:

- [1-relative](1-relative/README.md): Standard, boring relative imports to another file in your project
- [2-non-relative](2-non-relative/README.md): Imports starting without `"/"`, `"./"`, or `"../"` are pulled from node_modules
- [3-package](3-package/README.md): TypeScript can use a package.json file to determine which module to use
- [4-index](4-index/README.md): Node.js has special rules for files named `index.js`.  TypeScript does too
- [5-javascript](5-javascript/README.md): Can we import from a JavaScript file?  If so, is there a way to still have type safety?
- [6-mixed-ts-js](6-mixed-ts-js/README.md): What if we import from a JavaScript file, but there's also a TypeScript file with the same name?
- [7-typesVersions](7-typesVersions/README.md): A way to publish multiple type definition files for different TypeScript versions
