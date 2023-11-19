import { arrayTest } from "./tests/arrayTest.ts";
// import { randomArraysTest } from "./tests/randomArraysTest.ts";
import { createRandomArray } from "./utils/createRandomArray.ts";

let primeNumbersArray = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
	73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
	157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
	239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
];

console.log("Тестиррование на массиве из простых чисел");
arrayTest(primeNumbersArray);
console.log("\nТестирование на случайных массивах");
console.log("Размер массива 50:");
arrayTest(createRandomArray(0, 300, 50));
console.log("\nРазмер массивов 100:");
arrayTest(createRandomArray(0, 300, 100));
console.log("\nРазмер массивов 500");
arrayTest(createRandomArray(0, 300, 500));
console.log("\nРазмер массивов 1000");
arrayTest(createRandomArray(0, 300, 1000));
console.log("\nТестиррование на массиве из цифр");
arrayTest(createRandomArray(0, 9, 100));
console.log("\nТестиррование на массиве из двузначных чисел");
arrayTest(createRandomArray(10, 99, 100));
console.log("\nТестиррование на массиве из трехзначных чисел");
arrayTest(createRandomArray(100, 300, 100));
console.log("\nТестиррование на массиве из повторяющихся чисел");
arrayTest(new Array(900).fill(0).map((_, index) => Math.floor(index / 3)));
