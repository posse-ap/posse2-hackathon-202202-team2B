'use strict';

 //ここからタイムライン
 $(function () {
  $(window).scroll(function () {
    $('.timeline-list-item-5').each(function () {
      const targetElement = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight) {
        $(this).addClass('view');
      }
    });

    $('.timeline-list-item-6').each(function () {
      const targetElement = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight) {
        $(this).addClass('view');
      }
    });

    $('.image-1').each(function () {
      const targetElement = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight) {
        $(this).addClass('view');
      }
    });
  });
});

// クイズデータを読み込む
// import { quizDataJp } from './quiz_data_jp.js';

const quizDataJp = [
  {
    question: '問1/4　一人ひとりに目が行き届きやすく、◯◯◯の向上を支援しやすい',
    a: '大学のGPA',
    b: '健康',
    c: 'プログラミングスキル',
    d: '睡眠',
    correct: 'c'
  },
  {
    question: '問2/4　一人ひとりの◯◯◯を手厚くサポートしやすい',
    a: '健康',
    b: '交通費',
    c: '大学の課題',
    d: '悩み',
    correct: 'd'
  },
  {
    question: '問3/4　一人ひとりの◯◯◯がコミュニティ内で認識されやすい',
    a: '家族',
    b: '個性/存在',
    c: '黒歴史',
    d: 'バイト代',
    correct: 'b'
  },
  {
    question: '問4/4　◯◯◯人間関係を構築しやすい。一生の友達',
    a: '深い',
    b: '浅い',
    c: 'よっ友的な',
    d: '軽い',
    correct: 'a'
  },
];

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
const nextQuizBtn = document.getElementById('next_quiz');

// 結果表示用の要素
const quizHeaderElm = document.getElementById('quiz-header');
const resultsConElm = document.getElementById('results-container');
const resultsElm = document.getElementById('results');



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

loadQuiz();

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
    return 'もう一回挑戦しよう！';
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

let message = document.getElementById('message');
let message2 = document.getElementById('message2');
let next_quiz = document.getElementById('next_quiz');
nextQuizBtn.addEventListener('click', event => {
  event.preventDefault(); 
  // 次の問題へ進む
  currentQuiz++;
  
  // まだ問題が残っている
  if (currentQuiz <quizDataJp.length) {
    // 次の問題を読み込む
    loadQuiz();

    // 問題を表示する
    showQuiz();

  // 全ての問題に回答した
  } else {
    showResults('Finish!');
    message.style.display = "block";  
    message2.style.display = "block"; 
    next_quiz.style.display = "none";
  }
})


// モーダル
window.addEventListener('DOMContentLoaded', function(){
    /** jQueryの処理 */
    $(function () {
      $('#openModal').click(function(){
          $('#modalArea').fadeIn();
      });
      $('#closeModal , #modalBg').click(function(){
        $('#modalArea').fadeOut();
      });
    });
  });


 