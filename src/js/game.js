const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

canvas.setAttribute('style', 'display:block;margin:auto;background-color: #ddd');

document.body.appendChild(canvas);



//
// ★ここからブロック崩しのプログラム★
//

const ball = {
  x: null,
  y: null,
  width: 5,
  height: 5,
  speed: 4,
  dx: null,
  dy: null,
  
  update: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    
    // ボールが壁に当たった時に跳ね返すための条件分岐
    if(this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if(this.y < 0 || this.y > canvas.height) this.dy *= -1;
    // ボールが地面に落ちた時にゲームを終了させる場合は
    // if(this.y > canvas.height)　を条件式にプログラムする
    
    
    this.x += this.dx;
    this.y += this.dy;
  }
}

const paddle = {
  x: null,
  y: null,
  width: 100,
  height: 15,
  speed: 0,
  
  update: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    
    this.x += this.speed;
  }
}

const block = {
  width: null,
  height: 20,
  data: [], // 全ブロックの位置情報を格納する
  
  update: function() {
    this.data.forEach(brick => {
      ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      ctx.stroke();
    })
  }
}

// ブロックの配置を配列で指定できるようにする
// 0：非表示
// 1：表示
const level = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1],
]

function init()  {
    loop();
  paddle.x = canvas.width / 2 - paddle.width / 2;
  paddle.y = canvas.height - paddle.height;
  
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2 + 50;
  ball.dx = ball.speed;
  ball.dy = ball.speed;
  
  block.width = canvas.width / level[0].length;
  
  // 全ブロックの位置情報を設定する
  for(let i=0; i<level.length; i++) {
    for(let j=0; j<level[i].length; j++) {
      if(level[i][j]) {
        block.data.push({
          x: block.width * j,
          y: block.height * i,
          width: block.width,
          height: block.height
        })
      }
    }
  }
}

// 当たり判定
const collide = (obj1, obj2) => {
  return obj1.x < obj2.x + obj2.width &&
         obj2.x < obj1.x + obj1.width &&
         obj1.y < obj2.y + obj2.height &&
         obj2.y < obj1.y + obj1.height;
}

// メイン処理
const loop = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  paddle.update();
  ball.update();
  block.update();
  
  // ボールとパドルの当たり判定
  if(collide(ball, paddle)) {
    ball.dy *= -1;
    ball.y = paddle.y - ball.height; // パドルの端にボールが当たった時にめり込まないようにする
  }
  
  // ボールとブロックの当たり判定
  block.data.forEach((brick, index) => {
    if(collide(ball, brick)) {
      ball.dy *= -1;
      block.data.splice(index, 1);
    }
  })
  
  window.requestAnimationFrame(loop);
}





document.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft') paddle.speed = -6;
  if(e.key === 'ArrowRight') paddle.speed = 6;
});

document.addEventListener('keyup', () => paddle.speed = 0);






// スマホ対応
// <![CDATA[
paddle.addEventListener('dragend',dgend,false);
paddle.addEventListener('touchstart',tcstart,false);
paddle.addEventListener('touchend',tcend,false);
function dgend(e){
paddle.style.position='absolute';
paddle.style.top=(e.pageY-50).toString()+'px';
paddle.style.left=(e.pageX-50).toString()+'px';
}
function tcstart(e){
e.preventDefault();
}
function tcend(e){
e.preventDefault();
paddle.style.position='absolute';
paddle.style.top=(e.changedTouches[0].pageY-50).toString()+'px';
paddle.style.left=(e.changedTouches[0].pageX-50).toString()+'px';
}
// ]]>