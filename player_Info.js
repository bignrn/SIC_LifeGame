/*
ここにはゲーム情報を表示する処理を記述

date:2021.09.13
ver:a0_info
 */
//変数・定数
const INFO_FONT = "20px fantasy";   //フォント設定
const COL       = 2;                //タイル列数
const ROW       = 2;                //タイル行数
const I_BORDER  = 4;                //枠の幅
const I_PADING_X= -1;               //X軸方向に選択背景をずらす
const I_PADING_Y= -2;               //Y軸方向に選択背景をずらす

let WiWidth     = 290;                //ウィンドウ幅
let WiHeight    = 550;                //ウィンドウ高さ
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

    if(e_btn_index==0){
        playersInfoDraw(g); //プレイヤーの情報
    }else if(e_btn_index==1){
        playersLankDraw(g); //プレイヤーのランキング
    }
}

/**
 * プレイヤー情報を描画する
 * @param g
 */
function playersInfoDraw(g){
    //text
    g.font = INFO_FONT;
    g.fillStyle = "skyblue";
    g.fillRect(I_BORDER + I_PADING_X,I_BORDER+ I_PADING_Y,140,22);   //選択中の背景表示
    g.fillRect(I_BORDER,I_BORDER+20,WiWidth - I_BORDER * 2,WiHeight - I_BORDER * 7);   //選択中の背景表示
    g.fillStyle = "black";
    g.fillText("プレイヤー情報",0,20);     //タイトル
    g.fillText("ランキング",150,20);      //タイトル

    //プレイヤーの情報
    defaultset();
    var inte = 0;
    for (var i = 0; i < players; i++){
        playerInfo(g, inte, i, playersBox[i]["name"], playersBox[i]["apply"],playersBox[i]["credit"] ,playersBox[i]["offer"],playersBox[i]["achievement"],playersBox[i]["girlfriend"]);
        inte += 110;    //文字をずらすため
    }
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
    playerImageDraw(g, index, interval,0,0);  //プレイヤーの画像
    //プレイヤーの名前
    g.fillText(uName, 50, 43 + interval);
    //プレイヤーの金額
    g.fillText("￥." + gold, 10, 65 + interval);
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
/**
 * プレイヤー情報を描画する
 * @param g
 */
function playersLankDraw(g){
    //text
    g.font = INFO_FONT;
    g.fillStyle = "orange";
    g.fillRect(I_BORDER + I_PADING_X + 150,I_BORDER+ I_PADING_Y,100,22);   //選択中の背景表示
    g.fillRect(I_BORDER,I_BORDER+20,WiWidth - I_BORDER * 2,WiHeight - I_BORDER * 7);   //選択中の背景表示
    g.fillStyle = "black";
    g.fillText("プレイヤー情報",0,20);     //タイトル
    g.fillText("ランキング",150,20);      //タイトル

    //プレイヤーの情報
    var inte = 20;
    for (var i = 0; i < players; i++){
        rankDraw(g,i, inte, ranking[i], i+1);
        inte += 110;    //文字をずらすため
    }
}

/**
 * プレイヤーのランキングを描画
 * @param g         //コンテキスト
 * @param index     //タイル番号の取得
 * @param interval  //表示位置の変更
 * @param uName     //ユーザーの名前
 * @param ranking   //ランキング
 */
function rankDraw(g,index, interval, uName,ranking){
    //順位
    g.fillText(ranking + "位", 10, 43 + interval);
    //プレイヤーの画像
    playerImageDraw(g,index, interval,30,0);
    //プレイヤーの名前
    g.fillText(uName, 80, 43 + interval);
}

/**
 * プレイヤーの画像をタイルで指定し表示する
 * @param g         //コンテキスト
 * @param index     //タイル番号
 * @param interval  //次の表示位置変更
 * @param x         //表示xの変更
 * @param y         //表示yの変更
 */
function playerImageDraw(g,index,interval,x,y){
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
    g.drawImage(gPlayerImage, pix,piy,TILESIZE,TILESIZE,10 + x,20 + y + interval,32,32);
}

/**
 * キャンバスの設定
 */
function settingWi(){
    //プレイヤー画像
    gPlayerImage = new Image();gPlayerImage.src = "img/player.png";

    //idの取得
    const ca = document.getElementById("info"); //ID取得
    const g = ca.getContext("2d");

    ca.width = WiWidth;     //幅
    ca.height = WiHeight;   //高さ

    //背景
    g.fillStyle = "black";  //枠線の色
    g.fillRect(0,0,WiWidth,WiHeight);
    g.fillStyle = "white";  //背景の色
    g.fillRect(2,2,WiWidth - I_BORDER ,WiHeight - I_BORDER);
}