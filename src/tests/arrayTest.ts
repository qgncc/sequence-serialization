import { deserialize } from "../deserilize.ts";
import { serialize } from "../serilize.ts";
import { isArraysHaveSameElements } from "../utils/isArraysHaveSameElements.ts";
import { serializeUsingArrayJoin } from "../utils/serializeUsingArrayJoin.ts";

export function arrayTest(
	array: number[],
	compare: (arr: number[]) => string = serializeUsingArrayJoin,
) {
	let serializationToCompare = compare(array);
	let serialized = serialize(array);
	let deserialized = deserialize(serialized);
	console.log("Исходная строка:\n", serializationToCompare);
	console.log("Сжатая строка:\n", serialized);
	console.log(
		"Коэффицент сжатия: ",
		serializationToCompare.length / serialized.length,
	);
	console.log("success: ", isArraysHaveSameElements(array, deserialized));
}
