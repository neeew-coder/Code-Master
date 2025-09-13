const LEVELS = {
  basic: [
    {
      q: "What does JVM stand for?",
      options: ["Java Virtual Machine", "Java Variable Method", "Java Visual Model", "Joint Virtual Module"],
      answer: 0,
      explain: "JVM stands for Java Virtual Machine, which runs Java bytecode."
    },
    {
      q: "Which keyword is used to define a class?",
      options: ["define", "class", "object", "struct"],
      answer: 1,
      explain: "'class' is used to declare a class in Java."
    },
    {
      q: "Which method is the entry point of a Java program?",
      options: ["start()", "main()", "run()", "init()"],
      answer: 1,
      explain: "The 'main()' method is the entry point of any Java application."
    },
    {
      q: "Which symbol is used for single-line comments?",
      options: ["//", "/*", "#", "--"],
      answer: 0,
      explain: "'//' starts a single-line comment in Java."
    },
    {
      q: "Which keyword creates a new object?",
      options: ["create", "new", "init", "object"],
      answer: 1,
      explain: "'new' instantiates a new object in Java."
    },
    {
      q: "Which data type stores whole numbers?",
      options: ["float", "int", "char", "boolean"],
      answer: 1,
      explain: "'int' is used for whole numbers."
    },
    {
      q: "Which keyword is used to inherit a class?",
      options: ["inherits", "extends", "implements", "super"],
      answer: 1,
      explain: "'extends' allows a class to inherit from another."
    },
    {
      q: "Which keyword is used to call the parent class?",
      options: ["parent", "base", "super", "this"],
      answer: 2,
      explain: "'super' accesses methods or constructors from the parent class."
    },
    {
      q: "Which keyword defines a constant?",
      options: ["final", "static", "const", "immutable"],
      answer: 0,
      explain: "'final' makes a variable constant in Java."
    },
    {
      q: "Which keyword is used to handle exceptions?",
      options: ["try", "catch", "throw", "finally"],
      answer: 2,
      explain: "'throw' is used to manually raise an exception."
    }
  ],
  intermediate: [
    {
      q: "Which keyword is used to implement an interface?",
      options: ["extends", "inherits", "implements", "interface"],
      answer: 2,
      explain: "'implements' is used to apply an interface to a class."
    },
    {
      q: "Which collection stores unique elements?",
      options: ["List", "Set", "Map", "Array"],
      answer: 1,
      explain: "'Set' stores unique elements with no duplicates."
    },
    {
      q: "Which loop checks the condition after execution?",
      options: ["for", "while", "do-while", "foreach"],
      answer: 2,
      explain: "'do-while' runs once before checking the condition."
    },
    {
      q: "Which keyword prevents method overriding?",
      options: ["static", "final", "private", "protected"],
      answer: 1,
      explain: "'final' prevents a method from being overridden."
    },
    {
      q: "Which class is used for input in Java?",
      options: ["Scanner", "InputStream", "Reader", "BufferedReader"],
      answer: 0,
      explain: "'Scanner' is commonly used for reading input from the console."
    },
    {
      q: "Which method reads a full line of input?",
      options: ["next()", "readLine()", "nextLine()", "getLine()"],
      answer: 2,
      explain: "'nextLine()' reads an entire line of input."
    },
    {
      q: "Which keyword is used to exit a loop?",
      options: ["stop", "exit", "break", "return"],
      answer: 2,
      explain: "'break' exits the current loop."
    },
    {
      q: "Which keyword skips the current iteration?",
      options: ["skip", "continue", "pass", "next"],
      answer: 1,
      explain: "'continue' skips to the next iteration of the loop."
    },
    {
      q: "Which class is used to write to a file?",
      options: ["FileWriter", "FileOutput", "FilePrint", "FileStream"],
      answer: 0,
      explain: "'FileWriter' writes character data to files."
    },
    {
      q: "Which keyword is used to define a package?",
      options: ["package", "namespace", "module", "import"],
      answer: 0,
      explain: "'package' declares a namespace for classes."
    }
  ],
  advanced: [
    {
      q: "Which keyword is used for multithreading?",
      options: ["thread", "Runnable", "multi", "process"],
      answer: 1,
      explain: "'Runnable' is an interface used to define threads."
    },
    {
      q: "Which method starts a thread?",
      options: ["run()", "start()", "execute()", "launch()"],
      answer: 1,
      explain: "'start()' begins execution of a thread."
    },
    {
      q: "Which class is used for synchronization?",
      options: ["Sync", "Thread", "Semaphore", "Lock"],
      answer: 3,
      explain: "'Lock' provides thread-safe synchronization."
    },
    {
      q: "Which keyword handles multiple exceptions?",
      options: ["multi", "catch", "throws", "try"],
      answer: 2,
      explain: "'throws' declares multiple exceptions."
    },
    {
      q: "Which annotation marks a method that overrides?",
      options: ["@Override", "@Overload", "@Extend", "@Method"],
      answer: 0,
      explain: "'@Override' indicates a method overrides a superclass method."
    },
    {
      q: "Which keyword is used for abstraction?",
      options: ["abstract", "interface", "virtual", "base"],
      answer: 0,
      explain: "'abstract' defines a class or method without implementation."
    },
    {
      q: "Which class is used for dynamic arrays?",
      options: ["ArrayList", "Vector", "LinkedList", "Stack"],
      answer: 0,
      explain: "'ArrayList' is a resizable array implementation."
    },
    {
      q: "Which method removes all elements from a list?",
      options: ["clear()", "removeAll()", "delete()", "empty()"],
      answer: 0,
      explain: "'clear()' empties the list."
    },
    {
      q: "Which class maps keys to values?",
      options: ["Map", "Set", "List", "Pair"],
      answer: 0,
      explain: "'Map' stores key-value pairs."
    },
    {
      q: "Which keyword is used to import classes?",
      options: ["include", "require", "import", "use"],
      answer: 2,
      explain: "'import' brings external classes into scope."
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
