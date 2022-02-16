function answer(){
    let Q= document.getElementById( "Q" );
    let A = Number(Q.q1.value) + Number(Q.q2.value) ;

    if (A == 14) {
        text = "「POSSE2のムードメーカー」";
    }else if(A == 18){
        text = "「POSSE2の技術者」";
    }else if(A == 24){
        text = "「POSSE2に平和をもたらすタイプ」";
    }else if(A == 15){
        text = "「POSSE2の成功者」";
    }else if(A == 19){
        text = "「POSSE2を引っ張るタイプ」";
    }else if(A == 25){
        text = "「POSSE2で最も楽しんでいるタイプ」";
    }else if(A == 16){
        text = "「POSSE2に改革を起こすタイプ」";
    }else if(A == 20){
        text = "「POSSE2の聖母」";
    }else if(A == 26){
        text = "「POSSE2で頼られるタイプ」";
    }else{
        return;
    }
    document.getElementById("kotae").innerHTML = text;
}

function radioDeselection() {
    let kotae = document.getElementById("kotae");
    let reLoad = document.querySelectorAll('input[type="radio"]');
    reLoad.forEach(element => {
        element.checked = false
        kotae.innerHTML = "「　　　　　　　　　　　　　　　　」";
      });
  }

//   $.scrollify({
//     section:'.scrollify', //対象要素を指定
//     easing: 'swing', // イージングを指定
//     scrollSpeed: 600, // スクロール時の速度
//     updateHash: false, // スクロール時アドレスバーのURLを更新
//   });