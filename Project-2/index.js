 // MASTER DATASET (Same Always)
  let masterData = [];
  for (let i = 1; i <= 50; i++) {
    masterData.push({
      roll: i,
      name: "Student " + i,
      marks: Math.floor(Math.random() * 41) + 60 // 60–100 marks
    });
  }

  // SHUFFLED DISPLAY DATA
  let shuffledData = [...masterData].sort(() => Math.random() - 0.5);

  function findStudent() {
    const roll = Number(document.getElementById("rollInput").value);
    const approach = document.getElementById("approach").value;

    const resultBox = document.getElementById("resultBox");
    const stepsBox = document.getElementById("stepsBox");
    const strategyBox = document.getElementById("strategyBox");

    resultBox.innerHTML = "";
    stepsBox.innerHTML = "";
    strategyBox.classList.add("hidden");

    if (!roll || roll < 1 || roll > 50) {
      alert("Enter a valid roll number (1–50)");
      return;
    }

    if (approach === "linear") {
      linearSearch(roll);
    } 
    else if (approach === "smart") {
      strategyBox.classList.remove("hidden");
      smartSearch(roll);
    } 
    else {
      binaryStyleSearch(roll);
    }
  }

  // APPROACH 1 — ONE BY ONE
  function linearSearch(roll) {
    let steps = 0;
    for (let i = 0; i < masterData.length; i++) {
      steps++;
      logStep(`Checked Roll ${masterData[i].roll}`);
      if (masterData[i].roll === roll) {
        showResult(masterData[i], steps, "One-by-One Search");
        return;
      }
    }
  }

  // APPROACH 2 — STUDENT STRATEGY
  function smartSearch(roll) {
    let student = masterData.find(s => s.roll === roll);
    const logic = document.getElementById("studentStrategy").value;
    const steps = document.getElementById("estimatedSteps").value || "Not given";

    logStep("Student applied their own strategy.");
    showResult(student, steps, "Student Smart Logic");

    if (logic) {
      logStep("Student Strategy: " + logic);
    }
  }

  // APPROACH 3 — BINARY STYLE
  function binaryStyleSearch(roll) {
    let data = [...masterData].sort((a, b) => a.roll - b.roll);
    let start = 0;
    let end = data.length - 1;
    let steps = 0;

    while (start <= end) {
      steps++;
      let mid = Math.floor((start + end) / 2);
      logStep(`Checked Middle Roll ${data[mid].roll}`);

      if (data[mid].roll === roll) {
        showResult(data[mid], steps, "Middle-Jump Logic");
        return;
      } 
      else if (roll > data[mid].roll) {
        start = mid + 1;
        logStep("Going Right");
      } 
      else {
        end = mid - 1;
        logStep("Going Left");
      }
    }
  }

  // RESULT DISPLAY
  function showResult(student, steps, approach) {
    document.getElementById("resultBox").innerHTML = `
      <b>Result:</b><br>
      Name: ${student.name}<br>
      Marks: ${student.marks}<br>
      Roll: ${student.roll}<br><br>
      Steps Taken: ${steps}<br>
      Approach Used: ${approach}
    `;
  }

  // STEP LOGGER
  function logStep(text) {
    const box = document.getElementById("stepsBox");
    box.innerHTML += text + "<br>";
  }