# TypeScript module resolution with `allowJs`

TypeScript can infer some types and use JSDoc annotations when importing JavaScript files
if the `--allowJs` [option](https://www.typescriptlang.org/tsconfig#allowJs) is used.

## Examples

The `example.ts` file here imports from `file`, which maps to the javascript file `file.js`.
There are two different tcsonfig files to demonstrate the effect of the `allowJs` setting.

### Without allowJs

If you run `npm run build` in this directory, `allowJs` will be `false`, and while the build will
succeed (contrary to the docs?), the type of the imported `value` will be `any`.

### With allowJs

However, if you run `npm run build-allowjs`, the `allowJs` setting will be `true` 
(nothing else is changed), and you can see that the JSDoc annotations are used to 
create a `file.d.ts` declaration file, and the emitted `example.d.ts` has the correct type.

This can be one approach to adding types to a javascript project, by adding JSDoc comments.
