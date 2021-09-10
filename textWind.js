/*
ゲーム内で発生したイベントで、
メッセージ表示などを行う。

date:2021.09.09
Ver.a0_tWind
 */
//変数
const WTWIDHT   = 150;
const WTHEIGHT  = 50;

/**
 * スタート時に一回呼び出される
 * @param g
 */
function startWind(g){
    console.log("startWind(g)")
    SettingTextWind(g);

    //文字
    g.fillText("ゲームスタート画面", 80,65);
    g.fillText("ーボタンを押してねー", 75,85);
}
/**
 * テキストウィンドウの呼び出しfunction
 * @param g             コンテキスト
 * @param eventName     イベントの名前
 * @param uName         対象のプレイヤーの名前
 * @param contents      イベントの内容
 */
function textWindMain(g, eventName, uName,contents){
    console.log("textWindMain(g, eventName, uName,contents)")
    SettingTextWind(g);

    //イベントタイトル
    g.fillStyle = "black";  //文字の色
    g.fillText("イベント発生" + eventName, 52,60);
    //対象プレイヤーの名前
    g.font = "8px monospace";
    g.fillText("名前："+uName, 55,70);
    //イベント内容
    g.fillText("内容："+contents, 55,80);
}

/**
 * ウィンドウの削除をする
 * @param g
 */
function delTextWind(g){
    console.log("delTextWind(g)");
    g.clearRect(50,48,WTWIDHT,WTHEIGHT);
}
/**
 * 設定
 * @param g
 * @constructor
 */
function SettingTextWind(g){
    //定数
    const BORDER    = 2;                //枠の幅

    //ウィンドウ
    g.fillStyle = "black";  //枠線の色
    g.fillRect(50,48,WTWIDHT,WTHEIGHT);
    g.fillStyle = "white";  //背景の色
    g.fillRect(51,49,WTWIDHT - BORDER ,WTHEIGHT - BORDER);
    g.fillStyle = "black";  //枠線の色
}