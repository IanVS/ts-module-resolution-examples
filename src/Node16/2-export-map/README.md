# Resolving modules with conditional exports

Node.js introduced a new field called `"exports"` into package.json in version 12.
It is a more powerful and flexible version of `"main"`, which allows package authors
to specify the entrypoint(s) to their package. The `"exports"` field differs from `"main"` in a few ways:

1. It allows more than one entrypoint to be specified
2. Any file not included cannot be imported by consumers
3. Conditional exports can specify different files for various cases (e.g. "require" vs "import")
4. Subpath exports can simplify import specifiers (e.g. `import "pkg/foo";` instead of `import "pkg/dist/esm/foo";`)

Note: not all bundlers and runtimes support all these features.  See https://github.com/andrewbranch/example-subpath-exports-ts-compat for an explanation of the issues and a few compatibility strategies.

## TypeScript module resolution

### Prerequisites

In order to use package.json `"exports"` fields in TypeScript, you must use `--moduleResolution Node16` (or `NodeNext`, they're the same for now).  This is because the default `node` resolution mode is based on node.js 10, which does not include `"exports"` support.

### Example package with `"exports"` field

Let's consider importing a value from a package which uses conditional exports to expose a different main entrypoint for consumers using either CommonJS (`"require"`) or ESM (`"import"`).  An example can be found in this repo in `node_modules/pkg`.  It uses `"type": "module"` in its package.json file, which means by default, `.js` (and `.ts`) files are considered to be ES modules.  It also specifies an `"exports"` field:

```json
"exports": {
  ".": {
    "import": {
      "types": "./index.d.ts",
      "default": "./index.js"
    },
    "require": {
      "types": "./index.d.cts",
      "default": "./index.cjs"
    }
  },
  "./package.json": "./package.json"
}
```

There are a few things to note here:

- The top-level entrypoint is specified by `"."`
- Conditional imports are used for `"import"` and `"require"`
- Separate types files are supplied to each conditional export, and these `"types"` fields are specified _before_ `"default"`
- An additional entrypoint is given for `"./package.json"`.  It is best practice to include this, otherwise consuming projects are not able to access this file.

To make it clear which type file is being used, the example definitions are:

```
// pkg/index.d.ts
export declare const value: "esm";

// pkg/index.d.cts
export declare const value: "cjs";
```

### Module resolution

If we want to import from this example project, and are using a `moduleResolution` setting 
of `"Node16"` or `"NodeNext"`, TypeScript will use the `"exports"` field of `pkg/package.json` to 
determine which types module to use.  But whether it uses the `"import"` or `"require"` condition
depends on a few things.

1. Is the import static or dynamic?
   1. If the import is dynamic (`import('pkg')`), use the `"import"` condition.
   2. If the import is static (`import { value } from 'pkg';`), use `"import"` or `"require"` depending on step 2:
2. Is the TypeScript file with the import an ES module? If so, use `"import"` condition, otherwise `"require"`
   1. Files named `.mts` are always considered ES modules.
   2. Files named `.cts` are always considered CommonJS modules.
   3. Files named `.ts` are CommonJS by default, unless `"type": "module"` is set in package.json.

### Examples

There are a few examples in this folder to demonstrate the various cases.

#### /example1-static

This project contains two files, `static.cts` and `static.mts`, with identical contents:

```ts
import {value} from 'pkg';

export function Static() {
 return value;
}
```

You can run `npm run build` in the folder to generate type definition files.  A trace of
TypeScript's module resolution will also print to the terminal, which can be helpful to
understanding the process it went through to resolve the types.  

You can see that the extension of the files is used to determine which condition to use
from `pkg`, and the generated types reflect the different conditions used.

```ts
// static.d.cts
export declare function Static(): "cjs";

// static.d.mts
export declare function Static(): "esm";
```

#### /example2-dynamic

This example is similar to the static case, there are two files, `dynamic.cts` and `dynamic.mts`,
and they contain the same code, this time with a dynamic import:

```ts
export async function Dynamic() {
 return (await import("pkg")).value;
}
```

This time, since typescript always treats dynamic imports as ESM, we get this result after running `npm run build`:

```ts
// static.d.cts
export declare function Dynamic(): Promise<"esm">;

// static.d.mts
export declare function Dynamic(): Promise<"esm">;
```

#### /example3-mixed

This example demonstrates what happens if a `.cts` file uses a mixture of static and dynamic imports.
In short, it's what we would expect.  Dynamic imports use the `"import"` condition and static imports
use `"require"`:

```ts
// mixed.d.cts
export declare function Static(): "cjs";
export declare function Dynamic(): Promise<"esm">;
```

### Note about resolution-mode

There are experimental ways to override which resolution mode is used, some of which is currently 
limited to TypeScript nightly versions.  
See https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-rc/#resolution-mode for details.
