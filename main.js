/*
TEST RUN

date:2021.09.08
ver:a0
==================
*Image File size*
cells.png    : 8x16
building.png : 16x24
player.png   : 16x16
==================

参考URL:
・JSファイルからJSファイルを呼び出す【web】
https://www.ipentec.com/document/javascript-link-js-file-to-js-file
・RPGをJSで作成【再生リスト】
https://youtube.com/playlist?list=PLJ86MSrhnFKVcfaffKPYkvfkPg4qRsijs

 */
//【他のファイルからの呼び出し】プレイヤー情報表示画面
document.write("<script src='player_Info.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】ボタン描画
//////////////////////////
//
//date:9/8 17/23
//ver.a0_btn
//変更点 player_btn.js -> player_event.js
//
/////////////////////////
document.write("<script src='player_event.js'></script>");//JSファイルの読み込み

//変数・定数
const FONT = "10px monospace"; //フォント設定
const TILESIZE = 8; //8ドット

const WIDTH = 248;    //仮想画面の幅
const HEIGHT = 144;   //仮想画面の高さ

let Screen;     //仮想画面
let gCount = 0; //内部カウンター
let gImageMap;
/**
 * タイマーイベント
 * @constructor
 */
function Timer(){
    gCount++;//内部カウンター

    const ca = document.getElementById("main");
    ca.width = window.innerWidth;   //キャンバスの幅をブラウザの幅へ
    ca.height = window.innerHeight; //キャンバスの高さをブラウザの高さへ

    const g2 = ca.getContext("2d");

    g2.imageSmoothingEnabled = g2.msImageSmoothingEnabled = 0;    //補間処理

    //仮想画面2d
    const g = Screen.getContext("2d");

    //画像生成
    for (let y = 0;y < 80;y++){
        for (let x = 0;x < 80;x++){
            /*
            元の書き方
            g.drawImage(Imageインスタンス, 画像x0,画像y0,画像x'0,画像y'0, 表示x, 表示y, size, size);
            g.drawImage(gImageMap, 0,0,TILESIZE,TILESIZE, x * TILESIZE, y * TILESIZE,TILESIZE,TILESIZE);

             */
            // g.drawImage(gImageMap, x * 16, y * 24);  //描画 8x16
            g.drawImage(gImageMap, 0,0,TILESIZE,TILESIZE, x * TILESIZE, y * TILESIZE,TILESIZE,TILESIZE);
        }
    }

    g.font = FONT;
    g.fillText("HelloWorld" + gCount,0, 120);

    ////////////////////////////
    //
    //9/8 16:40
    //ver.a0_info ver.a0_btn
    //
    //変更点：textSet() -> playerInfoMain()
    //変更点：DrawBtn() -> playerEventMain()
    //
    ///////////////////////////
    //【他のファイルからの呼び出し】
    playerInfoMain();//playerInfoのfunctionを呼び出し
    playerEventMain(g);  //player_btnのfunctionを呼び出し

    g2.drawImage(Screen,0,0,Screen.width,Screen.height,0,0,Screen.width * 4,Screen.height * 4);
}
/**
 * ゲーム画面立ち上げ
 *
 */
window.onload = function (){
    gImageMap = new Image();gImageMap.src = "img/building.png";

    Screen = document.createElement("canvas");  //仮想画面を作成
    Screen.width = WIDTH;
    Screen.height = HEIGHT;

    setInterval(function (){Timer()},1000);//500msで呼び出す
}