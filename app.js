const users = {
  Ishaan: "Ishaan",
  Aditya: "Aditya",
  Shaunak: "Shaunak"
};

let currentUser = null;
let sets = [];

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (users[user] === pass) {
    currentUser = user;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("appScreen").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = `Welcome, ${user}`;
    document.getElementById("calendar").valueAsDate = new Date();
    loadWorkout();
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  currentUser = null;
  sets = [];
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("appScreen").classList.add("hidden");
}

function addSet() {
  const machine = document.getElementById("machine").value;
  const weight = document.getElementById("weight").value;
  const reps = document.getElementById("reps").value;
  if (machine && weight && reps) {
    sets.push({ machine, weight, reps });
    updateSetsList();
    document.getElementById("machine").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("reps").value = "";
  }
}

function updateSetsList() {
  const container = document.getElementById("setsList");
  container.innerHTML = "";
  sets.forEach((s, i) => {
    container.innerHTML += `<div>${s.machine}: ${s.weight}kg × ${s.reps} reps</div>`;
  });
}

function saveWorkout() {
  const date = document.getElementById("calendar").value;
  const splits = Array.from(document.getElementById("splitSelect").selectedOptions).map(opt => opt.value);
  if (!date || sets.length === 0) {
    alert("Please enter workout data");
    return;
  }
  const allData = JSON.parse(localStorage.getItem("workouts") || "{}");
  if (!allData[currentUser]) allData[currentUser] = {};
  allData[currentUser][date] = { splits, sets };
  localStorage.setItem("workouts", JSON.stringify(allData));
  alert("Workout saved!");
  sets = [];
  updateSetsList();
}

function loadWorkout() {
  const date = document.getElementById("calendar").value;
  const allData = JSON.parse(localStorage.getItem("workouts") || "{}");
  const entry = allData[currentUser]?.[date];
  if (entry) {
    document.getElementById("calendarView").innerHTML =
      `<b>Split:</b> ${entry.splits.join(", ")}<br>` +
      entry.sets.map(s => `${s.machine}: ${s.weight}kg × ${s.reps} reps`).join("<br>");
  } else {
    document.getElementById("calendarView").innerText = "No workout found.";
  }
}
