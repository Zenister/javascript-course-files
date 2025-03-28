'use strict';
/*
function logger() {
    console.log("Hello I'm Rowen");
}

logger();
logger();

*/

function foodProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

foodProcessor(3, 5);


// assignment 2 functions
function describeCountry(country, population, capitalCity) {
    const describe = `${country} has ${population} million people and its capital city is ${capitalCity}`;
    return describe;
}

const japan = describeCountry('Japan', 145, 'Tokyo');
const finland = describeCountry('Finland', 6, 'Helsinki');
console.log(japan);
console.log(finland);

// assignment 2 Function Declarations vs. Expressions
// function declarations
function percentageOfWorld1(population) {
    const percentagePopulation = (population / 7900) * 100;
    return percentagePopulation
}

const populationPercentageJapan = percentageOfWorld1(145);
console.log(`Japan has ${populationPercentageJapan.toFixed(1)}% population`);

// function expressions
const percentageOfWorld2 = function (population) {
    const percentagePopulation = (population / 7900) * 100;
    return percentagePopulation;
}
console.log(`Japan has ${percentageOfWorld2(145).toFixed(1)}% population`);

// assignment 3 arrow functions
const percentageOfWorld3 = population => {
    const percentagePopulation = (population / 7900) * 100;
    return percentagePopulation;
}
console.log(`Japan has ${percentageOfWorld3(145).toFixed(1)}% population`);

// assignment 4 functions calling another functions
// function declarations
function describePopulation(country, population) {
    const percentagePopulation = percentageOfWorld1(population);
    return `${country} has ${population} million people, which is about ${percentagePopulation.toFixed(1)}% of the world`;
}
console.log(describePopulation('China', 1441));
// functions expressions
const describePopulations = function (country, population) {
    const percentagePopulation = percentageOfWorld2(population);
    return `${country} has ${population} million people, which is about ${percentagePopulation.toFixed(1)}% of the world`;
}
console.log(describePopulations('Japan', 145));
// arrow functions
const describePopulations1 = (country, population) => {
    const percentagePopulation = percentageOfWorld2(population);
    return `${country} has ${population} million people, which is about ${percentagePopulation.toFixed(1)}% of the world`;
}
console.log(describePopulations1('China', 145));

// Coding challenges part 2
// codding challenge #1
const calcAverage = (score1, score2, score3) => {
    const average = (score1 + score2 + score3) / 3;
    console.log(average)
    return average;
}
// short and correct answer
// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const dolphinsAverage = calcAverage(44, 23, 71);
const koalasAverage = calcAverage(65, 54, 49);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        return `Dolphins win ${avgDolphins} vs ${avgKoalas}`;
    } else if (avgKoalas >= (avgDolphins * 2)) {
        return `Koalas win ${avgKoalas} vs ${avgDolphins}`;
    } else {
        return `No team wins!`;
    }
}
const winner = checkWinner(dolphinsAverage, koalasAverage);
console.log(winner);


// short and using function expression
/*
const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        return `Dolphins win ${avgDolphins} vs ${avgKoalas}`;
    } else if (avgKoalas >= (avgDolphins * 2)) {
        return `Koalas win ${avgKoalas} vs ${avgDolphins}`;
    } else {
        return `No team wins!`;
    }
}
console.log(checkWinner(dolphinsAverage, koalasAverage));
*/

// assignment Arrays
const populations = [1441, 145, 69, 14369];
console.log(populations.length);
const percentages = [percentageOfWorld1(populations[0]).toFixed(1), percentageOfWorld1(populations[1]).toFixed(1), percentageOfWorld1(populations[2]).toFixed(1), percentageOfWorld1(populations[3]).toFixed(1)];
console.log(percentages);

// assignment basic array operations
const neighbours = ['Russia', 'Korea', 'China'];
neighbours.push('Utopia');
console.log(neighbours);
neighbours.pop('Utopia');
console.log(neighbours);

if (!neighbours.includes('Germany')) {
    console.log("Probably not a central European country :D");
}

const locations = neighbours.indexOf('China'); // to get the index of China
console.log(locations);
neighbours[locations] = 'Republic of China';
console.log(neighbours);

// coding challenge 2
// const calcTip = function (bill) {
//     if (bill >= 50 && bill <= 300) {
//         return bill * 0.15;
//     } else {
//         return bill * 0.20;
//     }
// }

// ternary version
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
}

// ternary version + arrow function
// const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;

const bills = [125, 555, 44];

const total = function (index1, index2, index3) {
    const tips = [calcTip(bills[index1]), calcTip(bills[index2]), calcTip(bills[index3])];
    console.log(tips);
    const totalTips = [bills[index1] + tips[index1], bills[index2] + tips[index2], bills[index3] + tips[index3]];
    return totalTips;
}
console.log(total(0, 1, 2));

// assignment Introduction to Objects, Dot vs. Bracket Notation and Object Methods

const myCountry = {
    country: 'Japan',
    capital: 'Tokyo',
    language: 'Japanese',
    population: 145,
    neighbours: ['Korea', 'China', 'Taiwan'],

    describe: function () {
        return `${this.country} has ${this.population} million ${this.language}-speaking people, 
    ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
    },
    checkIsIsland: function () {
        this.checkIsIsland = this.neighbours.length < 0 ? true : false;
        return this.checkIsIsland;
    }
};
console.log(myCountry);
console.log(myCountry.checkIsIsland());
// assignment Dot vs. Bracket Notation
// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, 
//     ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`);
console.log(myCountry.describe());
console.log(myCountry.population + 2);
console.log(myCountry['population'] - 2);

// 015 dot vs bracket notation video challenge and Object Methods
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,

    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'not'} driver's license`;
        // it's better to do this.calcAge, because the function is not being called yet so if we use this.age it's going to be undefined
    }

};
// console.log(jonas['friends'].length); 
console.log(`${[jonas.firstName]} has ${jonas.friends.length}, and his best friend is called ${jonas.friends[0]}`);
console.log(jonas.calcAge());
console.log(jonas.age);
console.log(jonas.getSummary());

// part 2 coding challenge # 3

const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    }
}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    weight: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
        return this.bmi;
    }
}
console.log(mark.calcBMI());
console.log(john.calcBMI());
console.log(mark.bmi > john.bmi);
if (mark.calcBMI > john.calcBMI) {
    console.log(`Mark's BMI (${mark.bmi.toFixed(1)}) is higher than John's (${john.bmi.toFixed(1)})`);
} else {
    console.log(`John's BMI (${john.bmi.toFixed(1)}) is higher than Mark's (${mark.bmi.toFixed(1)})`);
}

//assignment Iteration the loop

for (let i = 1; i <= 5; i++) {
    console.log(`Voter number ${i} is currently voting`);
}

// assignment Looping Arrays, Breaking and Continuing
const populations1 = [1441, 145, 69, 14369];
const percentages2 = [];
for (let i = 0; i < populations1.length; i++) {
    percentages2.push(percentageOfWorld1(populations1[i]).toFixed(1));
}
console.log(percentages2);

// assignment Looping backwards and loops in loops
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
console.log(listOfNeighbours);
for (let i = 0; i < listOfNeighbours.length; i++) {
    for (let x = 0; x < listOfNeighbours[i].length; x++) {
        console.log(`Neighbour: ${listOfNeighbours[i][x]}`);
    }
}

//assignment the while loop
const populations2 = [1441, 145, 69, 14369];
const percentages3 = [];
let i = 0;
while (i < populations2.length) {
    percentages3.push(percentageOfWorld1(populations2[i]).toFixed(1));
    i++;
}
console.log(percentages3);

// part 2 coding challenge #4
const bills1 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips1 = [];
const total1 = [];

// const calcTip = function (bill) {
//     return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// }

for (let i = 0; i < bills1.length; i++) {
    tips1.push(calcTip(bills1[i]));
    total1.push(bills1[i] + tips1[i]);
}
console.log(tips1);
console.log(total1);

const calcAverage1 = function (arr) {
    let sum = 0;
    for (i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage1(total1));