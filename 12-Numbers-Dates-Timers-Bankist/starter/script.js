'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2024-02-08T14:11:59.604Z',
    '2025-02-05T17:01:17.194Z',
    '2025-02-09T20:36:17.929Z',
    '2025-02-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// const formatMovementDate = function (date) {
//   // Calculate the milliseconds to days
//   const calcDayPassed = (date1, date2) =>
//     Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

//   const daysPassed = calcDayPassed(new Date(), date);
//   console.log(daysPassed);

//   const yearPassed = Math.floor(daysPassed / 365);

//   if (daysPassed === 0) return 'Today';
//   if (daysPassed === 1) return 'Yesterday';
//   if (daysPassed <= 7) return `${daysPassed} days ago`;
//   if (daysPassed >= 365) {
//     return `${yearPassed} year${yearPassed > 1 ? 's' : ''} ago  `;
//   } else {
//     const day = `${date.getDate()}`.padStart(2, 0);
//     const month = `${date.getMonth() + 1}`.padStart(2, 0);
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }
// };
const formatMovementDate = function (date, locale) {
  const daysPassed = Math.round(
    Math.abs(new Date() - date) / (1000 * 60 * 60 * 24)
  );

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

  // const yearsPassed = Math.floor(daysPassed / 365); // Use Math.floor for years

  // if (yearsPassed >= 1)
  //   return `${yearsPassed} year${yearsPassed > 1 ? 's' : ''} ago`; // Simplified year logic

  // const day = String(date.getDate()).padStart(2, '0');
  // const month = String(date.getMonth() + 1).padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// startLogOutTimer function
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}: ${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1 sec
    time--;
  };
  // Set time to 5 minutes
  let time = 10;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// // 1. Converting and Checking Numbers
// console.log(23 === 23.0);

// // Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.33333333
// // Binary base 2 - 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number('23'));
// console.log(+'23');
// console.log('23' + '23');

// // Parsing
// console.log(Number.parseInt('30px', 10)); // we get 30 here.
// console.log(Number.parseInt('e23', 10)); // we get NaN, because letter is the first value, if not then we get a number.

// console.log(Number.parseInt('2.5rem')); // output: 2
// console.log(Number.parseFloat('2.5rem')); // output 2.5

// // use isNaN to check if the value is NaN
// console.log(Number.isNaN(20)); // output: false
// console.log(Number.isNaN('20')); // output: false
// console.log(Number.isNaN(+'20X')); // +'20X' = NaN, therefore it is not a number(NaN) so we get true.
// console.log(Number.isNaN(23 / 0)); // output: Infinity - is a special value in javacript. Also dividing a number using 0 is equal to infinity.

// // isFinite() is the method is the best way of checking if a value is a number.
// console.log(Number.isFinite(20)); // output: true
// console.log(Number.isFinite('20')); // output: false
// console.log(Number.isFinite(+'20X')); // output: false
// console.log(Number.isFinite(23 / 0)); // output: false

// console.log(Number.isInteger(23)); // output: true
// console.log(Number.isInteger(23.0)); // output: true
// console.log(Number.isInteger(23.3)); // output: false, because now this is a decimal
// console.log(Number.isInteger(23 / 0)); // output: false

// // 2. Math and Rounding
// console.log(Math.sqrt(25)); // output: 5
// console.log(25 ** (1 / 2)); // output: 5
// console.log(8 ** (1 / 3)); // output: 2, this is the way to calculate cubic root

// // Math.max() to get the maximum value
// console.log(Math.max(5, 18, 23, 11, 2)); // output: 23
// console.log(Math.max(5, 18, '23', 11, 2)); // output: 23. This .max does type coercion so even if we pass a string number it will work.
// console.log(Math.max(5, 18, '23px', 11, 2)); // output: Nan. .max doesn't do parsing so we get NaN as output.

// // Math.min() to get the minimum value
// console.log(Math.min(5, 18, 23, 11, 2)); // output: 2. Basically the same as max, but reverse

// // This is how we calculate the area of a circle
// console.log(Math.PI * Number.parseFloat('10px') ** 2); // output: 314.1592653589793.

// console.log(Math.trunc(Math.random() * 6) + 1); // this is how we get a random value

// // const randomInt = (min, max) =>
// //   Math.trunc(Math.random() * (max - min) + 1) + min;
// // // Math.random() gives us a value from 0 to 1 then multiply it to the result of max - min then + 1 then + min value.
// // console.log(randomInt(10, 20));

// // Rounding integers - all of these method does type coercion so even if we pass '23', it will work.
// console.log(Math.trunc(23.3)); // output: 23, because trunc does is just remove the decimal part

// console.log(Math.round(23.3)); // output: 23
// console.log(Math.round(23.9)); // output: 24

// console.log(Math.ceil(23.3)); // output: 24, because .ceil rounds up the value
// console.log(Math.ceil(23.9)); // output: 24

// console.log(Math.floor(23.3)); // output: 23
// console.log(Math.floor(23.9)); // output: 23, because .floor rounds down the value

// console.log(Math.trunc(-23.3)); // output: -23
// console.log(Math.floor(-23.3)); // output: -24

// // better version - it will work in all situation whether you use positive or negative numbers
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
// console.log(randomInt(10, 20));

// // Rounding decimals
// console.log((2.7).toFixed(0)); // output: '3', but this 3 is in string value, because toFixed() returns a string.
// console.log((2.7).toFixed(3)); // output: '2.700', because the parameter determines how many decimal places.
// console.log((2.345).toFixed(2)); // output: '2.35'
// console.log(+(2.345).toFixed(2)); // output: 2.35

// // 3. The Remainder Operator
// console.log(5 % 2); // output: 1
// console.log(5 / 2); // output: 2.5

// console.log(8 % 3); // output: 2
// console.log(8 / 3); // output: 2.6666666666

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6, 8
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 3, 6, 9
//     if (i + (1 % 3) === 0) row.style.backgroundColor = 'blue';
//   });
// });

// // 4. Numeric Separators
// const diameter = 287_460_000_000;
// console.log(diameter); // output: 287460000000

// const price = 345_99;
// console.log(price); // output: 34599

// const transferFee = 15_00;
// console.log(transferFee); // output: 1500

// // 5. Working with BigInt
// console.log(2 ** 53 - 1); // output: 9007199254740991 - the highest number javascript can do.
// console.log(Number.MAX_SAFE_INTEGER); // output: 9007199254740991

// console.log(123123123124423423423423n);
// console.log(BigInt(123123123123423423423n));

// // Operations
// console.log(10000n + 10000n);

// const huge = 123123126782312n;
// const num = 23;
// console.log(huge * BigInt(num)); // you can't do an operation with BigInt and a normal number

// // Exception - logical operation
// console.log(20n > 15); // output: true
// console.log(20n === 20); // output: false, because === doesn't do type coercion
// console.log(typeof 20n); // output: bigInt
// console.log(20n == 20); // output: true, because == does type coercion

// console.log(huge + ' is REALLY big!!!!'); // output: '123123126782312 is REALLY big!!!!'

// // Division
// console.log(10n / 3n); // output: 3n it will simply then return the closest BigInt, like it cuts the decimal part.
// console.log(10 / 3); // output: 3.333333333

// // 6. Creating Dates
// const now = new Date();
// console.log(now);

// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(new Date(2142256980000));

// console.log(Date.now());

// future.setFullYear(2040);
// console.log(future);

// // 7. Operations with Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);
// // milliseconds * 1000 to convert to seconds * 60 to convert to minutes * 60 to convert to hours * 24 to convert it to days
// const calcDayPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDayPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1);

// // 8. Internationalizing Numbers (Intl)
// const num = 3884764.23;
// const options = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping: false, // useGrouping removes the ,. or separator and group them together
// };
// console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

// // 9. Timers setTimeout and setInterval
// // setTimeout
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting...'); // this mechanism is called Asynchronous Javascript

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// // setInterval
// setInterval(function () {
//   const now = new Date();
//   const hour = now.getHours();
//   const minute = now.getMinutes();
//   const second = now.getSeconds();
//   console.log(`${hour}:${minute}:${second}`);
// }, 1000);
