import { deserialize } from "../deserilize.ts";
import { findRanges } from "../range.ts";
import { serialize } from "../serilize.ts";
import { createRandomArray } from "../utils/createRandomArray.ts";
import { isArraysHaveSameElements } from "../utils/isArraysHaveSameElements.ts";
import { logToFile } from "../utils/logToFile.ts";
import { serializeUsingArrayJoin } from "../utils/serializeUsingArrayJoin.ts";

export function randomArraysTest(
	arraySize: number = 50,
	compare: (arr: number[]) => string = serializeUsingArrayJoin,
) {
	const serializationEfficentyMeasurmentsArray = [];
	let isAllEqual = true;
	for (let i = 0; i < 1000; i++) {
		const initialArray = createRandomArray(0, 300, arraySize);
		const simplySerialized = compare(initialArray);
		const serialized = serialize(initialArray);
		const deserialized = deserialize(serialized);
		const isArraysEqual = isArraysHaveSameElements(initialArray, deserialized);

		if (!isArraysEqual) {
			console.log(
				"Содержимое исходного массива не совпадает с сериализованным.",
			);
			isAllEqual = false;
			logToFile(
				initialArray.toString(),
				serialized,
				deserialized.toString(),
				findRanges(initialArray)
					.map((r) => `[${r.join()}]`)
					.toString(),
			);
		}
		serializationEfficentyMeasurmentsArray.push(
			simplySerialized.length / serialized.length,
		);
	}
	const avgRatio =
		serializationEfficentyMeasurmentsArray.reduce(
			(prev, current) => prev + current,
		) / serializationEfficentyMeasurmentsArray.length;
	console.log("Средний коэффицент сжатия: ", avgRatio);
	console.log("success: ", isAllEqual);
}
