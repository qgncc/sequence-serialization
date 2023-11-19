import { writeRange } from "./bytes.ts";
import { findRanges } from "./range.ts";

export function serialize(arr: Array<number>) {
	let ranges = findRanges(arr);

	const bitArr: string[] = [];
	for (let i = 0, offset = 0; i < ranges.length; i++) {
		let range = ranges[i];
		offset = writeRange(range, offset, bitArr);
	}
	return btoa(bitArr.join(""));
}
