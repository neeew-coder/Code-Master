const LEVELS = {
  basic: [
    {
      q: "What does C# primarily run on?",
      options: ["Java Virtual Machine", ".NET Framework", "Node.js", "Python Interpreter"],
      answer: 1,
      explain: "C# runs on the .NET Framework or .NET Core platform."
    },
    {
      q: "Which keyword declares a variable?",
      options: ["int", "var", "define", "dim"],
      answer: 1,
      explain: "'var' is used to declare a variable with implicit typing."
    },
    {
      q: "Which method is the entry point of a C# program?",
      options: ["Start()", "Main()", "Run()", "Init()"],
      answer: 1,
      explain: "'Main()' is the entry point of a C# application."
    },
    {
      q: "Which symbol is used for single-line comments?",
      options: ["//", "/*", "#", "--"],
      answer: 0,
      explain: "'//' starts a single-line comment in C#."
    },
    {
      q: "Which keyword creates a new object?",
      options: ["create", "new", "object", "instance"],
      answer: 1,
      explain: "'new' instantiates a new object in C#."
    },
    {
      q: "Which data type stores true/false values?",
      options: ["bool", "int", "char", "string"],
      answer: 0,
      explain: "'bool' is used for Boolean values."
    },
    {
      q: "Which keyword is used to inherit a class?",
      options: ["inherits", "extends", ":", "super"],
      answer: 2,
      explain: "C# uses ':' to inherit from a base class."
    },
    {
      q: "Which keyword accesses the base class?",
      options: ["base", "super", "parent", "this"],
      answer: 0,
      explain: "'base' is used to access members of the base class."
    },
    {
      q: "Which keyword defines a constant?",
      options: ["const", "readonly", "static", "final"],
      answer: 0,
      explain: "'const' defines a compile-time constant."
    },
    {
      q: "Which keyword handles exceptions?",
      options: ["try", "catch", "throw", "finally"],
      answer: 2,
      explain: "'throw' is used to raise an exception."
    }
  ],
  intermediate: [
    {
      q: "Which keyword implements an interface?",
      options: ["extends", "inherits", "implements", ":"],
      answer: 3,
      explain: "C# uses ':' to implement interfaces."
    },
    {
      q: "Which collection stores unique elements?",
      options: ["List", "Set", "Dictionary", "HashSet"],
      answer: 3,
      explain: "'HashSet' stores unique elements in C#."
    },
    {
      q: "Which loop checks the condition after execution?",
      options: ["for", "while", "do-while", "foreach"],
      answer: 2,
      explain: "'do-while' runs once before checking the condition."
    },
    {
      q: "Which keyword prevents method overriding?",
      options: ["static", "sealed", "private", "readonly"],
      answer: 1,
      explain: "'sealed' prevents further inheritance or overriding."
    },
    {
      q: "Which class reads input from the console?",
      options: ["Scanner", "Console", "InputStream", "Reader"],
      answer: 1,
      explain: "'Console.ReadLine()' reads input from the user."
    },
    {
      q: "Which method reads a full line of input?",
      options: ["Read()", "ReadLine()", "GetLine()", "Input()"],
      answer: 1,
      explain: "'Console.ReadLine()' reads an entire line."
    },
    {
      q: "Which keyword exits a loop?",
      options: ["stop", "exit", "break", "return"],
      answer: 2,
      explain: "'break' exits the current loop."
    },
    {
      q: "Which keyword skips the current iteration?",
      options: ["skip", "continue", "pass", "next"],
      answer: 1,
      explain: "'continue' skips to the next iteration."
    },
    {
      q: "Which class writes to a file?",
      options: ["FileWriter", "StreamWriter", "FileOutput", "TextWriter"],
      answer: 1,
      explain: "'StreamWriter' writes text to files in C#."
    },
    {
      q: "Which keyword defines a namespace?",
      options: ["package", "namespace", "module", "import"],
      answer: 1,
      explain: "'namespace' declares a logical grouping of classes."
    }
  ],
  advanced: [
    {
      q: "Which keyword defines a class that cannot be inherited?",
      options: ["final", "sealed", "static", "abstract"],
      answer: 1,
      explain: "'sealed' prevents a class from being inherited."
    },
    {
      q: "Which keyword defines an abstract class?",
      options: ["abstract", "virtual", "interface", "base"],
      answer: 0,
      explain: "'abstract' defines a class with incomplete implementation."
    },
    {
      q: "Which keyword overrides a base method?",
      options: ["override", "virtual", "extends", "base"],
      answer: 0,
      explain: "'override' replaces a base class method."
    },
    {
      q: "Which keyword defines a method that can be overridden?",
      options: ["virtual", "override", "abstract", "base"],
      answer: 0,
      explain: "'virtual' allows a method to be overridden."
    },
    {
      q: "Which class is used for asynchronous tasks?",
      options: ["Task", "Thread", "Async", "Future"],
      answer: 0,
      explain: "'Task' represents an asynchronous operation."
    },
    {
      q: "Which keyword awaits an async task?",
      options: ["wait", "await", "async", "pause"],
      answer: 1,
      explain: "'await' pauses execution until the task completes."
    },
    {
      q: "Which class maps keys to values?",
      options: ["Dictionary", "List", "Set", "Array"],
      answer: 0,
      explain: "'Dictionary' stores key-value pairs in C#."
    },
    {
      q: "Which method removes all items from a list?",
      options: ["clear()", "removeAll()", "delete()", "empty()"],
      answer: 0,
      explain: "'Clear()' empties the list."
    },
    {
      q: "Which keyword imports namespaces?",
      options: ["include", "require", "using", "import"],
      answer: 2,
      explain: "'using' brings namespaces into scope."
    },
    {
      q: "Which keyword handles multiple exceptions?",
      options: ["catch", "throws", "try", "when"],
      answer: 3,
      explain: "'when' filters exceptions in catch blocks."
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
 