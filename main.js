/*
TEST RUN

date:2021.09.08
ver:a0
==================
*Image File size*
cells.png    : 8x16
building.png : 16x24
player.png   : 16x16
tiles.png   : 48*40
==================

参考URL:
・JSファイルからJSファイルを呼び出す【web】
https://www.ipentec.com/document/javascript-link-js-file-to-js-file
・RPGをJSで作成【再生リスト】
https://youtube.com/playlist?list=PLJ86MSrhnFKVcfaffKPYkvfkPg4qRsijs

 */
//他のファイルからの呼び出し】テキストウィンドウ
document.write("<script src='textWind.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】プレイヤー情報表示画面
document.write("<script src='player_Info.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】イベント処理
document.write("<script src='player_event.js'></script>");//JSファイルの読み込み
//他のファイルからの呼び出し】マップタイル情報
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
let Starts; //プレイヤー駒の初期位置

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
            const idx = Map[y][x];
            DrawTile(g, idx, x * TILESIZE, y * TILESIZE);       //マップを描画するファンクションを呼出
            if(idx == 41)
                SetStartPosition(x * TILESIZE, y * TILESIZE);   //スタートマスの位置をプレイヤーの初期位置に設定
        }
    }

    //プレイヤー駒、サイコロ枠、順番表示枠の生成
    DrawPlayers(g);
    DrawFrame(g);

    g.font = FONT;
    g.fillText("HelloWorld" + gCount, 0, 120);
    g.fillText("順番：a,b,c,d", 40, 8);

    //****Norarun の作業↓
    //【他のファイルからの呼び出し】
    playerInfoMain();   //playerInfoのfunctionを呼び出し
    playerEventMain(g); //player_eventのfunctionを呼び出し
    // textWindMain(g);
    //****Norarun の作業↑
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
 * プレイヤー駒を置くためのスタート位置を格納
 * @param x longitude
 * @param y latitude
 * @constructor
 */
function SetStartPosition(x, y) {
    Starts = [
        [x, y],
        [x + TILESIZE, y],
        [x, y + TILESIZE],
        [x + TILESIZE, y + TILESIZE]
    ]
}

/**
 * マップ上のスタート位置にプレイヤーを上乗せする
 * @param g context
 * @constructor
 */
function DrawPlayers(g){
    for (let i = 0; i < Starts.length; i++){
        DrawTile(g, 8 + i, Starts[i][0], Starts[i][1]);
    }
}

/**
 * マップ描画
 * @param g context
 * @param idx index_number
 * @param x longitude
 * @param y latitude
 * @constructor
 */
function DrawTile(g, idx, x, y) {
    const ix = Math.floor(idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
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