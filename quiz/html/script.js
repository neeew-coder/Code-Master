const LEVELS = {
  basic: [
    {
      q: "What does HTML stand for?",
      options: [
        "Hyperlinks and Text Markup Language",
        "HyperText Markup Language",
        "Home Tool Markup Language",
        "Hyperlink Transfer Markup Language"
      ],
      answer: 1,
      explain: "HTML stands for HyperText Markup Language—the standard language for documents designed to be displayed in a web browser."
    },
    {
      q: "Which tag defines the largest heading?",
      options: ["<h6>", "<h1>", "<head>", "<heading>"],
      answer: 1,
      explain: "<h1> is the top-level heading in HTML."
    },
    {
      q: "Which tag creates a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: 0,
      explain: "<a> is used to create hyperlinks with the href attribute."
    },
    {
      q: "Which tag inserts a line break?",
      options: ["<lb>", "<br>", "<hr>", "<break>"],
      answer: 1,
      explain: "<br> inserts a line break in HTML."
    },
    {
      q: "Which tag is used for paragraphs?",
      options: ["<p>", "<para>", "<text>", "<paragraph>"],
      answer: 0,
      explain: "<p> defines a paragraph in HTML."
    },
    {
      q: "Which attribute sets the image source?",
      options: ["src", "href", "alt", "link"],
      answer: 0,
      explain: "The src attribute specifies the image file path."
    },
    {
      q: "Which tag is used to display a list with bullets?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: 0,
      explain: "<ul> creates an unordered list with bullet points."
    },
    {
      q: "Which tag is used to define a table row?",
      options: ["<tr>", "<td>", "<th>", "<row>"],
      answer: 0,
      explain: "<tr> defines a row in an HTML table."
    },
    {
      q: "Which tag is used to define a form?",
      options: ["<form>", "<input>", "<fieldset>", "<submit>"],
      answer: 0,
      explain: "<form> wraps input elements for user data submission."
    },
    {
      q: "Which tag is used to embed JavaScript?",
      options: ["<js>", "<script>", "<javascript>", "<code>"],
      answer: 1,
      explain: "<script> is used to embed or link JavaScript code."
    }
  ],

  intermediate: [
    {
      q: "Which attribute provides alternative text for images?",
      options: ["title", "src", "alt", "aria"],
      answer: 2,
      explain: "The alt attribute describes an image for screen readers and when the image can't load."
    },
    {
      q: "Which input type allows selecting one option?",
      options: ["checkbox", "radio", "text", "range"],
      answer: 1,
      explain: "Radio buttons allow selecting exactly one option from a set."
    },
    {
      q: "Where should metadata like title and meta tags go?",
      options: ["<footer>", "<head>", "<body>", "meta.html"],
      answer: 1,
      explain: "Metadata belongs inside the <head> element."
    },
    {
      q: "Which tag is used to group form elements?",
      options: ["<fieldset>", "<group>", "<form>", "<section>"],
      answer: 0,
      explain: "<fieldset> groups related form controls."
    },
    {
      q: "Which tag defines a clickable button?",
      options: ["<submit>", "<input>", "<button>", "<click>"],
      answer: 2,
      explain: "<button> creates a clickable button element."
    },
    {
      q: "Which tag defines a numbered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: 1,
      explain: "<ol> creates an ordered list with numbers."
    },
    {
      q: "Which tag defines a cell in a table?",
      options: ["<tr>", "<td>", "<th>", "<cell>"],
      answer: 1,
      explain: "<td> defines a standard table cell."
    },
    {
      q: "Which tag defines a header cell in a table?",
      options: ["<td>", "<th>", "<tr>", "<head>"],
      answer: 1,
      explain: "<th> defines a header cell in a table."
    },
    {
      q: "Which tag is used to embed a video?",
      options: ["<video>", "<media>", "<iframe>", "<embed>"],
      answer: 0,
      explain: "<video> embeds a video file in HTML."
    },
    {
      q: "Which tag is used to embed external content like YouTube?",
      options: ["<iframe>", "<video>", "<object>", "<embed>"],
      answer: 0,
      explain: "<iframe> embeds external content like videos or maps."
    }
  ],

  advanced: [
    {
      q: "Which element wraps navigation links semantically?",
      options: ["<nav>", "<section>", "<article>", "<menu>"],
      answer: 0,
      explain: "<nav> explicitly indicates navigational sections."
    },
    {
      q: "How do you make text bold semantically?",
      options: ["<b>", "<strong>", "<i>", "<em>"],
      answer: 1,
      explain: "<strong> indicates semantic importance, often styled bold."
    },
    {
      q: "Which tag embeds JavaScript?",
      options: ["<javascript>", "<script>", "<code>", "<js>"],
      answer: 1,
      explain: "<script> embeds or links JavaScript code."
    },
    {
      q: "Which tag defines a semantic section?",
      options: ["<div>", "<section>", "<span>", "<group>"],
      answer: 1,
      explain: "<section> defines a standalone thematic grouping."
    },
    {
      q: "Which tag defines independent content?",
      options: ["<aside>", "<article>", "<section>", "<main>"],
      answer: 1,
      explain: "<article> is used for self-contained content like blog posts."
    },
    {
      q: "Which tag defines content aside from the main content?",
      options: ["<aside>", "<footer>", "<nav>", "<section>"],
      answer: 0,
      explain: "<aside> is used for tangential or side content."
    },
    {
      q: "Which tag defines the main content of a page?",
      options: ["<main>", "<body>", "<section>", "<article>"],
      answer: 0,
      explain: "<main> represents the dominant content of the document."
    },
    {
      q: "Which tag defines a footer for a section or page?",
      options: ["<footer>", "<bottom>", "<aside>", "<end>"],
      answer: 0,
      explain: "<footer> contains metadata or links at the bottom of a section."
    },
    {
      q: "Which tag defines inline emphasized text?",
      options: ["<em>", "<i>", "<strong>", "<span>"],
      answer: 0,
      explain: "<em> emphasizes text semantically, often styled italic."
    },
    {
      q: "Which tag defines inline generic container?",
      options: ["<span>", "<div>", "<section>", "<article>"],
      answer: 0,
      explain: "<span> is a generic inline container for styling or scripting."
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
