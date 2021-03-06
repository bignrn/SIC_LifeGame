/*
TEST RUN

date:2021.09.13
ver:a0
==================
*Image File size*
cells.png    : 8x16
building.png : 16x24
player.png   : 16x16
tiles.png   : 64x64
==================

参考URL:
・JSファイルからJSファイルを呼び出す【web】
https://www.ipentec.com/document/javascript-link-js-file-to-js-file
・RPGをJSで作成【再生リスト】
https://youtube.com/playlist?list=PLJ86MSrhnFKVcfaffKPYkvfkPg4qRsijs

 */
//他のファイルからの呼び出し】マップタイル情報
document.write("<script src='data.js'></script>");//JSファイルの読み込み
//他のファイルからの呼び出し】テキストウィンドウ
document.write("<script src='textWind.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】プレイヤー情報表示画面
document.write("<script src='player_Info.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】イベント処理
document.write("<script src='player_event.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】マップタイル情報
document.write("<script src='map.js'></script>");//JSファイルの読み込み
//【他のファイルからの呼び出し】プレイヤー駒の移動処理
document.write("<script src='player_move.js'></script>");//JSファイルの読み込み

//変数・定数
const FONT = "10px monospace"; //フォント設定
const TILESIZE = 8; //タイルの幅(8ドット)
const TILECOLUMN = 8;   //画像タイルの列数

const WIDTH = 248;    //仮想画面の幅
const HEIGHT = 144;   //仮想画面の高さ

let Screen;     //仮想画面
let gCount = 0; //内部カウンター
let gImageMap;

var Map = function (){getMapData()};  //マップタイルの要素番号を取得(←map.js)
var Starts; //プレイヤー駒の初期位置
var FirstTile;  //第１マスの座標
let players = 4;//プレイヤー人数
var order_player = ["1P", "2P", "3P", "4P"];    //プレイヤー名呼出用
var order_String = "";  //順番表示用
var dice_g = ""; //ダイスの出目
var titleflag = true;   //人数選択したか判断する用
var turn_player = 0;    //現在のプレイヤーを判断する用
var g_end_flag = false; //ゲームが終了したか判断する用

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
    for (var y = 0;y < Map.length;y++){
        for (var x = 0;x < Map[y].length;x++){
            const idx = Map[y][x];
            DrawTile(g, idx, x * TILESIZE, y * TILESIZE);       //マップを描画するファンクションを呼出
            if(idx == 37 && titleflag)
                SetStartPosition(x * TILESIZE, y * TILESIZE);   //スタートマスの位置をプレイヤーの初期位置に設定
            if(idx == 63 && titleflag)
                SetFirstPosition(x * TILESIZE, y * TILESIZE);
        }
    }

    //プレイヤー駒、サイコロ枠、順番表示枠の生成
    DrawPlayers(g);
    DrawFrame(g);

    g.font = FONT;
    g.fillText("順番：" + order_String, 40, 8);
    g.fillText(dice_g, 10, 20);

    //****Norarun の作業↓
    playerInfoMain();   //playerInfoのfunctionを呼び出し
    playerEventMain(g); //player_eventのfunctionを呼び出し
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

function SetFirstPosition(x, y) {
    FirstTile = [x, y];
}

/**
 * マップ上のスタート位置にプレイヤーを上乗せする
 * @param g context
 * @constructor
 */
function DrawPlayers(g){
    for (var i = 0; i < players; i++){
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
 * ラジオボタンで指定された人数の取得
 * @constructor
 */
function GetPlayers(){
    var elements = document.getElementsByName('players');
    var len = elements.length;
    var checkValue = '';

    for (var i = 0; i < len; i++){
        if (elements.item(i).checked){
            checkValue = elements.item(i).value;
        }
    }
    players = checkValue;
}

/**
 * 決定ボタンが押されたときに人数設定のラジオボタン等を非表示にする
 * @constructor
 */
function NonePlayers(){
    const element = document.getElementById('playing');
    element.style.display = "none";
    titleflag = false;

    e_gameWatch = false;    //スタート画面を消すため

    //順番項目を人数分の長さにして写す
    for (var i = 0; i < players; i++) {
        order_String += order_player[i];
        order_String += " → ";
    }
    order_String += order_player[0] + "...";

    setMapData(Map);
    setPosition(Starts, FirstTile, TILESIZE);
}

/**
 * サイコロの出目だけプレイヤーを移動させ、ゲームが終了したかを確認する
 * @constructor
 */
function GetMove() {
    var gp;
    if (!g_end_flag) {
        var np = turn_player % players;
        var moving = Math.round( Math.random() * 5) + 1;
        dice_g = (np + 1) + "P:" + moving;
        gp = move(np, moving);
    }else {
        gp = 99;
    }
    if (gp == 99) {
        g_end_flag = true;
        console.log("/----clear!!!----/");
    }else if (gp == 999) {
        turn_player++;
        GetMove();
    }else {
        Starts[np] = gp;
        var longitude = Starts[np][0] / 8;
        var latitude = Starts[np][1] / 8;
        etext = eventSwitch(np, Map[latitude][longitude]);
        getPlayerNum(np, Map[latitude][longitude]);
        turn_player++;
    }
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

    setInterval(function (){Timer()},400);//500msで呼び出す
}