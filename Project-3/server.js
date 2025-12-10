/* ===================== MASTER DATA (HIDDEN) ===================== */

let masterData = [];

// ✅ Step 1: Create sorted marks (50 → 99)
let marksPool = [];
for (let i = 50; i < 100; i++) {
  marksPool.push(i); // 50 to 99 (50 students)
}

// ✅ Step 2: Rolls are FIXED in order, Marks also assigned in order
for (let i = 1; i <= 50; i++) {
  masterData.push({
    roll: i,                   // ✅ Roll always 1 → 50
    name: "Student " + i,
    marks: marksPool[i - 1]    // ✅ Marks also ascending
  });
}

// ✅ Final dataset used by all 3 approaches
let searchData = [...masterData];

console.log(searchData);

/* ===================== UI (HIDDEN VIEW) ===================== */
function renderHiddenList() {
  const box = document.getElementById("studentList");
  box.innerHTML = "";
  searchData.forEach(s => {
    const div = document.createElement("div");
    div.className = "student-card";
    div.id = "student-" + s.roll;
    div.innerHTML = `Roll ${s.roll}<br>❓❓❓`;
    box.appendChild(div);
  });
}
renderHiddenList();

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
    smartGuessSearch(roll);
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
    logStep("Checked Roll " + s.roll);
    await sleep(400);

    if (s.roll === roll) {
      card.classList.add("found");
      revealStudent(card, s);
      showResult(s, steps, "One-by-One");
      return;
    }
    card.classList.remove("active");
    card.classList.add("checked");
  }
}

/* ===================== ✅ APPROACH 2 — GUESS BASED ===================== */
function smartGuessSearch(roll) {
  const student = searchData.find(s => s.roll === roll);

  const card = document.getElementById("student-" + roll);
  card.classList.add("found");
  revealStudent(card, student);

  logStep("Student guessed roll → " + roll);
  showResult(student, "Self Attempts", "Student Guess Logic");
}

/* ===================== ✅ BINARY WITH ANIMATION ===================== */
async function binarySearchAnimated(roll) {
  let start = 0;
  let end = searchData.length - 1;
  let steps = 0;

  while (start <= end) {
    steps++;
    let mid = Math.floor((start + end) / 2);

    highlightRange(start, end);
    let student = searchData[mid];
    let card = document.getElementById("student-" + student.roll);
    card.classList.add("active");

    logStep("Checked Middle → " + student.roll);
    await sleep(800);

    if (student.roll === roll) {
      card.classList.add("found");
      revealStudent(card, student);
      showResult(student, steps, "Middle-Jump Logic");
      return;
    }

    card.classList.remove("active");

    if (roll > student.roll) {
      logStep("Going RIGHT");
      start = mid + 1;
    } else {
      logStep("Going LEFT");
      end = mid - 1;
    }
    await sleep(600);
  }
}

/* ===================== RANGE HIGHLIGHT ===================== */
function highlightRange(start, end) {
  document.querySelectorAll(".student-card").forEach(c => {
    c.classList.add("fade");
  });

  for (let i = start; i <= end; i++) {
    const card = document.getElementById("student-" + searchData[i].roll);
    card.classList.remove("fade");
  }
}

/* ===================== REVEAL DATA ONLY WHEN FOUND ===================== */
function revealStudent(card, student) {
  card.innerHTML = `
    ${student.roll}<br>
    ${student.name}<br>
    ${student.marks}
  `;
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
