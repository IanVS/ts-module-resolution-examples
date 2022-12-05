# moduleResolution: "Node16" / "NodeNext"

Typescript 4.7 added two new `moduleResolution` values, "Node16" and "NodeNext".  
"NodeNext" is currently the same as "Node16", but is intended to change if/when 
Node.js changes behavior in future versions. 

The `"Node16"` mode is intended to mimic Node.js module resolution behavior from Node.js 12 onward, 
especially when it comes to the way it treats ES modules.  Node.js native ESM handling has a few differences 
from CommonJs and new restrictions on relative import specifiers.  It is also more restrictive than most bundlers.  
If you are using a bundler to compile your code, you may be best off using `"moduleResolution": "node"`, 
until new modes are introduced which will better support bundler usage.

## Examples

This repo contains examples demonstrating the major changes with "Node16" module resolution in TypeScript.  


### Relative imports

When using ES modules (by setting `"type": "module"` in your package.json file, or naming your TypeScript files with a `.mts` extension), "Node16" module resolution for relative imports have a couple of differences from "Node".
The folder `/1-relative` provides an example of a relative import, and you can learn about the differences in the [readme](1-relative/README.md).

### Non-relative imports

In `"Node16"` resolution mode, TypeScript has the ability to use the "exports" field of package.json 
to resolve non-relative imports.

See the `/2-export-map` folder for an example, and its [readme](2-export-map/README.md) for details.
