// This is a non-relative import.  TS knows to look in `node_modules`
import { value } from "pkg/file";
// This is not in the "node_modules" within this folder, it's up a few levels,
// but TypeScript will find it.
import * as ts from "typescript";

export function NonRelativePkg() {
  return value;
}

export function NonRelativeTS() {
  return ts;
}
