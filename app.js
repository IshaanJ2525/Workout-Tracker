const allowedUsers = {
  user1: "pass1",
  user2: "pass2",
  user3: "pass3"
};

let currentUser = "";
let selectedSplits = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-btn").addEventListener("click", login);
});

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (allowedUsers[user] === pass) {
    currentUser = user;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("welcome-user").innerText = `Welcome, ${currentUser}`;
    loadWorkoutData();
  } else {
    alert("Invalid username or password.");
  }
}

function toggleSplit(split) {
  const index = selectedSplits.indexOf(split);
  if (index === -1) {
    selectedSplits.push(split);
  } else {
    selectedSplits.splice(index, 1);
  }
  updateSplitButtonStyles();
}

function updateSplitButtonStyles() {
  document.querySelectorAll(".split-buttons button").forEach(btn => {
    if (selectedSplits.includes(btn.textContent)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function saveWorkout() {
  const machineName = document.getElementById("machine").value.trim();
  if (!machineName || selectedSplits.length === 0) {
    alert("Please enter a machine and select at least one split.");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const key = `${currentUser}-${today}`;
  const data = JSON.parse(localStorage.getItem(key) || "[]");
  data.push({ machine: machineName, splits: [...selectedSplits], time: new Date().toLocaleTimeString() });
  localStorage.setItem(key, JSON.stringify(data));
  document.getElementById("machine").value = "";
  selectedSplits = [];
  updateSplitButtonStyles();
  loadWorkoutData();
}

function loadWorkoutData() {
  const today = new Date().toISOString().split("T")[0];
  const key = `${currentUser}-${today}`;
  const data = JSON.parse(localStorage.getItem(key) || "[]");

  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  data.forEach((entry, index) => {
    const div = document.createElement("div");
    div.textContent = `${index + 1}. ${entry.machine} [${entry.splits.join(", ")}] @ ${entry.time}`;
    historyList.appendChild(div);
  });
}
