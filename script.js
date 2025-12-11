/* ==========================================
   EcoLife Adventure — Script (Full)
   Includes Quiz + Challenges + Pledges + Carbon Calculator
========================================== */

/* ------------------------------
   CARBON CALCULATOR SECTION
------------------------------ */

document.getElementById("calc-btn").addEventListener("click", () => {
  
  const e = parseFloat(document.getElementById("electricity").value) || 0;
  const l = parseFloat(document.getElementById("lpg").value) || 0;
  const w = parseFloat(document.getElementById("water").value) || 0;
  const g = parseFloat(document.getElementById("waste").value) || 0;
  const t = parseFloat(document.getElementById("transport").value);
  const f = parseFloat(document.getElementById("food").value);

  // Emission factors (standard)
  const electricityEF = 0.82;     // kg CO2 per kWh (BD value)
  const lpgEF = 3.0;              // per kg
  const waterEF = 0.0003;         // per liter
  const wasteEF = 1.2;            // per kg
  const transportEF = t;          // selected from dropdown
  const foodEF = f;               // selected from dropdown

  // Calculate
  const electricityCO2 = e * electricityEF;
  const lpgCO2 = l * lpgEF;
  const waterCO2 = w * waterEF;
  const wasteCO2 = g * wasteEF;
  const transportCO2 = transportEF;
  const foodCO2 = foodEF;

  const total = electricityCO2 + lpgCO2 + waterCO2 + wasteCO2 + transportCO2 + foodCO2;

  const resultBox = document.getElementById("calc-result");

  resultBox.innerHTML = `
    <h3 style="color:var(--neon)">Daily Carbon Footprint</h3>
    <p><strong>${total.toFixed(2)} kg CO₂e / day</strong></p>

    <h4 style="margin-top:10px;color:#bdeccf">Breakdown</h4>
    <ul>
      <li>Electricity: ${electricityCO2.toFixed(2)}</li>
      <li>LPG: ${lpgCO2.toFixed(2)}</li>
      <li>Water: ${waterCO2.toFixed(3)}</li>
      <li>Waste: ${wasteCO2.toFixed(2)}</li>
      <li>Transport: ${transportCO2.toFixed(2)}</li>
      <li>Food: ${foodCO2.toFixed(2)}</li>
    </ul>

    <h4 style="margin-top:10px;color:#bdeccf">Suggestions</h4>
    <ul>
      <li>Reduce electricity by switching off unused appliances.</li>
      <li>Shorter showers reduce water emissions.</li>
      <li>Walk or cycle for short distances.</li>
      <li>Choose more plant-based meals.</li>
      <li>Try to generate less waste — reuse and recycle.</li>
    </ul>
  `;
});

/* ------------------------------
   QUIZ (unchanged)
------------------------------ */

const questions = [
  {
    q: "How many single-use plastics did you avoid today?",
    options: [
      { text: "0", value: 0 },
      { text: "1–2", value: 10 },
      { text: "3–5", value: 20 },
      { text: "More than 5", value: 30 }
    ]
  },
  {
    q: "Did you choose walking/cycling/public transport instead of a car?",
    options: [
      { text: "No", value: 0 },
      { text: "Partially", value: 15 },
      { text: "Yes", value: 25 }
    ]
  },
  {
    q: "How much water did you consciously save today?",
    options: [
      { text: "<2 liters", value: 5 },
      { text: "2–5 liters", value: 15 },
      { text: "5–10 liters", value: 20 },
      { text: "10+ liters", value: 25 }
    ]
  },
  {
    q: "Did you practice eco-friendly consumption today?",
    options: [
      { text: "Not today", value: 0 },
      { text: "A little", value: 10 },
      { text: "Yes, actively", value: 20 }
    ]
  },
  {
    q: "Did you reduce electricity use today?",
    options: [
      { text: "No", value: 0 },
      { text: "A bit", value: 10 },
      { text: "Yes actively", value: 20 }
    ]
  }
];

let current = 0;
let totalScore = 0;

const questionArea = document.getElementById("question-area");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreText = document.getElementById("score");

document.querySelectorAll('a[href="#quiz"]').forEach(el=>{
  el.addEventListener("click", () => {
    setTimeout(()=> {
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "Start";
    }, 300);
  });
});

nextBtn.addEventListener("click", () => {
  if (nextBtn.textContent === "Start") {
    loadQuestion();
    nextBtn.style.display = "none";
  }
});

function loadQuestion() {
  if (current >= questions.length) return finishQuiz();

  const q = questions[current];
  questionArea.innerHTML = `
    <div class="card">
      <h3 style="color:var(--neon)">${q.q}</h3>
      <div class="options">
        ${q.options.map(o=>`<div class="option" data-val="${o.value}">${o.text}</div>`).join("")}
      </div>
    </div>
  `;

  document.querySelectorAll(".option").forEach(opt=>{
    opt.addEventListener("click", () => {
      totalScore += Number(opt.getAttribute("data-val"));
      current++;
      loadQuestion();
    });
  });
}

function finishQuiz(){
  const max = questions.reduce((s,q)=> s + Math.max(...q.options.map(o=>o.value)), 0);
  const percent = Math.round((totalScore / max) * 100);

  questionArea.innerHTML = `
    <div style="text-align:center">
      <h2 style="color:var(--neon)">Journey Complete!</h2>
      <p>Your Eco Score is ${percent}%</p>
    </div>
  `;

  progressEl.style.width = percent + "%";
  scoreText.textContent = percent + "%";

  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Play Again";
  nextBtn.onclick = () => location.reload();
}

window.addEventListener("load", ()=>{
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Start";
});

/* ------------------------------
   ACTIVITIES + PLEDGES
------------------------------ */

const challenges = [
  "Skip one single-use plastic today.",
  "Walk instead of short car trips.",
  "Unplug chargers for 1 hour.",
  "Have a plant-based meal.",
  "Shorten one shower by 1 minute."
];

document.getElementById("generate-challenge").addEventListener("click", ()=>{
  const pick = challenges[Math.floor(Math.random()*challenges.length)];
  document.getElementById("challenge-output").textContent = "➤ " + pick;
});

document.getElementById("pledge-btn").addEventListener("click", ()=>{
  const val = document.getElementById("pledge-input").value.trim();
  if(!val) return alert("Write a pledge first.");
  const node = document.createElement("div");
  node.textContent = "• " + val;
  node.style.marginTop = "8px";
  document.getElementById("pledge-list").prepend(node);
  document.getElementById("pledge-input").value = "";
});


