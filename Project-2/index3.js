let masterData = [];
for (let i = 1; i <= 50; i++) {
  masterData.push({
    roll: i,
    name: "Student " + i,
    marks: Math.floor(Math.random() * 41) + 60
  });
}

let searchData = [...masterData].sort((a, b) => a.roll - b.roll);
let displayData = [...searchData];

/* ===================== UI ===================== */
function renderStudentList() {
  const box = document.getElementById("studentList");
  box.innerHTML = "";
  displayData.forEach(s => {
    const div = document.createElement("div");
    div.className = "student-card";
    div.id = "student-" + s.roll;
    div.innerHTML = `${s.roll}<br>${s.name}<br>${s.marks}`;
    box.appendChild(div);
  });
}
renderStudentList();

function shuffleData() {
  displayData.sort(() => Math.random() - 0.5);
  renderStudentList();
  alert("Shuffled!");
}

/* ===================== CONTROL ===================== */
function findStudent() {
  const roll = Number(rollInput.value);
  const approach = approachSelect.value;

  resultBox.innerHTML = "";
  stepsBox.innerHTML = "";
  strategyBox.classList.add("hidden");

  document.querySelectorAll(".student-card").forEach(card => {
    card.className = "student-card";
  });

  if (!roll || roll < 1 || roll > 50) return alert("Invalid Roll");

  if (approach === "linear") linearSearch(roll);
  if (approach === "smart") {
    strategyBox.classList.remove("hidden");
    smartSearch(roll);
  }
  if (approach === "binary") binarySearchAnimated(roll);
}

/* ===================== LINEAR ===================== */
async function linearSearch(roll) {
  let steps = 0;
  for (let s of searchData) {
    steps++;
    let card = document.getElementById("student-" + s.roll);
    card.classList.add("active");
    logStep("Checked " + s.roll);
    await sleep(400);

    if (s.roll === roll) {
      card.classList.add("found");
      showResult(s, steps, "One-by-One");
      return;
    }
    card.classList.remove("active");
    card.classList.add("checked");
  }
}

/* ===================== SMART ===================== */
function smartSearch(roll) {
  const student = searchData.find(s => s.roll === roll);
  const steps = estimatedSteps.value || "Not Given";
  logStep("Student used custom logic");
  showResult(student, steps, "Student Logic");
}

/* ===================== ✅ BINARY WITH ANIMATION ===================== */
async function binarySearchAnimated(roll) {
  let data = [...searchData];
  let start = 0;
  let end = data.length - 1;
  let steps = 0;

  while (start <= end) {
    steps++;
    let mid = Math.floor((start + end) / 2);

    highlightRange(start, end);
    let card = document.getElementById("student-" + data[mid].roll);
    card.classList.add("active");

    logStep("Checked Middle → " + data[mid].roll);
    await sleep(800);

    if (data[mid].roll === roll) {
      card.classList.add("found");
      showResult(data[mid], steps, "Middle-Jump Logic");
      return;
    }

    card.classList.remove("active");

    if (roll > data[mid].roll) {
      logStep("Going RIGHT");
      start = mid + 1;
    } else {
      logStep("Going LEFT");
      end = mid - 1;
    }
    await sleep(600);
  }
}

function highlightRange(start, end) {
  document.querySelectorAll(".student-card").forEach(c => {
    c.classList.add("fade");
  });

  for (let i = start; i <= end; i++) {
    const card = document.getElementById("student-" + searchData[i].roll);
    card.classList.remove("fade");
  }
}

/* ===================== HELPERS ===================== */
function showResult(student, steps, approach) {
  resultBox.innerHTML = `
    <b>Result</b><br>
    Name: ${student.name}<br>
    Marks: ${student.marks}<br>
    Roll: ${student.roll}<br><br>
    Steps: ${steps}<br>
    Approach: ${approach}
  `;
}

function logStep(text) {
  stepsBox.innerHTML += text + "<br>";
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* ===================== DOM SHORTCUTS ===================== */
const rollInput = document.getElementById("rollInput");
const approachSelect = document.getElementById("approach");
const resultBox = document.getElementById("resultBox");
const stepsBox = document.getElementById("stepsBox");
const strategyBox = document.getElementById("strategyBox");
const estimatedSteps = document.getElementById("estimatedSteps");