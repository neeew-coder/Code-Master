const LEVELS = {
  basic: [
    {
      q: "What does JS stand for?",
      options: ["Java Source", "JavaScript", "Just Syntax", "JScript"],
      answer: 1,
      explain: "JS stands for JavaScript, a scripting language for the web."
    },
    {
      q: "Which keyword declares a variable?",
      options: ["var", "int", "define", "set"],
      answer: 0,
      explain: "'var' is one of the ways to declare a variable in JavaScript."
    },
    {
      q: "Which symbol is used for comments?",
      options: ["//", "##", "--", "/*"],
      answer: 0,
      explain: "'//' starts a single-line comment in JavaScript."
    },
    {
      q: "Which method logs output to the console?",
      options: ["print()", "log()", "console.log()", "echo()"],
      answer: 2,
      explain: "'console.log()' is used to print messages to the browser console."
    },
    {
      q: "Which data type is NOT primitive?",
      options: ["String", "Number", "Object", "Boolean"],
      answer: 2,
      explain: "Object is a complex data type; others are primitive."
    },
    {
      q: "Which operator checks both value and type?",
      options: ["==", "=", "===", "!=="],
      answer: 2,
      explain: "'===' checks both value and type."
    },
    {
      q: "Which keyword defines a constant?",
      options: ["let", "const", "var", "static"],
      answer: 1,
      explain: "'const' creates a constant that cannot be reassigned."
    },
    {
      q: "Which method converts a string to a number?",
      options: ["parseInt()", "toNumber()", "Number()", "convert()"],
      answer: 0,
      explain: "'parseInt()' parses a string and returns an integer."
    },
    {
      q: "Which loop runs at least once?",
      options: ["for", "while", "do...while", "foreach"],
      answer: 2,
      explain: "'do...while' executes once before checking the condition."
    },
    {
      q: "Which keyword exits a loop?",
      options: ["stop", "exit", "break", "return"],
      answer: 2,
      explain: "'break' exits the current loop."
    }
  ],
  intermediate: [
    {
      q: "Which method adds an item to an array?",
      options: ["push()", "add()", "append()", "insert()"],
      answer: 0,
      explain: "'push()' adds an item to the end of an array."
    },
    {
      q: "Which method removes the last item from an array?",
      options: ["pop()", "shift()", "remove()", "slice()"],
      answer: 0,
      explain: "'pop()' removes the last item from an array."
    },
    {
      q: "Which method joins array elements into a string?",
      options: ["join()", "concat()", "toString()", "combine()"],
      answer: 0,
      explain: "'join()' creates a string from array elements."
    },
    {
      q: "Which keyword defines a function?",
      options: ["func", "function", "def", "method"],
      answer: 1,
      explain: "'function' declares a reusable block of code."
    },
    {
      q: "Which object represents the browser window?",
      options: ["document", "screen", "window", "navigator"],
      answer: 2,
      explain: "'window' is the global object for browser APIs."
    },
    {
      q: "Which method sets a timer?",
      options: ["setTimeout()", "startTimer()", "delay()", "wait()"],
      answer: 0,
      explain: "'setTimeout()' runs code after a delay."
    },
    {
      q: "Which method repeats code at intervals?",
      options: ["setInterval()", "loop()", "repeat()", "timer()"],
      answer: 0,
      explain: "'setInterval()' runs code repeatedly at set intervals."
    },
    {
      q: "Which keyword returns a value from a function?",
      options: ["return", "output", "yield", "send"],
      answer: 0,
      explain: "'return' sends a value back from a function."
    },
    {
      q: "Which method selects an element by ID?",
      options: ["getElementById()", "querySelector()", "select()", "findById()"],
      answer: 0,
      explain: "'getElementById()' selects an element with a specific ID."
    },
    {
      q: "Which method adds a class to an element?",
      options: ["addClass()", "classList.add()", "setClass()", "appendClass()"],
      answer: 1,
      explain: "'classList.add()' adds a class to an element."
    }
  ],
  advanced: [
    {
      q: "Which keyword creates a class?",
      options: ["class", "object", "constructor", "define"],
      answer: 0,
      explain: "'class' defines a blueprint for objects."
    },
    {
      q: "Which method runs when a class is instantiated?",
      options: ["init()", "constructor()", "create()", "start()"],
      answer: 1,
      explain: "'constructor()' is called when a new object is created."
    },
    {
      q: "Which keyword inherits from another class?",
      options: ["extends", "inherits", "super", "prototype"],
      answer: 0,
      explain: "'extends' allows a class to inherit from another."
    },
    {
      q: "Which keyword accesses the parent class?",
      options: ["parent", "super", "base", "this"],
      answer: 1,
      explain: "'super' calls methods from the parent class."
    },
    {
      q: "Which method converts JSON to an object?",
      options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toObject()"],
      answer: 0,
      explain: "'JSON.parse()' converts JSON strings to JavaScript objects."
    },
    {
      q: "Which method converts an object to JSON?",
      options: ["JSON.stringify()", "toJSON()", "objectToJSON()", "serialize()"],
      answer: 0,
      explain: "'JSON.stringify()' converts objects to JSON strings."
    },
    {
      q: "Which keyword handles errors?",
      options: ["try", "catch", "throw", "finally"],
      answer: 2,
      explain: "'throw' generates a custom error."
    },
    {
      q: "Which block catches errors?",
      options: ["catch", "try", "finally", "error"],
      answer: 0,
      explain: "'catch' handles errors thrown in 'try'."
    },
    {
      q: "Which keyword ensures code runs after try/catch?",
      options: ["finally", "after", "done", "complete"],
      answer: 0,
      explain: "'finally' runs regardless of error outcome."
    },
    {
      q: "Which method fetches data from a URL?",
      options: ["fetch()", "get()", "request()", "ajax()"],
      answer: 0,
      explain: "'fetch()' retrieves data asynchronously from a URL."
    }
  ]
};

let QUESTIONS = LEVELS.basic;
let index = 0;
let score = 0;
const chosenAnswers = [];

const qCounter = document.getElementById('qCounter');
const scoreChip = document.getElementById('scoreChip');
const progressBar = document.getElementById('progressFill');
const questionText = document.getElementById('questionBox');
const optionsForm = document.getElementById('optionsForm');
const feedback = document.getElementById('feedback');
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const results = document.getElementById('results');
const finalScore = document.getElementById('finalScore');
const remark = document.getElementById('remark');
const reviewList = document.getElementById('reviewList');
const retryBtn = document.getElementById('retryBtn');

const basicBtn = document.querySelector('[data-level="basic"]');
const intermediateBtn = document.querySelector('[data-level="intermediate"]');
const advancedBtn = document.querySelector('[data-level="advanced"]');

const letters = ["A", "B", "C", "D"];

function renderQuestion() {
  const item = QUESTIONS[index];
  qCounter.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  progressBar.style.width = `${(index / QUESTIONS.length) * 100}%`;

  feedback.className = 'feedback';
  feedback.textContent = '';
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'inline-block';

  questionText.textContent = item.q;
  optionsForm.innerHTML = '';

  item.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.className = 'option flex items-center gap-3 p-3 border rounded-md';
    label.setAttribute('role', 'radio');
    label.setAttribute('tabindex', '0');
    label.setAttribute('aria-checked', 'false');
    label.dataset.index = i;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = i;

    const span = document.createElement('span');
    span.className = 'opt-text';
    span.innerText = opt;

    const badge = document.createElement('span');
    badge.className = 'opt-letter bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs';
    badge.innerText = letters[i];

    label.appendChild(badge);
    label.appendChild(span);
    label.appendChild(input);

    label.addEventListener('click', (e) => {
      e.preventDefault();
      [...optionsForm.querySelectorAll('.option')].forEach(o => o.setAttribute('aria-checked','false'));
      label.setAttribute('aria-checked','true');
      input.checked = true;
    });

    label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key.toLowerCase() === 'enter') {
        e.preventDefault();
        [...optionsForm.querySelectorAll('.option')].forEach(o => o.setAttribute('aria-checked','false'));
        label.setAttribute('aria-checked','true');
        input.checked = true;
      }
    });

    optionsForm.appendChild(label);
  });
}

function showFeedback(isCorrect, explain) {
  feedback.className = 'feedback show ' + (isCorrect ? 'text-green-600' : 'text-red-600');
  feedback.textContent = (isCorrect ? 'Correct! ' : 'Not quite. ') + explain;
  submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
  progressBar.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
}

submitBtn.addEventListener('click', () => {
  const checked = optionsForm.querySelector('input[name="answer"]:checked');
  if (!checked) {
    feedback.className = 'feedback show text-gray-600';
    feedback.textContent = 'Please select an option or click Skip.';
    return;
  }
  const selectedIndex = Number(checked.value);
  chosenAnswers[index] = selectedIndex;

  const isCorrect = selectedIndex === QUESTIONS[index].answer;
  if (isCorrect) {
    score++;
    scoreChip.textContent = `Score: ${score}`;
  }
  showFeedback(isCorrect, QUESTIONS[index].explain);
});

nextBtn.addEventListener('click', () => {
  index++;
  if (index < QUESTIONS.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

skipBtn.addEventListener('click', () => {
  chosenAnswers[index] = null;
  showFeedback(false, "Question skipped.");
});

function finishQuiz() {
  document.querySelector('.quiz-main').style.display = 'none';
  results.style.display = 'block';
  finalScore.textContent = `You scored ${score}/${QUESTIONS.length}`;
  const pct = Math.round((score / QUESTIONS.length) * 100);
  remark.textContent = pct === 100 ? "Perfect! You're a CSS wizard. ✨" :
                      pct >= 80 ? "Great job! Solid grasp of CSS. 🙌" :
                      pct >= 60 ? "Nice! A few areas to polish. 👍" :
                      "Keep practicing—you're getting there! 💪";

  reviewList.innerHTML = '';
  QUESTIONS.forEach((item, i) => {
    const div = document.createElement('div');
    const userPick = chosenAnswers[i];
    const correct = item.answer;
    const status = userPick === correct ? "✅ Correct" :
                  userPick == null ? "⏭️ Skipped" : "❌ Wrong";
    const yourAnswer = userPick == null ? '—' : item.options[userPick];
    const correctAnswer = item.options[correct];
    div.innerHTML = `<strong>Q${i+1}:</strong> ${item.q}<br>
      <span>${status}</span><br>
      <strong>Your answer:</strong> ${yourAnswer}<br>
      <strong>Correct:</strong> ${correctAnswer}<br>
      <em>${item.explain}</em>`;
    reviewList.appendChild(div);
  });

  // Unlock logic
  if (score === QUESTIONS.length) {
    if (QUESTIONS === LEVELS.basic) {
      intermediateBtn.disabled = false;
      intermediateBtn.classList.remove("opacity-50", "cursor-not-allowed");
      intermediateBtn.classList.add("hover:bg-purple-800");
    } else if (QUESTIONS === LEVELS.intermediate) {
      advancedBtn.disabled = false;
      advancedBtn.classList.remove("opacity-50", "cursor-not-allowed");
      advancedBtn.classList.add("hover:bg-purple-800");
    }
  }
}

retryBtn.addEventListener('click', () => {
  index = 0;
  score = 0;
  chosenAnswers.length = 0;
  scoreChip.textContent = 'Score: 0';
  results.style.display = 'none';
  document.querySelector('.quiz-main').style.display = 'grid';
  renderQuestion();
});

[basicBtn, intermediateBtn, advancedBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.disabled) return;

    const level = btn.dataset.level;
    QUESTIONS = LEVELS[level];
    index = 0;
    score = 0;
    chosenAnswers.length = 0;
    scoreChip.textContent = 'Score: 0';
    results.style.display = 'none';
    document.querySelector('.quiz-main').style.display = 'grid';
    document.getElementById("quizTitle").textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} Quiz`;
    renderQuestion();
  });
});

// Lock intermediate and advanced by default
intermediateBtn.disabled = true;
intermediateBtn.classList.add("opacity-50", "cursor-not-allowed");
advancedBtn.disabled = true;
advancedBtn.classList.add("opacity-50", "cursor-not-allowed");

// Start quiz
renderQuestion();
