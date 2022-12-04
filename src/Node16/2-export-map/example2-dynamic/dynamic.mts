export async function Dynamic() {
  return (await import("pkg")).value;
}
