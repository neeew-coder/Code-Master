const LEVELS = {
  basic: [
    {
      q: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Syntax"
      ],
      answer: 2,
      explain: "CSS stands for Cascading Style Sheets, used to style HTML elements."
    },
    {
      q: "Which HTML tag is used to link an external CSS file?",
      options: ["<style>", "<css>", "<link>", "<script>"],
      answer: 2,
      explain: "<link> is used in the <head> to link external CSS files."
    },
    {
      q: "Which property changes the text color?",
      options: ["font-color", "text-style", "color", "text-color"],
      answer: 2,
      explain: "The 'color' property sets the text color in CSS."
    },
    {
      q: "Which property sets the background color?",
      options: ["bg-color", "background", "background-color", "color"],
      answer: 2,
      explain: "'background-color' sets the background color of an element."
    },
    {
      q: "How do you select all <p> elements in CSS?",
      options: ["p {}", ".p {}", "#p {}", "<p> {}"],
      answer: 0,
      explain: "Use the tag name directly: p {}"
    },
    {
      q: "Which property controls the font size?",
      options: ["text-size", "font-size", "size", "font"],
      answer: 1,
      explain: "'font-size' sets the size of the text."
    },
    {
      q: "Which value makes text bold?",
      options: ["font-weight: bold", "font-style: bold", "text-weight: bold", "font: bold"],
      answer: 0,
      explain: "'font-weight: bold' makes text bold."
    },
    {
      q: "Which property adds space inside an element?",
      options: ["margin", "padding", "border", "spacing"],
      answer: 1,
      explain: "'padding' adds space inside the element’s border."
    },
    {
      q: "Which property adds space outside an element?",
      options: ["padding", "margin", "border-spacing", "gap"],
      answer: 1,
      explain: "'margin' adds space outside the element."
    },
    {
      q: "Which property sets the font type?",
      options: ["font-family", "font-type", "text-font", "typeface"],
      answer: 0,
      explain: "'font-family' specifies the typeface used."
    }
  ],

  intermediate: [
    {
      q: "Which selector targets an element with id='main'?",
      options: ["#main", ".main", "main", "*main"],
      answer: 0,
      explain: "Use '#' to target an ID: #main"
    },
    {
      q: "Which selector targets all elements with class='box'?",
      options: [".box", "#box", "box", "*box"],
      answer: 0,
      explain: "Use '.' to target a class: .box"
    },
    {
      q: "Which property sets the border width?",
      options: ["border-size", "border-width", "border", "border-style"],
      answer: 1,
      explain: "'border-width' sets the thickness of the border."
    },
    {
      q: "Which shorthand sets margin on all sides?",
      options: ["margin: 10px;", "margin: top right bottom left;", "margin-all: 10px;", "margin-set: 10px;"],
      answer: 0,
      explain: "'margin: 10px;' applies to all four sides."
    },
    {
      q: "Which property sets the element height?",
      options: ["element-height", "height", "size-height", "box-height"],
      answer: 1,
      explain: "'height' sets the vertical size of an element."
    },
    {
      q: "Which property sets the element width?",
      options: ["element-width", "width", "size-width", "box-width"],
      answer: 1,
      explain: "'width' sets the horizontal size of an element."
    },
    {
      q: "Which property hides an element?",
      options: ["display: none", "visibility: hidden", "opacity: 0", "all of the above"],
      answer: 3,
      explain: "All three can hide elements, but behave differently."
    },
    {
      q: "Which property sets spacing between lines of text?",
      options: ["line-spacing", "line-height", "text-spacing", "font-spacing"],
      answer: 1,
      explain: "'line-height' controls vertical spacing between lines."
    },
    {
      q: "Which property aligns text to the center?",
      options: ["text-align: middle", "align: center", "text-align: center", "center-text"],
      answer: 2,
      explain: "'text-align: center' centers text horizontally."
    },
    {
      q: "Which property sets the outer border style?",
      options: ["border-style", "border-type", "border-outline", "border-kind"],
      answer: 0,
      explain: "'border-style' defines the appearance of the border (solid, dashed, etc)."
    }
  ],

  advanced: [
    {
      q: "Which layout model uses rows and columns?",
      options: ["Flexbox", "Grid", "Table", "Inline-block"],
      answer: 1,
      explain: "CSS Grid is designed for two-dimensional layouts."
    },
    {
      q: "Which property enables Flexbox?",
      options: ["display: flex", "flex: enable", "layout: flex", "flexbox: true"],
      answer: 0,
      explain: "'display: flex' activates Flexbox layout."
    },
    {
      q: "Which property controls Flexbox item alignment?",
      options: ["align-items", "justify-items", "flex-align", "item-align"],
      answer: 0,
      explain: "'align-items' aligns items vertically in Flexbox."
    },
    {
      q: "Which property sets spacing between grid cells?",
      options: ["grid-gap", "gap", "cell-spacing", "grid-spacing"],
      answer: 1,
      explain: "'gap' sets spacing between rows and columns in Grid."
    },
    {
      q: "Which property makes an element responsive?",
      options: ["width: 100%", "max-width", "media queries", "all of the above"],
      answer: 3,
      explain: "All contribute to responsive design."
    },
    {
      q: "Which media query targets screens under 600px?",
      options: [
        "@media screen and (max-width: 600px)",
        "@media screen and (min-width: 600px)",
        "@media screen < 600px",
        "@media screen: 600px"
      ],
      answer: 0,
      explain: "Use 'max-width' to target smaller screens."
    },
    {
      q: "Which property sets stacking order?",
      options: ["z-index", "stack-order", "layer", "position-order"],
      answer: 0,
      explain: "'z-index' controls which elements appear on top."
    },
    {
      q: "Which property makes an element fixed on scroll?",
      options: ["position: sticky", "position: fixed", "position: absolute", "position: float"],
      answer: 1,
      explain: "'position: fixed' keeps the element in place during scroll."
    },
    {
      q: "Which property sets transition effects?",
      options: ["transition", "animation", "effect", "transform"],
      answer: 0,
      explain: "'transition' defines smooth changes between states."
    },
    {
      q: "Which property rotates an element?",
      options: ["transform: rotate()", "rotate: transform()", "animation: rotate()", "rotate: angle()"],
      answer: 0,
      explain: "'transform: rotate(deg)' rotates the element."
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
