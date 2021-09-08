/*
ここにはゲーム情報を表示する処理を記述

date:2021.09.08
ver:a0_info
 */
//変数・定数
const INFO_FONT = "20px monospace"; //フォント設定
const BORDER    = 4;                //枠の幅

let WiWidth   = 250;                //ウィンドウ幅
let WiHeight  = 550;                //ウィンドウ高さ
let playerImage = "./img/player.png"
/**
 * main function
 * メインウインドウから呼ばれるメソッド
 * @returns {number}
 */
function playerInfoMain(){
    settingWi();
    const ca = document.getElementById("info"); //ID取得
    const g = ca.getContext("2d");

    //背景
    g.fillStyle = "black";  //枠線の色
    g.fillRect(0,0,WiWidth,WiHeight);
    g.fillStyle = "white";  //背景の色
    g.fillRect(2,2,WiWidth - BORDER ,WiHeight - BORDER);

    //text
    g.fillStyle = "black";
    g.font = INFO_FONT;
    g.fillText("プレイヤー情報",0,20)

    playerInfo(g);
}

/**
 * キャンバスの設定
 */
function settingWi(){
    const ca = document.getElementById("info"); //ID取得

    ca.width = WiWidth;     //幅
    ca.height = WiHeight;   //高さ
}

/**
 * プレイヤー情報を描画する
 * @param g コンテキストを取得
 */
function playerInfo(g){
    gPlayerImage = new Image();gPlayerImage.src = "img/player.png";
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = 0;    //補間処理
    g.drawImage(gPlayerImage, 0,0,8,8,10,40,32,32);
    g.fillText("Name1", 10, 40);
}