export type Range = [number, number, number];

function countNumbers(arr: Array<number>) {
	const numbersMap = new Map<number, number>();
	for (let i = 0; i < arr.length; i++) {
		const number = arr[i];
		let numberCount = numbersMap.get(number);
		if (!numberCount) numberCount = 0;
		numbersMap.set(number, numberCount + 1);
	}
	return numbersMap;
}

export function isMapZeroes(map: Map<number, number>) {
	for (let [_, value] of map) {
		if (value) return false;
	}
	return true;
}

function incrementMapValue<T extends any>(key: T, map: Map<T, number>) {
	map.set(key, (map.get(key) || 0) + 1);
}

function decrementMapValue<T extends any>(key: T, map: Map<T, number>) {
	map.set(key, (map.get(key) || 0) - 1);
}

export function findRanges(arr: Array<number>) {
	const sortedArray = [...arr].sort((a, b) => a - b);
	const numbersCountMap = countNumbers(sortedArray);
	const ranges: Range[] = [];
	for (let [start, _] of numbersCountMap) {
		while (numbersCountMap.get(start) !== undefined) {
			let currentRange: Range;
			let maxRange: Range = [start, 0, 1];
			for (let step = 0; step < 300; step++) {
				let localNumbersCountMap = new Map<number, number>([[start, 0]]);
				let current = start;
				let stepCounter = 0;
				let amountOfCurrentNumber = numbersCountMap.get(current) || 0;
				let amountOfCurrentNumberUsed = localNumbersCountMap.get(current) || 0;
				while (
					amountOfCurrentNumber &&
					amountOfCurrentNumber - amountOfCurrentNumberUsed
				) {
					incrementMapValue(current, localNumbersCountMap);
					stepCounter += 1;
					current += step;
					if (current > 300) {
						current = current - 300;
					}
					amountOfCurrentNumber = numbersCountMap.get(current) || 0;
					amountOfCurrentNumberUsed = localNumbersCountMap.get(current) || 0;
				}
				currentRange = [start, step, stepCounter < 4 ? 1 : stepCounter];
				maxRange = currentRange[2] > maxRange[2] ? currentRange : maxRange;
			}
			iterateRange(maxRange, (value) => {
				decrementMapValue(value, numbersCountMap);
				if ((numbersCountMap.get(value) || 0) <= 0)
					numbersCountMap.delete(value);
			});
			ranges.push(maxRange);
		}
	}
	return ranges;
}
export function iterateRange(range: Range, callback: (value: number) => void) {
	let [start, step, stepCount] = range;
	callback(start);
	let current = start;
	for (let i = 1; i < stepCount; i++) {
		current += step;
		if (current > 300) {
			current = current - 300;
		}
		callback(current);
	}
}

export function rangeToArray(range: Range) {
	let result: number[] = [];
	iterateRange(range, (value) => result.push(value));
	return result;
}
