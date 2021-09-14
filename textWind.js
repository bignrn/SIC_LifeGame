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
 * ヘルプ画面の呼び出し
 * @param g コンテキスト
 */
function helpWindMain(g){
    console.log("helpSettingWindMain(g)");
    SettingHelp_setting(g,"設定画面");

    g.fillText("・キーボード",40, 53);
    g.fillText("・情報の見方：",40, 63);
}

/**
 * ウィンドウの削除をする
 * @param g コンテキスト
 */
function delTextWind(g){
    console.log("delTextWind(g)");
    g.clearRect(50,48,WTWIDHT,WTHEIGHT);
}
/**
 * テキストウィンドウ用設定
 * @param g コンテキスト
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
/**
 * ヘルプ・設定ウィンドウ用設定
 * @param g         コンテキスト
 * @param bigTitle  テキストの見出し
 * @constructor
 */
function SettingHelp_setting(g,bigTitle){
    //定数
    const BORDER    = 2;    //枠の幅

    //ウィンドウ
    g.fillStyle = "black";  //枠線の色
    g.fillRect(35,33,WTWIDHT + 50,WTHEIGHT + 50);
    g.fillStyle = "white";  //背景の色
    g.fillRect(36,34,WTWIDHT + 50 - BORDER ,WTHEIGHT + 50 - BORDER);
    g.fillStyle = "black";  //枠線の色

    //タイトルテキスト
    g.fillText(bigTitle,37, 43);
}