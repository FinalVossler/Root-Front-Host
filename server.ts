let array = [1, 4, 6, 2];

array = array.sort((a, b) => b - a);

const resultArray: number[] = [];
for (let i = 0; i < array.length - 2; i++) {
  resultArray.push(array[i]);
}

resultArray.push(array[array.length - 1]);

console.log(resultArray.join(" "));
