import { Range } from "./range";

export function printByte(
	num: number,
	message: string = "BYTE",
	size: number = 8,
) {
	console.log(message, num.toString(2).padStart(size, "0"));
}

export function writeRange(range: Range, bitOffset: number, array: string[]) {
	const nineBitsMask = (1 << 9) - 1;
	let offset = bitOffset;
	if (range[2] === 1) {
		//добавляем бит флаг со значением ноль, который индетифицирует последующие 9 бит как число, а не как Range
		let bits = (range[0] & nineBitsMask) << 1;
		writeBits(bits, offset, 10, array);
		offset += 10;
	} else {
		let start = range[0];
		//добавляем бит флаг со значением ноль, который индетифицирует последующие 9 бит как Range
		start = (start << 1) | 1;
		writeBits(start, offset, 10, array);
		offset += 10;
		let step = range[1];
		writeBits(step, offset, 9, array);
		offset += 9;
		let stepAmount = range[2];
		writeBits(stepAmount, offset, 9, array);
		offset += 9;
	}
	return offset;
}

// export function write9BitsByIndex(
// 	number: number,
// 	rangeIndex: number,
// 	array: number[],
// ) {
// 	const index = rangeIndex + Math.floor(rangeIndex / 8);
// 	const offset = rangeIndex % 8;
// 	const [_, newIndex] = write9Bits(number, offset, index, array);
// 	return newIndex;
// }

export function readBits(start: number, length: number, array: string[]) {
	let bits = 0;
	for (let i = 0; i < length; i++) {
		let arrayIndex = Math.floor((start + i) / 7);
		let offset = (start + i) % 7;
		let writeMask = 1 << i;
		let readMask = 1 << offset;
		if (!array[arrayIndex]) return null;
		let isOne = !!(array[arrayIndex].charCodeAt(0) & readMask);
		bits = isOne ? bits | writeMask : bits & (((1 << length) - 1) ^ writeMask);
	}

	return bits;
}
export function writeBits(
	bits: number,
	start: number,
	length: number,
	array: string[],
) {
	for (let i = 0; i < length; i++) {
		let arrayIndex = Math.floor((start + i) / 7);
		let offset = (start + i) % 7;
		let readMask = 1 << i;
		let writeMask = 1 << offset;
		let isOne = !!(bits & readMask);
		if (!array[arrayIndex]) array[arrayIndex] = "";
		array[arrayIndex] = isOne
			? String.fromCharCode(array[arrayIndex].charCodeAt(0) | writeMask)
			: String.fromCharCode(
					array[arrayIndex].charCodeAt(0) & (((1 << 8) - 1) ^ writeMask),
			  );
	}
}
// export function read9BitsByIndex(chunkIndex: number, array: number[]) {
// 	const index = chunkIndex + Math.floor(chunkIndex / 8);
// 	const offset = chunkIndex % 8;
// 	return read9Bits(offset, index, array);
// }

export function base64ToArray(base64: string) {
	let binary = atob(base64);
	let result: string[] = [];
	for (let i = 0; i < binary.length; i++) {
		result.push(binary.charAt(i));
	}
	return result;
}
