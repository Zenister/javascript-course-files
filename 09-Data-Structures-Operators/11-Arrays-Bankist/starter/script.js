'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// display movements into the movements__row class
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // if sort is true then movements.slice() will create a shallow copy of the movements, because .sort method mutates the original array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// get the balance of account.movements
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  // In
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  // Out
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// create a username from the acc.owner property
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

// Update UI function
const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
    //&& acc.pin === Number(inputLoginPin.value)
  );
  console.log(currentAccount); // here at the moment to see the result

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // what blue does is remove the cursor in the pin input field

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiveAcc && // check if receiverAcc exist if not then return undefined, because if this is not here then the code will proceed with undefined
    currentAccount.balance >= amount &&
    receiveAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1); // splice mutates the target value
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sortedPhase = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // My version of sortedPhase
  // displayMovements(
  //   currentAccount.movements,
  //   sortedPhase ? (sortedPhase = false) : (sortedPhase = true)
  // );
  displayMovements(currentAccount.movements, !sortedPhase);
  sortedPhase = !sortedPhase;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // we can create a shallow copy of an array by not passing a beginning and end
// console.log([...arr]); // we can also create shallow array using the spread method, but it's a matter of preference on which will use.

// // SPLICE - changes the original array, while slice doesn't. It mutates the original array
// // console.log(arr.splice(2)); // output ['c', 'd', 'e']
// // console.log(arr); // output ['a', 'b']
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2); // the first paramter is the beginning, while the second is how many data it should delete.
// console.log(arr);

// // REVERSE
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'j'];
// console.log(arr2.reverse()); // reverse mutate the original array
// console.log(arr);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' -  '));

// // at method
// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // getting the last element in traditional way
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// // now the at method to get the last value
// console.log(arr3.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log('----forEach----');
// // first parameter is the current element, index is the index of the array and array is the entire array
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// // forEach on Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // forEach on Sets
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${_}: ${value}`);
// });

// Arrays coding challenge #1
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCopy = dogsJulia.slice(1, -2);
//   console.log(dogsJuliaCopy);
//   const bothDogs = [...dogsJuliaCopy, ...dogsKate];
//   console.log(bothDogs);
//   bothDogs.forEach(function (value, i) {
//     if (value >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${value} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // map method
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// console.log(movements);
// console.log(movementsUSD);

// // map using arrow function
// const movementsUSDArrow = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSDArrow);

// const movementsDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescription);

// filter method
// const deposit = movements.filter(mov => mov > 0);
// console.log(deposit);
// difference between the .filter and .map method
// .filter returns the value while .map returns a new array based on the condition
// const depositMap = movements.map(mov => mov > 0);
// console.log(depositMap);
// const withdrawal = movements.filter(mov => mov < 0);
// console.log(withdrawal);

// reduce method - is for boiling down the array into just one single value
// console.log(movements);
// accumulator is like SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);

// reduced using arrow function
// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance);

// for loop example
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// reduce to get the maximum value
// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov), // what is being returned, became the new accumulator
//   movements[0]
// );
// console.log(max);

// coding challenge #2
// const calcAverageHumanAge = ages =>
//   ages
//     .map(val => (val <= 2 ? 2 * val : 16 + val * 4))
//     .filter(val => val >= 18)
//     .reduce((acc, val, _, arr) => acc + val / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// the magic of chaining methods
// const eurToUsd = 1.1;

// PIPELINE
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUSD);

// find method
// the find method returns the first value where the condition is true
// difference beteen filter and find method is filter returns an array where the condition is true and in find it returns the value not array
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for of loop equivalent
// const accountFor = function (acc) {
//   for (const accs of acc) {
//     if (accs.owner === 'Jessica Davis') {
//       console.log(accs);
//     }
//   }
// };
// accountFor(accounts);

// findIndex method - simular to find method, but it returns the index where the condition is true

// some and every method

// console.log(movements);

// // EQUALITY
// console.log(movements.includes(-130));

// // SOME: CONDITION
// // some returns boolean value base on the condition
// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// // EVERY: CONDITION
// // every returns true if all of the array satisfy the condition
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // seperate callback
// // you can store the callback function into a variable and just call them
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // flat and flat map
// const arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];
// console.log(arr.flat());
// const arrDeep = [
//   [[1, 2], 3],
//   [4, [5, 6]],
//   [7, 8, 9],
// ];
// console.log(arrDeep.flat(2)); // we can pass an argument on how deep the nesting we can flat

// // const accountsMovement = accounts.map(acc => acc.movements);
// // console.log(accountsMovement.flat());
// // flat
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

// // flatMap
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

// // Sorting arrays - sorting mutates the original array
// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);
// movements.sort();

// // if we return < 0, then A will be before B (keep order)
// // if we return > 0, then B will be before A (switch order)
// // Ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });
// movements.sort((a, b) => a - b);
// console.log(movements);
// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (b > a) return 1;
// // });
// movements.sort((a, b) => b - a);
// console.log(movements);

// // more ways of creating and fillings array
// // Empty Arrays + fill method
// const x = new Array(7);
// console.log(x);

// // x.fill(1); // fill mutates the array
// // fill syntax (value), (value, start), (value, start, end)
// x.fill(1, 3, 5);
// console.log(x);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const randomDice = Array.from(
//   { length: 100 },
//   () => Math.floor(Math.random() * 6) + 1
// );
// console.log(randomDice);

// labelBalance.addEventListener('click', function () {
//   // Array.from() has a callback function
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// // more array methods practice
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// // 2
// const numberDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(numberDeposit1000);

// // Prefixed ++ operator
// let a = 10;
// console.log(++a);
// console.log(a);

// // 3
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       // used [] bracket notation since you can access the property of an object using . or [], but with [] it's more flexible and you can pass
//       // an expression
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits, withdrawals);

// //4
// // this is a nice title -> This Is a Nice Title
// const converTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase);
// };
// console.log(converTitleCase('this is a nice title'));
// console.log(converTitleCase('this is a LONG title but not too long'));
// console.log(converTitleCase('and here is another tittle with an EXAMPLE'));

// coding challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log(dogs[0].weight ** 0.75 * 28);
// 1
dogs.forEach(
  dogs => (dogs.recommendedFood = Math.trunc(dogs.weight ** 0.75 * 28))
);
// check which dogs are eating too much
const checkDogEat = function (food) {
  food.forEach(dogs => {
    if (
      dogs.curFood >= dogs.recommendedFood * 0.9 &&
      dogs.curFood <= dogs.recommendedFood * 1.1
    ) {
      dogs.isDogEating = 0;
    } else if (dogs.curFood < dogs.recommendedFood * 0.9) {
      dogs.isDogEating = -1;
    } else if (dogs.curFood > dogs.recommendedFood * 1.1) {
      dogs.isDogEating = 1;
    }
  });
};
checkDogEat(dogs);
console.log(dogs);
// 2
const Sarah = dogs.find(dogs => dogs.owners.includes('Sarah'));
// console.log(Sarah.isDogEating > 0 ? 'Sarah dog is eating too much' : '');
// solution
console.log(
  `Sarah's dog is eating too ${
    Sarah.curFood > Sarah.recommendedFood ? 'much' : 'little'
  }`
);

// 3
const ownerEatTooMuch = dogs
  .filter(dogs => dogs.isDogEating > 0)
  .flatMap(owner => owner.owners);
console.log(ownerEatTooMuch);
const ownereatTooLittle = dogs
  .filter(dogs => dogs.isDogEating < 0)
  .flatMap(owner => owner.owners);

console.log(ownereatTooLittle);
// 4
console.log(`${ownerEatTooMuch.join(' and ')} dogs eat too much!`);
console.log(`${ownereatTooLittle.join(' and ')} dogs eat too little!`);
// 5
console.log(dogs.some(dogs => dogs.curFood === dogs.recommendedFood));
// 6
console.log(dogs.some(dogs => dogs.isDogEating === 0));
// 7
const dogOkayAmount = dogs.filter(dogs => dogs.isDogEating === 0);
console.log(dogOkayAmount); 
// 8
const foodSort = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(foodSort);
