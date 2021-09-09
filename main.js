/*
TEST RUN

date:2021.09.08
ver:a0
==================
*Image File size*
cells.png    : 8x16
building.png : 16x24
player.png   : 16x16
tiles.png   : 48*24
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
//【他のファイルからの呼び出し】マップタイル情報
document.write("<script src='map.js'></script>");//JSファイルの読み込み

//変数・定数
const FONT = "10px monospace"; //フォント設定
const TILESIZE = 8; //8ドット
const TILECOLUMN = 8;   //画像タイルの列数

const WIDTH = 248;    //仮想画面の幅
const HEIGHT = 144;   //仮想画面の高さ

let Screen;     //仮想画面
let gCount = 0; //内部カウンター
let gImageMap;

var Map = function (){getMapData()};  //マップタイルの要素番号を取得(←map.js)

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
    for (let y = 0;y < Map.length;y++){
        for (let x = 0;x < Map[y].length;x++){
            DrawTile(g, Map[y][x], x * TILESIZE, y * TILESIZE);//マップを描画するファンクションを呼出
        }
    }

    //プレイヤー駒、サイコロ枠、順番表示枠の生成
    DrawPlayers(g);
    DrawFrame(g);

    g.font = FONT;
    g.fillText("HelloWorld" + gCount,0, 120);
    g.fillText("順番：a,b,c,d", 40, 8);

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
 * サイコロ枠、順番表示枠の作成
 * g context
 * @constructor
 */
function DrawFrame(g){
    g.fillRect(0,0,40,32);  //サイコロの枠線
    g.clearRect(2,2,36,28); //サイコロ枠線の内側
    g.clearRect(40,0,200,8);//順番表示エリア
}

/**
 * マップ内のプレイヤーを上乗せする
 * g context
 * @constructor
 */
function DrawPlayers(g){
    DrawTile(g, 8, 6 * TILESIZE, 5 * TILESIZE); //1P
    DrawTile(g, 9, 8 * TILESIZE, 5 * TILESIZE); //2P
    DrawTile(g, 10, 9 * TILESIZE, 3 * TILESIZE);//3P
    DrawTile(g, 11, 2 * TILESIZE, 7 * TILESIZE);//4P
}

/**
 * マップ描画
 * @param g context
 * @param idx index_number
 * @param x langitude
 * @param y latitude
 * @constructor
 */
function DrawTile(g, idx, x, y) {
    const ix = Math.floor(idx % TILECOLUMN) * 8;
    const iy = Math.floor(idx / TILECOLUMN) * 8;
    g.drawImage(gImageMap, ix,iy,TILESIZE,TILESIZE, x,y,TILESIZE,TILESIZE);  //描画 8×8
    /*
        元の書き方
        g.drawImage(Imageインスタンス, 画像x0,画像y0,画像x'0,画像y'0, 表示x, 表示y, size, size);
        g.drawImage(gImageMap, 0,0,TILESIZE,TILESIZE, x * TILESIZE, y * TILESIZE,TILESIZE,TILESIZE);
        省略版
        g.drawImage(gImageMap, x * 16, y * 24);  //描画 8x16
    */
}

/**
 * ゲーム画面立ち上げ
 *
 */
window.onload = function (){
    gImageMap = new Image();gImageMap.src = "img/tiles.png";

    Screen = document.createElement("canvas");  //仮想画面を作成
    Screen.width = WIDTH;
    Screen.height = HEIGHT;

    setInterval(function (){Timer()},1000);//500msで呼び出す
}