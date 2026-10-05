```javascript
/* =========================
   BOBOS BIBLE STUDY
   ========================= */

let currentQuestion = 0;
let score = 0;
let totalXP = Number(localStorage.getItem("bobosXP")) || 0;
let studies = Number(localStorage.getItem("bobosStudies")) || 0;

const questions = [

  {
    question: "What does Proverbs 3:5 tell us to do?",
    answers: [
      "Trust in the Lord",
      "Trust only ourselves",
      "Ignore God",
      "Never make decisions"
    ],
    correct: 0
  },

  {
    question: "What should we NOT lean on completely?",
    answers: [
      "God's Word",
      "Our own understanding",
      "Prayer",
      "Wisdom"
    ],
    correct: 1
  },

  {
    question: "What does the passage say God will do?",
    answers: [
      "Make our paths straight",
      "Give us everything we want",
      "Remove every problem",
      "Make us famous"
    ],
    correct: 0
  }

];


/* =========================
   PAGE NAVIGATION
   ========================= */

function showPage(page) {

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  updateProgress();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   START STUDY
   ========================= */

function startQuestions() {

  currentQuestion = 0;
  score = 0;

  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");

  loadQuestion();
}


/* =========================
   LOAD QUESTION
   ========================= */

function loadQuestion() {

  const question = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    currentQuestion + 1;

  document.getElementById("questionText").textContent =
    question.question;

  document.getElementById("feedback").textContent = "";

  document.getElementById("nextButton").classList.add("hidden");

  const progress =
    ((currentQuestion) / questions.length) * 100;

  document.getElementById("questionProgress").style.width =
    progress + "%";

  const answersContainer =
    document.getElementById("answers");

  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.onclick = function () {
      chooseAnswer(index, button);
    };

    answersContainer.appendChild(button);

  });
}


/* =========================
   CHECK ANSWER
   ========================= */

function chooseAnswer(index, button) {

  const question = questions[currentQuestion];

  const allAnswers =
    document.querySelectorAll(".answer");

  allAnswers.forEach(answer => {
    answer.disabled = true;
  });

  if (index === question.correct) {

    button.classList.add("correct");

    document.getElementById("feedback").textContent =
      "✓ Correct! Great job.";

    document.getElementById("feedback").style.color =
      "#22c55e";

    score++;

  } else {

    button.classList.add("wrong");

    allAnswers[question.correct].classList.add("correct");

    document.getElementById("feedback").textContent =
      "Not quite — the correct answer is highlighted.";

    document.getElementById("feedback").style.color =
      "#f87171";
  }

  document.getElementById("nextButton").classList.remove("hidden");
}


/* =========================
   NEXT QUESTION
   ========================= */

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion < questions.length) {

    loadQuestion();

  } else {

    finishStudy();

  }
}


/* =========================
   FINISH STUDY
   ========================= */

function finishStudy() {

  const earned = 25 + (score * 10);

  totalXP += earned;
  studies++;

  localStorage.setItem("bobosXP", totalXP);
  localStorage.setItem("bobosStudies", studies);

  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  document.getElementById("scoreDisplay").textContent =
    score + "/" + questions.length;

  document.getElementById("earnedXP").textContent =
    "+" + earned + " XP";

  document.getElementById("xpDisplay").textContent =
    totalXP;

  updateProgress();
}


/* =========================
   REVIEW
   ========================= */

function showReview() {

  document.getElementById("step3").classList.add("hidden");

  document.getElementById("review").classList.remove("hidden");
}


/* =========================
   PROGRESS
   ========================= */

function updateProgress() {

  const level =
    Math.floor(totalXP / 100) + 1;

  const xpIntoLevel =
    totalXP % 100;

  document.getElementById("totalXP").textContent =
    totalXP;

  document.getElementById("studiesComplete").textContent =
    studies;

  document.getElementById("levelDisplay").textContent =
    level;

  document.getElementById("levelProgress").style.width =
    xpIntoLevel + "%";

  document.getElementById("levelText").textContent =
    xpIntoLevel + " / 100 XP to Level " + (level + 1);

  document.getElementById("xpDisplay").textContent =
    totalXP;
}


/* =========================
   STARTUP
   ========================= */

updateProgress();
```
