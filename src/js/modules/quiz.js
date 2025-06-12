import quizData from '../../data/quizData.json';

export default function setupQuiz() {
  const container = document.getElementById('quiz-container');
  const resultBox = document.getElementById('quiz-results');
  const scoreText = document.getElementById('score');
  const restartBtn = document.getElementById('restart-quiz');
  const quizTitle = document.querySelector('#quiz h2');

  let currentQuestion = 0;
  let score = 0;
  let questions = [];
  let quizInProgress = false;
  const quizLength = 10;

  // Shuffle array function
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Select random questions
  function selectRandomQuestions(questions, count) {
    return shuffleArray([...questions]).slice(0, count);
  }

  function startNewQuiz() {
    quizInProgress = true;
    currentQuestion = 0;
    score = 0;
    questions = selectRandomQuestions(quizData.questions, quizLength);
    quizTitle.textContent = `Ocean Quiz (${quizLength} Questions)`;
    container.classList.remove('hidden');
    resultBox.classList.add('hidden');
    showQuestion();
  }

  function showQuestion() {
    const q = questions[currentQuestion];
    const questionNum = currentQuestion + 1;
    
    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">Question ${questionNum} of ${quizLength}</div>
        <h3>${q.question}</h3>
        <ul>
          ${shuffleArray([...q.options]).map(option => `
            <li>
              <button class="option-btn" data-answer="${option === q.answer}">
                ${option}
              </button>
            </li>
          `).join('')}
        </ul>
        <div class="quiz-score">Current score: ${score}/${questionNum - 1}</div>
      </div>
    `;

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        checkAnswer(e.target.textContent, e.target.dataset.answer === 'true');
      });
    });
  }

  function checkAnswer(selected, isCorrect) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === questions[currentQuestion].answer) {
        btn.classList.add('correct');
      } else if (btn.textContent === selected && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) score++;

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  function showResults() {
    quizInProgress = false;
    container.classList.add('hidden');
    resultBox.classList.remove('hidden');
    
    const percentage = Math.round((score / quizLength) * 100);
    let message;
    if (percentage >= 80) message = "Ocean Master! 🌊";
    else if (percentage >= 60) message = "Great job! 🐬";
    else if (percentage >= 40) message = "Not bad! 🐠";
    else message = "Keep learning! 📚";
    
    scoreText.innerHTML = `
      <p>You scored <strong>${score} out of ${quizLength}</strong> (${percentage}%)</p>
      <p class="result-message">${message}</p>
    `;
  }

  // Configurar el botón de reinicio
  restartBtn.addEventListener('click', startNewQuiz);

  // Inicializar el quiz directamente con los datos importados
  startNewQuiz();
}