import {value} from 'pkg';

export function Static() {
 return value;
}

export async function Dynamic() {
  return (await import("pkg")).value;
}
