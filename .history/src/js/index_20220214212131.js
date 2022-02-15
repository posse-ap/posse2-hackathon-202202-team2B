// クイズデータを読み込む
import { quizDataJp } from './quiz_data_jp.js';

// 問題文
const questionElm = document.getElementById('question');

// 選択肢
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');

// 回答送信ボタン
const submitBtn = document.getElementById('submit');

// 現在の問題
let currentQuiz = 0;

// 現在のスコア
let score = 0;

// 次の問題へ進むボタン
const nextQuizBtn = document.getElementById('next-quiz');

// 結果表示用の要素
const quizHeaderElm = document.getElementById('quiz-header');
const resultsConElm = document.getElementById('results-container');
const resultsElm = document.getElementById('results');

loadQuiz();

// 問題を読み込む
function loadQuiz() {
  // 問題を取得
  const currentQuizData = quizDataJp[currentQuiz];

  // 質問文を表示
  questionElm.innerText = currentQuizData.question;

  // 選択肢を表示
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

// 回答を取得
function getAnswered() {

  // 選択したラジオボタンのvalueを返す
  return document.quizForm.answer.value;
}

// 結果表示
function showResults(results) {
  quizHeaderElm.style.display = 'none';
  submitBtn.style.display = 'none';
  resultsConElm.style.display = 'block';
  resultsElm.innerText = results;
}

// 次の問題を表示
function showQuiz() {
  quizHeaderElm.style.display = 'block';
  submitBtn.style.display = 'block';
  resultsConElm.style.display = 'none';
}

// 採点
function checkScore() {
  if (score == quizDataJp.length) {
    return '全問正解！おめでとう！';
  } else {
    return '曲を聞いてもう一回挑戦しよう！';
  }
}

submitBtn.addEventListener('click', event => {
  event.preventDefault();

  // 回答を取得
  const answer = getAnswered();

  // 回答している
  if(answer) {

    // 正誤判定
    if (answer === quizDataJp[currentQuiz].correct) {
      showResults('正解！');
      score++;
    } else {
      showResults('残念...');
    }

    // ラジオボタンの選択を解除する
    document.getElementById(answer).checked = false;
  }
});

nextQuizBtn.addEventListener('click', event => {
  event.preventDefault();
  const message = document.getElementById(questionNumber);   
  // 次の問題へ進む
  currentQuiz++;
  
  // まだ問題が残っている
  if (currentQuiz < quizDataJp.length) {
    // 次の問題を読み込む
    loadQuiz();

    // 問題を表示する
    showQuiz();

  // 全ての問題に回答した
  } else {
    alert(checkScore());
    message.style.display = "block"; 
    window.location.reload();
  }
});