// challenge 1 
/*
const markWeights = 78;
const markHeights = 1.69;
const johnWeights = 92;
const johnHeights = 1.95;
*/
const markWeights = 95;
const markHeights = 1.88;
const johnWeights = 85;
const johnHeights = 1.76;

const markBMI = markWeights / markHeights ** 2;
const johnBMI = johnWeights / johnHeights ** 2;

const markHigherBMI = markBMI > johnBMI;

console.log(markHigherBMI);

// challenge 2
if (markBMI > johnBMI) {
    console.log("Mark's BMI is higher than John's!");
    console.log(`Mark's BMI ${markBMI.toFixed(1)} is higher than John's ${johnBMI.toFixed(1)}!`);
} else {
    console.log("John's BMI is higher than Mark's!");
    console.log(`John's BMI ${johnBMI.toFixed(1)} is higher than Mark's ${markBMI.toFixed(1)}`);
}

// challenge 3

const dolphinsScore = 97 + 112 + 101;
const koalasScore = 97 + 112 + 101;
let dolphinsAverage = dolphinsScore / 3;
let koalasAverage = koalasScore / 3;
if (dolphinsAverage > koalasAverage) {
    console.log("Dolphins is the winner!");
} else if (koalasAverage > dolphinsAverage) {
    console.log("Koalas is the Winner!");
}
else {
    console.log("It's a DRAW!");
}

// challege 4
const bill = 430;
let tip = 0;
// bill >= 50 && bill <= 300 ? tip = bill * 0.15 : tip = bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${bill >= 50 && bill <= 300 ? tip = bill * 0.15 : tip = bill * 0.2}, and the total value ${bill + tip} `);
// different answer
const tip1 = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip1}, and the total value ${bill + tip1}`);
