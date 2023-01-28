# TypeScript Module Resolution Examples <!-- omit from toc -->

A set of example projects exploring TypeScript module resolution with various settings and situations.

Table of contents:
- [About this project](#about-this-project)
- [Introduction to TS module resolution](#introduction-to-ts-module-resolution)
  - [Modules](#modules)
  - [Module resolution](#module-resolution)
- [TypeScript Options](#typescript-options)
  - [`moduleResolution`](#moduleresolution)
    - [New options in development](#new-options-in-development)
  - [`baseUrl`](#baseurl)
  - [`moduleSuffixes`](#modulesuffixes)
  - [`resolution-mode`](#resolution-mode)
- [Miscellaneous](#miscellaneous)
  - [Ambient modules](#ambient-modules)

## About this project

This was initially created for [a talk](https://www.youtube.com/watch?v=MEl2R7mEAP8) at Michigan TypeScript Developers.

The repository is roughly organized around TypeScript settings, with subfolders for possible values for those settings
and examples demonstrating various aspects of module resolution.  There are `README.md` files in most examples to
explain the concept being demonstrated.  Usually you can run `npm run build` in each example folder to generate 
`example.d.ts` type definition files and see a log of the module resolution process that TypeScript uses printed
to the terminal.

Feel free to submit issues or pull requests.  I hope for this to be a learning resource for TypeScript developers who
want to understand the complex topic of TypeScript module resolution.  So with that, let's start learning!


## Introduction to TS module resolution

### Modules

Let's begin by defining what we mean by a "module".  When we write TypeScript code, 
we typically don't write everything in one single file. Instead, we break up our code 
into smaller pieces and put these into files.  JavaScript can treat each file as either 
a "script" or a "module".

Basically, a script file is a standard JavaScript file that does not import or require any other files
and does not have any exports.  It might operate on the global scope, or it might not.

JavaScript Modules, on the other hand, generally come in two flavors, CommonJS (CJS) and 
ES Modules (ESM).  Node.js historically used CJS and has started supporting ESM since version 12.
Modern browsers also support ES modules, but they use slightly different rules for resolving
imports from other modules.  To learn more about ES modules in the browser, I recommend reading the
[MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

In TypeScript, most files you write will be considered a module.  By default, any file that uses `import` or `export` is treated as a module.  Starting in version 4.7, in some situations TypeScript will also check for a package.json file containing `"type": "module"`.  The module detection behavior can be 
adjusted with the [`moduleDetection`](https://www.typescriptlang.org/tsconfig#moduleDetection) setting.

### Module resolution

When we need to use code from another TypeScript file than the one we are writing, we generally
use an `import` statement (or `import()` function).  We might write something like:

```ts
import foo from 'moduleA';
```

TypeScript will then need to find what module we mean by "moduleA", in order to determine what type 
"foo" should have.

This is important.  We are talking about _types_ when we talk about TypeScript module resolution.

It's true that TypeScript can also compile `.ts` files into `.js` files, converting our TypeScript into 
JavaScript that can run in Node.js, or browsers, or elsewhere.  But it's the runtime that will perform
the actual imports, using its own module resolution algorithms.  Module resolution rules are left up to the runtime to determine, it is not determined by the JavaScript specification.

So, TypeScript does its best to try to match the same module resolution rules that the final runtime
will use, so that the type information it gathers is complete and accurate.  Because there are different
runtimes with different rules, TypeScript exposes some options that we can set in order to match up with 
the runtime environment.

## TypeScript Options

These are some options which TypeScript uses to adjust its module resolution.  Please see the 
[TypeScript config reference](https://www.typescriptlang.org/tsconfig) for details on each option
and the minimum TypeScript version required for support.

Note that some module-related options, such as `module` and `target` effect the emitted JavaScript files, but not module resolution (other than by changing the defaults for other options in some cases), so they are not explored here.

### `moduleResolution`

[Config reference](https://www.typescriptlang.org/tsconfig#moduleResolution)

This is the most direct way to change TypeScript's module resolution mode.  It has three current possible values,
and more are being developed to better meet the needs of bundlers and browser-native modules.  

The currently-supported values are (as of TS 4.9):

- `"Classic"`
- `"Node"`
- `"Node16"` or `"NodeNext"` (currently these mean the same thing)

"Classic" mode is rarely used in modern projects, and is not explored in this repository.  For details on how it works,
see the TypeScript [module resolution guide](https://www.typescriptlang.org/docs/handbook/module-resolution.html#classic).

"Node" is likely the most commonly-used option, and mimics the behavior of Node 11 and below. 
See the `moduleResolution/Node` examples and [README](moduleResolution/Node/README.md).

"NodeNext" is intended to evolve as Node.js adds new versions and new features, but for now it is the same as "Node16",
which adds support for the Node.js style of ES modules.  There are some differences in TypeScript Module resolution
compared to "Node", and these are explored in `moduleResolution/Node16`.  
See the [README](moduleResolution/Node16/README.md) there to begin.


#### New options in development

The TypeScript team identified that the current `moduleResolution` options are not flexible enough for those using 
bundlers or writing ESM to be directly consumed in browsers, so they are creating new options:

- `"Hybrid"` (final naming TBD): designed primarily for bundlers, with some behavior customizable by settings. 
  - PR: https://github.com/microsoft/TypeScript/pull/51669
- `"Minimal"`: A common-denominator for resolution features supported in browsers, Node, Deno, and bundlers. 
  - PR: https://github.com/microsoft/TypeScript/pull/50153

There are no examples of these in this repo, but I intend to add them once they are released.

### `baseUrl`

[Config reference](https://www.typescriptlang.org/tsconfig#baseUrl);

*Examples TBD*

Provides a way to inform TypeScript that when compiled, non-relative imports can be resolved relative to this path.
It is similar to the (discouraged) `NODE_PATH` option for Node.js.

### `moduleSuffixes`

[Release announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#resolution-customization-with-modulesuffixes)

*Examples TBD*

Allows customizing the “sub” extensions TS will examine, which can be particularly useful when targeting React Native
as a runtime.  For example, `"moduleSuffixes": [".ios", ".native", ""]` will look for files ending with `.ios.ts`, `.native.ts`, then `.ts`.

### `resolution-mode`

[Release announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#resolution-mode)

*Examples TBD*

This is an experimental feature, parts of which are available only in nightly versions, which can change the
"resolution mode" of globals or imported types, allowing CJS types to be used in ESM files, and vice-versa.

## Miscellaneous

### Ambient modules 

Ambient modules make it possible to import a JavaScript project without types, and use 
[community-supplied](https://github.com/DefinitelyTyped/DefinitelyTyped) types or custom-written types to 
describe that project.  The examples in `misc/ambient-modules` explore different ways that ambient modules can be
configured and used.
