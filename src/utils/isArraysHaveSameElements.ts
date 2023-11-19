export function isArraysHaveSameElements(arr1: number[], arr2: number[]) {
	return arr1.sort().toString() === arr2.sort().toString();
}
