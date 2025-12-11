/* ===========================
   EcoLife Adventure — Logic
   Clean, minimal, well commented
   =========================== */

/* ---------- Quiz data ---------- */
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
    q: "Did you practice eco-friendly consumption today (repair/reuse/thrift)?",
    options: [
      { text: "Not today", value: 0 },
      { text: "A little", value: 10 },
      { text: "Yes, actively", value: 20 }
    ]
  },
  {
    q: "Did you reduce electricity usage by turning off unused devices?",
    options: [
      { text: "No", value: 0 },
      { text: "A bit", value: 10 },
      { text: "Yes actively", value: 20 }
    ]
  }
];

/* ---------- State ---------- */
let current = 0;
let totalScore = 0;

/* ---------- DOM refs ---------- */
const questionArea = document.getElementById("question-area");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const scoreText = document.getElementById("score");

/* ---------- Start button workaround (from hero) ---------- */
document.querySelectorAll('a[href="#quiz"]').forEach(el=>{
  el.addEventListener("click", (e)=>{
    setTimeout(()=> {
      // ensure start button visible if needed
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "Start";
    }, 300);
  });
});

/* ---------- Next / Start ---------- */
nextBtn.addEventListener("click", () => {
  if (nextBtn.textContent === "Start") {
    loadQuestion();
    nextBtn.style.display = "none";
  }
});

/* ---------- Load a question ---------- */
function loadQuestion() {
  if (current >= questions.length) {
    finishQuiz();
    return;
  }

  const q = questions[current];
  questionArea.innerHTML = `
    <div class="card">
      <h3 style="color:var(--neon)">${escapeHTML(q.q)}</h3>
      <div class="options">
        ${q.options.map(o=>`<div class="option" data-val="${o.value}">${escapeHTML(o.text)}</div>`).join("")}
      </div>
    </div>
  `;

  // attach click handlers
  document.querySelectorAll(".option").forEach(opt=>{
    opt.addEventListener("click", () => {
      const val = Number(opt.getAttribute("data-val"));
      chooseOption(val);
    });
  });
}

/* ---------- When option chosen ---------- */
function chooseOption(value){
  totalScore += value;
  current++;
  loadQuestion();
}

/* ---------- Finish ---------- */
function finishQuiz(){
  const maxPossible = questions.reduce((s,q)=> s + Math.max(...q.options.map(o=>o.value)), 0);
  const percent = Math.min(Math.round((totalScore / maxPossible) * 100), 100);

  questionArea.innerHTML = `
    <div style="text-align:center">
      <h2 style="color:var(--neon)">🎉 Journey Complete!</h2>
      <p>Your Eco Score</p>
      <div style="margin-top:12px">
        <div class="progress" style="width:320px"><div id="final-progress" style="height:12px;border-radius:999px;background:linear-gradient(90deg,var(--neon),#00d2ff);width:0%;transition:width .8s ease"></div></div>
      </div>
      <h3 style="margin-top:12px;color:#bdeccf">${percent}%</h3>
      <p style="color:#9fbfb1">Tip: small changes add up — try a micro-challenge below.</p>
    </div>
  `;

  // animate final progress
  setTimeout(()=> {
    const final = document.getElementById("final-progress");
    if(final) final.style.width = percent + "%";
  }, 50);

  // update top progress bar
  progressEl.style.width = percent + "%";
  scoreText.textContent = percent + "%";

  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Play Again";
  nextBtn.onclick = () => location.reload();
}

/* ---------- Utility: escape text ---------- */
function escapeHTML(str){
  return String(str).replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

/* ---------- Activities: challenge + pledge ---------- */
const challenges = [
  "Skip one single-use plastic item today.",
  "Walk or cycle for short trips instead of driving.",
  "Unplug unused chargers for 1 hour.",
  "Have a plant-based meal today.",
  "Shorten one shower by 1 minute."
];

document.getElementById("generate-challenge").addEventListener("click", ()=>{
  const pick = challenges[Math.floor(Math.random()*challenges.length)];
  document.getElementById("challenge-output").textContent = "➤ " + pick;
});

/* pledge handling */
document.getElementById("pledge-btn").addEventListener("click", ()=>{
  const val = document.getElementById("pledge-input").value.trim();
  if(!val) { alert("Please write a short pledge."); return; }
  const node = document.createElement("div");
  node.textContent = "• " + val;
  node.style.marginTop = "8px";
  document.getElementById("pledge-list").prepend(node);
  document.getElementById("pledge-input").value = "";
});

/* ---------- Initial state: ensure Start button visible on load ---------- */
window.addEventListener("load", ()=>{
  // keep next button available but labeled Start
  nextBtn.style.display = "inline-block";
  nextBtn.textContent = "Start";
});

