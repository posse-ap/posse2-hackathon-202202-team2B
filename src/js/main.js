'use strict';
// 変数定義




// ここからスライドショー


var $section = $('.js-section'); // 各スライド
var $pager = $('#js-pager'); // ページャー枠




// scrollifyのオプション設定
var option = {
  section : '.js-section',
  easing: "swing",
  scrollSpeed: 600,
  scrollbars: true,
  before:function(index, section) {
    setCurrent(index); // 現在のsectionにクラスを設定
    pagerCurrent(index); // ページャーに対応する順番にクラス名を付与
  
    
   
  },
  
  afterRender:function() {
    createPager(); // ページャーの作成
    setCurrent(); // 現在のsectionにクラスを設定
    
   
    
   

  }
};

const last=document.getElementById('lastPage');
$(function() {
  $.scrollify(option); // scrollifyの実行
});







// ==============================
// functions
// ------------------------------



// 現在のsectionにクラスを設定
function setCurrent(index = 0) {
  
  // 一旦、すべてのsectionのクラスをとる
  
  $section.removeClass('is-show');
  $section.find('div').filter('.remove').empty(); 
  

  // 現在のsectionのみにクラスを付与
  $section.eq(index).addClass('is-show');
  if (index+1<5) {
    
    $("header").detach();
    
  

 $section.eq(index).children('div').append(`<div id=${index+1} class="section-container"></div>`);
//  １ページ目
$("<div>", {
  id: 'FirstWrapper',
  class:'first-page-wrapper'
}).appendTo('#1');
 $("<p>", {
  id: 'firstLeft',
  text:'POSSE2へようこそ',
  class:' fade-up first-left',
 }).appendTo('#FirstWrapper');
 $("<div>", {
  id: 'firstRight',
  class:' fade-up first-right',
 }).appendTo('#FirstWrapper');
 $("<p>", {
  
  text:'#01',
  class:' fade-up first-right-sub',
 }).appendTo('#firstRight');
 $("<p>", {
  
  text:'POSSE2の魅力は少人数ということです。',
  class:' fade-up first-right-text',
 }).appendTo('#firstRight');
 $("<p>", {
  
  text:'POSSE2では少人数なことを生かして',
  class:' fade-up first-right-text',
 }).appendTo('#firstRight');
 $("<p>", {
  
  text:'一人ひとりが輝ける環境が整っています。',
  class:' fade-up first-right-text',
 }).appendTo('#firstRight');

//  2ページ目
$("<div>", {
  id: 'secondWrapper',
  class:'second-page-wrapper'
}).appendTo('#2');
$("<div>", {
  id: 'secondRight',
  class:'second-right'
}).appendTo('#secondWrapper');

$("<p>", {
  text:'#02',
  class:' fade-down second-right-sub',
 }).appendTo('#secondRight');
$("<p>", {
  text:'POSSE2の',
  class:' fade-down second-right-text',
 }).appendTo('#secondRight');


$("<div>", {
  id: 'secondLeft',
  class:'second-left'
}).appendTo('#secondWrapper');
$("<div>", {
  id:'secondAline',
  class:' second-aline',
 }).appendTo('#secondLeft');


 $("<p>", {
  text:'歩みを見てみる',
  class:' fade-up second-left-line',
 }).appendTo('#secondLeft');

 $("<div>", {
  id: 'secondButton',
  class:'second-button-container'
}).appendTo('#secondWrapper');
 $("<a>", {
  href :'/src/html/ayumi.html',
  text:'POSSE2の歩みを覗いてみる',
  class:'second-button'
}).appendTo('#secondButton');




// 3ページ目
$("<div>", {
  id: 'thirdWrapper',
  class:'third-page-wrapper'
}).appendTo('#3');
$("<p>", {
  text:'#03',
  class:' fade-in third_sub',
 }).appendTo('#thirdWrapper');

$("<div>", {
  id: 'thirdTitleContainer',
  class:'third-title-container'
}).appendTo('#thirdWrapper');
$("<p>", {
  text:'自分の手で作ってみよう',
  class:' fade-in third',
 }).appendTo('#thirdTitleContainer');
$("<div>", {
  id: 'thirdExplainContainer',
  class:'third-explain-container'
}).appendTo('#thirdWrapper');
$("<p>", {
  text:'POSSE2にはゲームが好きな人も多いので',
  class:' fade-in third-explain',
 }).appendTo('#thirdExplainContainer');
 $("<p>", {
  text:'壁当てや五目並べなど楽しいゲームを共に切磋琢磨しながら作ることができます',
  class:' fade-in third-explain',
 }).appendTo('#thirdExplainContainer');
 $("<p>", {
  text:'実際に製作したものです是非プレイしてみてください！！',
  class:' fade-in third-explain',
 }).appendTo('#thirdExplainContainer');

 $("<div>", {
  id: 'gameButtonContainer',
  class:'game-button-container'
}).appendTo('#thirdWrapper');
$("<a>", {
  href:"/src/html/products.html",
  text:'click to play',
  class:' fade-in game-button',
 }).appendTo('#gameButtonContainer');


//  4ページ目
$("<div>", {
  id: 'forthWrapper',
  class:'forth-page-wrapper'
}).appendTo('#4');
$("<div>", {
  id: 'forthContainer',
  class:'forth-container'
}).appendTo('#forthWrapper');
$("<div>", {
  id: 'forthRightContainer',
  class:'forth-right-container'
}).appendTo('#forthContainer');
$("<p>", {
  text:'#4',
  class:' fade-in forth-right-sub',
 }).appendTo('#forthRightContainer');
$("<p>", {
  text:'自分の性格は',
  class:' fade-in forth-right-title',
 }).appendTo('#forthRightContainer');

$("<div>", {
  id: 'forthLeftContainer',
  class:'forth-left-container'
}).appendTo('#forthContainer');
$("<p>", {
  text:'POSSE2で',
  class:' fade-in forth-left-title',
 }).appendTo('#forthLeftContainer');
 $("<p>", {
  text:'どうやって活かされるだろう',
  class:' fade-in forth-left-title',
 }).appendTo('#forthLeftContainer');

 $("<div>", {
  id: 'forthButtonContainer',
  class:'forth-button-container'
}).appendTo('#forthContainer');
$("<a>", {
  href:'/src/html/free.html',
  id:'forthButton',
  text:'診断する',
  class:' fade-in forth-button',
 }).appendTo('#forthButtonContainer');


 
 

  }
  else if(index+1===5){

    $("body").append('<header id="header"><h1 class="logo"><a href="#"><img src="/src/image/10.png" alt="Travel Blog" /></a></h1><ul><div class="lists"><li><a href="/src/html/top.html" class="list hover_action">Home</a></li><li><a href="/src/html/ayumi.html" class="list hover_action">Timeline</a></li><li><a href="/src/html/products.html" class="list hover_action">Products</a></li><li><a href="/src/html/free.html" class="list hover_action">Free</a></li></div></ul></header>');}
  
//  $section.eq(index).children('div').addClass('is-show');
  


}

// ページャーに対応する順番にクラス名を付与
function pagerCurrent(index = 0) {
  var $li = $pager.find('li');
  $li.removeClass('is-current');
  $li.eq(index).addClass('is-current');
}

// ページャーの作成
function createPager() {
  $section.each(function(i, e){
    // ページ内リンク先の作成
    var sectionName = $(e).attr('data-section-name');
    // 最初のliにはクラスを付与
    var addClass = '';
    if (i === 0) {
        addClass = 'is-current';
    }
    // liのHTML作成
    var html = '';
    html += '<li class="' + addClass + '">';
    html += '<a href="#' + sectionName + '"></a>';
    html += '</li>';
    $pager.append(html);
  });
  
  pagerLink();
}

// ページャーでaタグをクリックされたらスクロールする
function pagerLink () {
  $pager.find('a').on('click', function() {
    $.scrollify.move($(this).attr("href"));
  });
}





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


 