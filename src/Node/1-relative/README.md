# TypeScript module resolution for relative imports

One of the simplest kinds of imports to resolve, "relative" imports provide a direct path from
the file doing the importing to the module being imported.  They start with either a `"/"` 
(a path relative to the filesystem root), a `"./"` (a path to a module inside the importing 
file's directory), or a `"../"` (a path in an ancestor directory).

When using `--moduleResolution node`, an explicit extension can optionally be used, 
but is not required.  

Relative imports are normally used for files within your own project.

## Example

This example demonstrates a simple, direct relative import.  There are other approaches Node.js (and TypeScript) can take if it doesn't find a file at the specified path, but these will be explored in other examples.

In this case, `example.ts` imports directly from `"./file"`.  Note the extension is not required.  TypeScript resolves this import to the module at `"./file.ts"`.

You can see the module resolution process (the "trace") by running `npm run build` in this example folder.  Running this command will also create type definition files (.d.ts) which you can examine.
