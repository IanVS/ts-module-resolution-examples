# `moduleResolution`

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
See the [Node](Node/) directory for examples and explanations.

"NodeNext" is intended to evolve as Node.js adds new versions and new features, but for now it is the same as "Node16",
which adds support for the Node.js style of ES modules.  There are some differences in TypeScript Module resolution
compared to "Node", and these are explored in the [Node16](Node16/) directory. See the [README](Node16/README.md) there to begin.
