'use strict';

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 1000); // you can't leave out the second argument as empty so we put undefined

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24213123284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;
//   if (passenger.passport === 24213123284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };

// newPassport(jonas);
// console.log(jonas);
// checkIn(flight, jonas);
// the value of jonas changed, because you can change the value of an object inside a function, because what being passed through is the value
// of the reference or the address of that object.

// higher order function or function callback
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// // higher-order function
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('Javascript is the best!', upperFirstWord);
// transformer('Javascript is the best!', oneWord);

// // JS uses callback all the time
// const high5 = function () {
//   console.log('👋');
// };
// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// // calling function and another function
// greet('Hello')('Jonas');

// // arrow function challenge
// const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// greetArrow('Hello')('Arrow');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call Method
const book = lufthansa.book;
// .call() method takes the first value to point it to a new this location and will take the rest of the value as argument to the function
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Pooper');
console.log(swiss);

// Apply Method
// Apply method takes first argument of .this location and array values as a second argument.
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// there's now a better way of doing this and just use call method and spread the rest of the array data using REST
book.call(swiss, ...flightData);

// Bind Method
// what does bind is basically even better than call and apply method, where in bind you just straight up assign the function of an object
// into a new variable and use it to connect the .this method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// in bind you can already pre-defined an argument for the first parameter of the function by declaring it in parameter
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
console.log(addVat(100));
console.log(addVat(23));

// function expression
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVat2 = addTaxRate(0.23);
console.log(addVat2(100));

// arrow function
const addTaxArrow =
  (tax = 0.23) =>
  value =>
    value + value * tax;
console.log(addTaxArrow()(23));

// coding challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
    );
    // solution and using short-circuiting
    // typeof answer === 'number' && answer < this.answers.len  gth && this.answers[answer]++;
    if (answer >= 0 && answer <= 3) {
      switch (answer) {
        case 0:
          this.answers[0] += 1;
          break;
        case 1:
          this.answers[1] += 1;
          break;
        case 2:
          this.answers[2] += 1;
          break;
        case 3:
          this.answers[3] += 1;
          break;
      }
    } else {
      console.log('Please pick the right four options');
    }
    this.displayResults(this.answers);
  },
  displayResults(type) {
    console.log(type);
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const bonusResults = poll.displayResults.bind(poll);
// bonusResults([5, 2, 3]);
// bonusResults([1, 5, 3, 9, 6, 1]);

// Immediately Invoked Function Expression
// IIFE
(function () {
  console.log('This will never run again');
})();

// IIFE Arrow function
(() => console.log('This will ALSO never run again'))();

// Closure
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// more Closure example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();

// re-assigning f-function
h();
f();

// closure example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(() => {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

// coding challenge #2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  console.dir(header);
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();