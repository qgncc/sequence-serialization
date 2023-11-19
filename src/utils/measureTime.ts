export function measureTime<A extends any[], R>(
	func: (...args: A) => R,
	...args: A
): [R, number] {
	const start = performance.now();
	let result = func(...args);
	const finish = performance.now();
	return [result, finish - start];
}
