export async function Foo() {
  return (await import("exports")).value;
 }
