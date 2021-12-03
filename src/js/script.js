const form = document.querySelector('form');
const formContainer = document.querySelector('.form__container');
const loginBtn = document.querySelector('.login__btn');
const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');
const movementPay = document.querySelector('.movements__pay');
const movementContainer = document.querySelector('.movement__container');
const headingName = document.querySelector('.heading__name');

const labelBalance = document.querySelector('.balance__value');

const account1 = {
  owner: 'Benjo Quilario',
  usnID: 19002885200,
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Vergel Macayan',
  usnID: 19002885200,
  movements: [900, -450, -400, 9000, 650, -130, 70, 1300, 100],
  interestRate: 1.2, // %
  pin: 2222,
};

const account3 = {
  owner: 'Jhune Carlo Joves',
  usnID: 19002885200,
  movements: [800, 150, -400, 2000, -50, -1330, 60, 300],
  interestRate: 1.2, // %
  pin: 3333,
};

const account4 = {
  owner: 'Patrick Salgado',
  usnID: 19002885200,
  movements: [-70, 2300, 450, -400, 3000, 650, -130, -70, 1300],
  interestRate: 0.7, // %
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const displayMovements = function (movements) {
  movementPay.innerHTML = '';
  movements.forEach((mov) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__pay__row">
      <div class="movements__pay__type movements__pay--${type}">
        2 ${type}
      </div>
      <div class="movements__pay__date">3 days ago</div>
      <div class="movements__pay__value">₱${mov}</div>
    </div>`;

    movementPay.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movs) {
  const balance = movs.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} PHP`;
};

const createUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
    console.log(acc.username);
  });
};
createUsername(accounts);

let currentAccount;
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === loginInputUser.value
  );

  if (currentAccount?.pin === Number(loginInputPin.value)) {
    headingName.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    headingName.style.opacity = 100;
    formContainer.classList.add('form__containerTop');
    movementContainer.classList.add('show');

    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount.movements);
  }
});
