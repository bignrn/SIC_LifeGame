/*
ここにはゲーム情報を表示する処理を記述

date:2021.09.09
ver:a0_info
 */
//変数・定数
const INFO_FONT = "20px monospace"; //フォント設定
const COL       = 2;                //タイル列数
const ROW       = 2;                //タイル行数

let WiWidth   = 290;                //ウィンドウ幅
let WiHeight  = 550;                //ウィンドウ高さ
let playerImage = "./img/player.png"
/**
 * main function
 * メインウインドウから呼ばれるメソッド
 * @returns {number}
 */
function playerInfoMain(){
    //定数
    const BORDER    = 4;                //枠の幅

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

    //プレイヤーの情報
    playerInfo(g, 0, 0, "Name1", 30000, 0,"小企業","無し","あり");
    playerInfo(g, 110,1, "Name2", 6000, 40,"大企業","応情","無し");
    playerInfo(g, 220,2, "Name3", 12000, 20,"中企業","基情","あり");
    playerInfo(g, 330,3, "Name4", 5000, 0,"小企業","無し","無し");
}

/**
 * キャンバスの設定
 */
function settingWi(){
    const ca = document.getElementById("info"); //ID取得

    ca.width = WiWidth;     //幅
    ca.height = WiHeight;   //高さ

    //プレイヤー画像
    gPlayerImage = new Image();gPlayerImage.src = "img/player.png";
}

/**
 * プレイヤー情報を描画するメソッド
 * ・・・interval例は「y:110」置きに表示推奨。
 *
 * @param g         getContext  コンテキストを取得
 * @param interval  int         ずらして表示する為の引数
 * @param index     int         画像タイル番号で処理(0~3)
 * @param uName     String      プレイヤーの名前
 * @param gold      int         所持金。数字のみ。
 * @param point     int         単位ポイント数。数字のみ。
 * @param offer       String      内定してる企業名
 * @param cer       String      持っている資格名
 * @param Dating    String      交際の有無。
 * @param job       String      バイト先の名前。
 */
function playerInfo(g, interval, index, uName, gold, point, offer, cer, Dating, job){
    //定数
    const pix = (index % COL) * TILESIZE;
    const piy = Math.floor(index / ROW) * TILESIZE;
    //プレイヤーの画像
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = 0;    //補間処理
    /*
    元の書き方
    g.drawImage(Imageインスタンス, 画像x0,画像y0,画像x'0,画像y'0, 表示x, 表示y, sizeX, sizeY);
    g.drawImage(gImageMap, 0,0,TILESIZE,TILESIZE, x * TILESIZE, y * TILESIZE,TILESIZE,TILESIZE);
     */
    g.drawImage(gPlayerImage, pix,piy,TILESIZE,TILESIZE,10,20 + interval,32,32);
    //プレイヤーの名前
    g.fillText(uName, 50, 43 + interval);
    //プレイヤーの金額
    g.fillText("G." + gold, 10, 65 + interval);
    //プレイヤーの単位
    g.fillText("単位："+point+"/40", 10, 85 + interval);
    //プレイヤーの内定
    g.fillText("内定："+offer, 150, 65 + interval);
    //プレイヤーの資格
    g.fillText("資格："+cer, 150, 85 + interval);
    //プレイヤーの交際
    g.fillText("交際："+Dating, 150, 105 + interval);
    //プレイヤーのバイト先名
    g.fillText("仕事："+Dating, 150, 125 + interval);
}