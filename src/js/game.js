window.onload = () => {

    /**
     * domの生成・位置取得
     */
    const setDomPosition = (dom, pos) => {
        dom.style.left = `${pos.x}px`;
        dom.style.top = `${pos.y}px`;
    }

    const getDomPosition = (dom) => {
        const pos = {
            x: parseFloat(dom.style.left),
            y: parseFloat(dom.style.top)
        };
        return pos;
    }

    const createDom = (className) => {
        const dom = document.createElement('div');
        dom.classList.add(className);
        return dom;
    }

    const addChildDom = (parentDom, childDom) => {
        parentDom.append(childDom);
    }

    const removeChildDom = (parentDom, childDom) => {
        parentDom.removeChild(childDom);
    }

    const changeDomTextContent = (dom, textContent) => {
        dom.textContent = textContent;
    }

    /**
     * 入力イベント
     */
    const leftButtonPress = () => {
        barLeftSpeed = 5;
    }

    const leftButtonRelease = () => {
        barLeftSpeed = 0;
    }

    const rightButtonPress = () => {
        barRightSpeed = 5;
    }

    const rightButtonRelease = () => {
        barRightSpeed = 0;
    }

    const displayRelease = () => {
        if (gameMode === "startWait") {
            changeDomTextContent(explainLabelDom, "break all blocks!");
            gameMode = "gamePlaying";
        }
    }

    /**
     * メインループイベント
     */
    const mainLoop = () => {
        switch (gameMode) {
            case "gamePlaying":
                {
                    // バーの操作
                    const barPos = getDomPosition(barDom);
                    const barMovedPos = {
                        x: barPos.x + barRightSpeed - barLeftSpeed,
                        y: barPos.y
                    };
                    if (barMovedPos.x >= 0 && barMovedPos.x <= 340) {
                        setDomPosition(barDom, barMovedPos);
                    }

                    // ボール移動
                    const ballPos = getDomPosition(ballDom);
                    let ballMovedPos = {
                        x: ballPos.x + ballVec.x,
                        y: ballPos.y + ballVec.y
                    };
                    if (ballMovedPos.x > 390) {
                        ballMovedPos.x = 390;
                        ballVec.x = -ballVec.x;
                    }
                    if (ballMovedPos.x < 0) {
                        ballMovedPos.x = 0;
                        ballVec.x = -ballVec.x;
                    }
                    if (ballMovedPos.y < 0) {
                        ballMovedPos.y = 0;
                        ballVec.y = -ballVec.y;
                    }
                    if (ballMovedPos.y > 510) {
                        init(); // ボールが画面下にいってしまうとゲームオーバーなので初期化する
                    } else {
                        setDomPosition(ballDom, ballMovedPos);
                    }

                    // ブロックとの衝突処理
                    for (const blockDom of blockDoms) {
                        const blockPos = getDomPosition(blockDom);
                        if (checkCollision({ x: blockPos.x, y: blockPos.y, width: 40, height: 20 }, { x: ballMovedPos.x, y: ballMovedPos.y, width: 10, height: 10 })) {
                            removeChildDom(displayDom, blockDom);
                            blockDoms = blockDoms.filter((dom => {
                                return dom != blockDom;
                            }));
                            ballVec.y = -ballVec.y;
                        }
                    }

                    // バーと球の衝突処理
                    if (checkCollision({ x: barPos.x, y: barPos.y, width: 60, height: 20 }, { x: ballMovedPos.x, y: ballMovedPos.y, width: 10, height: 10 })) {
                        ballMovedPos.y = barDom.y;
                        ballVec.y = -ballVec.y;
                    }

                    // ブロックが全てなくなったか調べる
                    if (blockDoms.length === 0) {
                        gameMode = "clear";
                        changeDomTextContent(explainLabelDom, "CLEAR!");
                    }


                    break;
                }
        }
        window.requestAnimationFrame(mainLoop);
    };
    window.requestAnimationFrame(mainLoop);

    /**
     * ロジック部分
     */

    // 初期化関数
    const init = () => {
        // 状態の初期化
        gameMode = "startWait";

        changeDomTextContent(explainLabelDom, "click to start");

        // 静的な定義DOMの座標定義
        setDomPosition(barDom, { x: 175, y: 410 });
        setDomPosition(leftButtonDom, { x: 50, y: 440 });
        setDomPosition(rightButtonDom, { x: 250, y: 440 });
        setDomPosition(ballDom, { x: 190, y: 300 });
        setDomPosition(explainLabelDom, { x: 0, y: 350 });

        // ボール向き定義
        ballVec = { x: 3, y: -3 };


        // 画面にブロックが残っていれば、全部削除してblockDomsを空にする
        while (blockDoms.length > 0) {
            removeChildDom(displayDom, blockDoms.pop());
        }


        //ブロック生成 (w:20px h:10px)
        for (let xIndex = 0; xIndex < 5; xIndex++) {
            for (let yIndex = 0; yIndex < 5; yIndex++) {
                const blockDom = createDom("block");
                setDomPosition(blockDom, { x: xIndex * 73, y: yIndex * 20 });
                addChildDom(displayDom, blockDom);
                blockDoms.push(blockDom);
            }
        }
    }


    const calcLength = (pos1, pos2) => {
        return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    }

    const checkCollision = (rect1, rect2) => {
        if ((rect1.x + rect1.width) >= rect2.x && rect1.x <= (rect2.x + rect2.width) && (rect1.y + rect1.height) >= rect2.y && rect1.y <= (rect2.y + rect2.height)) {
            return true;
        }
        return false;
    }



    // 副作用を持つ状態変数の定義
    let blockDoms = [];
    let barLeftSpeed = 0;
    let barRightSpeed = 0;
    let ballVec = { x: 5, y: 5 };
    let gameMode = "startWait"; // "startWait"|"gamePlaying"|"clear"



    // 初期から存在するDOMの定義
    const displayDom = document.getElementsByClassName("display")[0];
    const barDom = document.getElementsByClassName("bar")[0];
    const ballDom = document.getElementsByClassName("ball")[0];
    const leftButtonDom = document.getElementsByClassName("left-button")[0];
    const rightButtonDom = document.getElementsByClassName("right-button")[0];
    const explainLabelDom = document.getElementsByClassName("explain-label")[0];


    /**
     * 入力系
     */
    // MEMO: ＰＣとスマホでタッチにベントが異なるので複数作成する 
    //       実はPC・スマホ両方使えるpointerdown/pointerupというイベントがあるのだが、古いsafariがこれで動作しないので不採用
    //       あと数年たったら死滅すると思われるのでpointer系のイベントが使えるようになるはず
    // ＰＣ用
    leftButtonDom.addEventListener("mousedown", leftButtonPress, false);
    leftButtonDom.addEventListener("mouseup", leftButtonRelease, false);
    leftButtonDom.addEventListener("mouseout", leftButtonRelease, false);
    rightButtonDom.addEventListener("mousedown", rightButtonPress, false);
    rightButtonDom.addEventListener("mouseup", rightButtonRelease, false);
    rightButtonDom.addEventListener("mouseout", rightButtonRelease, false);
    displayDom.addEventListener("mouseup", displayRelease, false);


    // スマホ用
    leftButtonDom.addEventListener("touchstart", leftButtonPress, false);
    leftButtonDom.addEventListener("touchend", leftButtonRelease, false);
    rightButtonDom.addEventListener("touchstart", rightButtonPress, false);
    rightButtonDom.addEventListener("touchend", rightButtonRelease, false);
    displayDom.addEventListener("touchend", displayRelease, false);


    init();
}

// まるばつゲーム
let flag = false;
let counter = 0;
let winningLine = null;
const squares = document.querySelectorAll('.square');
const squaresArray = [].slice.call(squares); // IE11対策
const messages = document.querySelectorAll('.message-list li');
const messagesArray = [].slice.call(messages); // IE11対策
const resetBtn = document.querySelector('#reset-btn');
const wait =document.getElementById('wait');




// メッセージの切り替え関数
const setMessage = (id) => {
    messagesArray.forEach((message) => {
        if (message.id === id) {
            message.classList.remove('js-hidden');
        } else {
            message.classList.add('js-hidden');
        }
    });
}


// 勝利判定のパターン関数
const filterById = (targetArray, idArray) => {
    return targetArray.filter((e) => {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
// 勝利判定パターン
// console.log(squaresArray);
const line1 = filterById(squaresArray, ['1-1', '1-2', '1-3']);
const line2 = filterById(squaresArray, ['2-1', '2-2', '2-3']);
const line3 = filterById(squaresArray, ['3-1', '3-2', '3-3']);
const line4 = filterById(squaresArray, ['1-1', '2-1', '3-1']);
const line5 = filterById(squaresArray, ['1-2', '2-2', '3-2']);
const line6 = filterById(squaresArray, ['1-3', '2-3', '3-3']);
const line7 = filterById(squaresArray, ['1-1', '2-2', '3-3']);
const line8 = filterById(squaresArray, ['1-3', '2-2', '3-1']);
const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

// 勝利判定関数
const isWinner = (symbol) => {
    // some: 1つでも条件を満たしていればTrueを返す
    const result = lineArray.some(line => {
        // every: 全て条件を満たしていればTrueを返す
        const subResult = line.every((square) => {
            if (symbol === 'maru') {
                return square.classList.contains('js-maru-checked');
            } else 
            if (symbol === 'batsu') {
                return square.classList.contains('js-batsu-checked');
            }
        });

        if (subResult) { winningLine = line }

        return subResult;
    });
    return result;
}




// ゲーム終了時の関数
const gameOver = () => {
    // 全てのマスをクリック不可にする
    squaresArray.forEach((square) => {
        square.classList.add('js-unclickable');
    });

    // 勝った時のマス目をハイライトする
    if (winningLine) {
        winningLine.forEach((square) => {
            square.classList.add('js-highLight');
        });
    }

    //　リセットボタン表示
    resetBtn.classList.remove('js-hidden');
    wait.classList.add('hidden')
}


// ゲームの初期化の関数
const initGame = () => {
    flag = false;
    counter = 0;
    winningLine = null;
    squaresArray.forEach((square) => {
        square.classList.remove('js-maru-checked');
        square.classList.remove('js-batsu-checked');
        square.classList.remove('js-unclickable');
        square.classList.remove('js-highLight');
    });
    setMessage('batsu-turn');
    resetBtn.classList.add('js-hidden');
    wait.classList.remove('hidden')
}
resetBtn.addEventListener('click', function() {
    initGame();
});


let place=[]
let waitCounter = 0
//　マスをクリックした時のイベント発火
squaresArray.forEach((square) => {

    square.addEventListener('click', function(e)  {
        counter++;
        waitCounter=0
        place.push(e.target)
        
        if (flag === true) {
            square.classList.add('js-maru-checked');
            square.classList.add('js-unclickable');
            
            if (isWinner('maru')) {
                setMessage('maru-win');
                gameOver();
                return;
            }
            
            setMessage('batsu-turn');
            flag = false;
            
        } else {
            square.classList.add('js-batsu-checked');
            square.classList.add('js-unclickable');
            
            if (isWinner('batsu')) {
                setMessage('batsu-win');
                gameOver();
                return;
            }
            
            setMessage('maru-turn');
            flag = true;
        }

        // 引き分け判定
        if (counter === 9) {
            setMessage('draw');
            gameOver();
        }
    });

});

wait.addEventListener('click',()=>{
    if ( waitCounter > 0) return
    if ( counter > 0 ) {
        if (flag === false) {
            place.slice(-1)[0].classList.remove('js-maru-checked')
            place.slice(-1)[0].classList.remove('js-unclickable');
            setMessage('maru-turn');
            flag = true;
        } else {
            place.slice(-1)[0].classList.remove('js-batsu-checked') 
            place.slice(-1)[0].classList.remove('js-unclickable');
            setMessage('batsu-turn');
            flag = false;
        }
        // console.log({place})
        console.log({waitCounter})
        waitCounter++;
        counter--;
    }
})
