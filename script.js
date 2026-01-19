/* =========================
   Завдання 1 — delay(ms)
========================= */

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });
};

const delayBtn = document.getElementById('delayBtn');
const delayResult = document.getElementById('delayResult');

delayBtn.addEventListener('click', () => {
  delayResult.textContent = 'Очікуємо...';

  delay(2000).then(time => {
    delayResult.textContent = `Resolved after ${time}ms`;
  });
});

/* =========================
   Завдання 2 — toggleUserState
========================= */

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise(resolve => {
    const updatedUsers = allUsers.map(user =>
      user.name === userName
        ? { ...user, active: !user.active }
        : user
    );

    resolve(updatedUsers);
  });
};

const usersResult = document.getElementById('usersResult');
const toggleMango = document.getElementById('toggleMango');
const toggleLux = document.getElementById('toggleLux');

const renderUsers = usersList => {
  usersResult.textContent = usersList
    .map(user => `${user.name}: ${user.active}`)
    .join('\n');
};

renderUsers(users);

toggleMango.addEventListener('click', () => {
  toggleUserState(users, 'Mango').then(updated => {
    users.splice(0, users.length, ...updated);
    renderUsers(users);
  });
});

toggleLux.addEventListener('click', () => {
  toggleUserState(users, 'Lux').then(updated => {
    users.splice(0, users.length, ...updated);
    renderUsers(users);
  });
});

/* =========================
   Завдання 3 — makeTransaction
========================= */

const randomIntegerFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const makeTransaction = transaction => {
  return new Promise((resolve, reject) => {
    const delay = randomIntegerFromInterval(200, 500);

    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        resolve({ id: transaction.id, time: delay });
      } else {
        reject(transaction.id);
      }
    }, delay);
  });
};

const transactionBtn = document.getElementById('transactionBtn');
const transactionResult = document.getElementById('transactionResult');

transactionBtn.addEventListener('click', () => {
  transactionResult.textContent = 'Обробка...';

  makeTransaction({ id: Date.now(), amount: 100 })
    .then(({ id, time }) => {
      transactionResult.textContent =
        `Transaction ${id} processed in ${time}ms`;
    })
    .catch(id => {
      transactionResult.textContent =
        `Error processing transaction ${id}`;
    });
});