// 1 Values and Variables
const country = "Japan";
const continent = "Asia"
const population = 145000000;
// const population = 5000000;
// let population = 130;
console.log(country);
console.log(continent);
console.log(population);

// 2 Data Types
const isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// 3 let, const and var
let countrySplit = population / 2;
countrySplit++;
console.log(countrySplit);
const finland = 6000000;
const isCountryLarger = population > finland;
console.log(isCountryLarger);
const averagePopulation = 33000000;
const isAveragePopulationGreater = country < averagePopulation;
console.log(isAveragePopulationGreater);
const description = 'Portugal is in Europe, and its 11 million people speak portuguese';
console.log(description);

// 4 : Strings and Template Literals
console.log(`${description}`);

// 5 Taking Decisions: if / else Statements
if (population > averagePopulation) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s populatin is ${population - averagePopulation} below average`);
}

// 6 Type Conversion and Coercion
console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); // 617
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2); // 1143

// 7 Equality Operators: == vs. ===
/*
const numNeighbours = Number(prompt("How many neighbour countries does your country have?"));
if (numNeighbours === 1) {
    console.log("Only 1 border!");
} else if (numNeighbours >= 1) {
    console.log("More than 1 border")
} else {
    console.log("No Borders");
}
// use === operator when comparing strict values and should maintain on using that instead of the == which is the loose version of the operator
*/
// 8 Logical Operators
language = 'Japanese';
const isCountryEnglish = 'English'
if (isCountryEnglish === language && population <= 5000000) {
    console.log('You should live in Japan :)');
} else {
    console.log("Japan does not meet your criteria :(");
}

// 9 The switch Statement
const languageOne = 'english';

switch (languageOne) {
    case 'mandarin':
        console.log("MOST number of native speakers!");
        break;
    case 'spanish':
        console.log("2nd place in number of native speakers");
        break;
    case 'english':
        console.log("3rd place");
        break;
    case 'hindi':
        console.log("Number 4");
        break;
    case 'arabic':
        console.log("5th most spoken language");
        break;
    default:
        console.log("Great language too :D");
}

// 10 The Conditional (Ternary) Operator
const samplePopulation = 130;
console.log(`Japan's population is ${population > averagePopulation ? 'above' : 'below'} average`);
console.log(`Japan's population is ${samplePopulation > averagePopulation ? 'above' : 'below'} average`);
