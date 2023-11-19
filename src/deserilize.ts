import { base64ToArray, readBits } from "./bytes.ts";
import { Range, rangeToArray } from "./range.ts";

export function deserialize(base64: string) {
	const arr = base64ToArray(base64);
	let offset = 0;
	let numbersAndRanges: (number | Range)[] = [];
	while (arr.length * 8 - offset >= 10) {
		let controlBit = readBits(offset, 1, arr);
		offset += 1;
		if (controlBit) {
			//range
			const mask = (1 << 9) - 1;
			let rangeBits = readBits(offset, 27, arr);
			offset += 27;
			if (rangeBits !== null) {
				let start = rangeBits & mask;
				let step = (rangeBits & (mask << 9)) >> 9;
				let stepAmount = (rangeBits & (mask << (9 * 2))) >> (9 * 2);
				numbersAndRanges.push([start, step, stepAmount]);
			}
		} else {
			let number = readBits(offset, 9, arr);
			offset += 9;
			number !== null && numbersAndRanges.push(number);
		}
	}
	return numbersAndRanges
		.map((numberOrRange) => {
			if (Array.isArray(numberOrRange)) {
				return rangeToArray(numberOrRange);
			} else {
				return numberOrRange;
			}
		})
		.flat();
}
