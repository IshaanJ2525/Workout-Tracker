const allowedUsers = {
  ishaan: "ishaan",
  shaunak: "shaunak",
  aditya:   "aditya"
};

let currentUser = null;

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('login-user').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  if (!allowedUsers[username]) {
    alert("Unauthorized user.");
    return;
  }
  if (allowedUsers[username] !== password) {
    alert("Incorrect password.");
    return;
  }
  currentUser = username;
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('app-section').style.display = 'block';
  renderTable();
});

document.getElementById('workout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!currentUser) return;
  const entry = {
    date: document.getElementById('date').value,
    split: document.getElementById('split').value,
    machine: document.getElementById('machine').value.trim(),
    sets: document.getElementById('sets').value,
    weight: document.getElementById('weight').value
  };
  const key = `workouts_${currentUser}`;
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  data.push(entry);
  localStorage.setItem(key, JSON.stringify(data));
  renderTable();
  this.reset();
});

document.getElementById('view-date').addEventListener('change', function () {
  const selected = this.value;
  const data = JSON.parse(localStorage.getItem(`workouts_${currentUser}`) || '[]');
  const list = data.filter(w => w.date === selected);
  const div = document.getElementById('day-log');
  if (!list.length) {
    div.innerHTML = `<p>No workouts on ${selected}</p>`;
  } else {
    div.innerHTML = `<ul>${list.map(w =>
      `<li>${w.machine}: ${w.sets} sets @ ${w.weight}kg (${w.split})</li>`
    ).join('')}</ul>`;
  }
});

function renderTable() {
  const data = JSON.parse(localStorage.getItem(`workouts_${currentUser}`) || '[]');
  const tbody = document.getElementById('log-body');
  tbody.innerHTML = '';
  data.forEach(w => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${w.date}</td>
      <td>${w.split}</td>
      <td>${w.machine}</td>
      <td>${w.sets}</td>
      <td>${w.weight}</td>`;
    tbody.appendChild(row);
  });
}

function logout() {
  currentUser = null;
  document.getElementById('app-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('login-form').reset();
  document.getElementById('view-date').value = '';
  document.getElementById('day-log').innerHTML = '';
  document.getElementById('log-body').innerHTML = '';
}
