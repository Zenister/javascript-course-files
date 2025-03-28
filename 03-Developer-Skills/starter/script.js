// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// coding challenge 1
// need to create a function called printForecast
// loop through the whole array
// take the index of the loop and assign it as days
// print the output

const printForecast = function (arr) {
  let forecast = [];
  for (let i = 0; i < arr.length; i++) {
    forecast += `...${arr[i]}C in ${i + 1} days`;
    console.log(typeof forecast);
  }
  return forecast;
};

console.log(printForecast([21, 5, -5, 0, 4]));
