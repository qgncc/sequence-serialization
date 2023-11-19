export function createRandomArray(min: number, max: number, length: number) {
  let arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.round(Math.random() * (max - min) + min));
  }
  return arr;
}
