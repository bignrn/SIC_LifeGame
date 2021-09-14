/*
ゲーム内で発生したイベントで、
メッセージ表示などを行う。

date:2021.09.14
Ver.a0_tWind
 */
//変数
const WTWIDHT   = 200;
const WTHEIGHT  = 80;

/**
 * スタート時に一回呼び出される
 * @param g
 */
function startWind(g){
    console.log("startWind(g)")
    SettingTextWind(g);

    //文字
    g.fillText("ゲームスタート画面", 80,45);
    g.fillText("ーボタンを押してねー", 75,65);
}
/**
 * テキストウィンドウの呼び出しfunction
 * @param g             コンテキスト
 * @param eventName     イベントの名前
 * @param uName         対象のプレイヤーの名前
 * @param contents      イベントの内容
 * @param pay           イベントで支払う金額
 */
function textWindMain(g, eventName, uName,contents,pay){
    console.log("textWindMain(g, eventName, uName,contents)")
    SettingTextWind(g);

    //イベントタイトル
    g.fillStyle = "black";  //文字の色
    g.fillText(eventName + "イベント", 52,60);
    //対象プレイヤーの名前
    g.fillText("名前："+uName, 55,70);
    //イベント内容
    var lineHeight = 1.1618 ;	// 行の高さ (フォントサイズに対する倍率)
    var fontSize = 10;
    var x = 55 ;
    var y = 70 ;
    for( var lines=contents.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
        var line = lines[i] ;       //フォントサイズ
        var addY = fontSize ;
        if ( i ) addY += fontSize * lineHeight * i ;

        g.fillText(line, x + 0, y + addY ) ;
    }
    //料金
    g.fillText("費用："+pay, 55,105);
}

/**
 * イベントを表示２
 * @param g
 */
function eventTextDraw(g,text){
    SettingTextWind(g);
    //イベント内容
    var lineHeight = 1.1618 ;	// 行の高さ (フォントサイズに対する倍率)
    var fontSize = 10;
    var x = 38 ;
    var y = 39 ;
    for( var lines=text.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
        var line = lines[i] ;       //フォントサイズ
        var addY = fontSize ;
        if ( i ) addY += fontSize * lineHeight * i ;
        g.fillText(line, x + 0, y + addY ) ;
    }
}
/**
 * ヘルプ画面の呼び出し
 * @param g コンテキスト
 */
function helpWindMain(g){
    console.log("helpSettingWindMain(g)");
    SettingHelp_setting(g,"ヘルプ画面");

    g.fillText("・キーボード操作",40, 53);
    g.fillText("　〇サイコロを振る:スぺース又はエンター",40, 63);
    g.fillText("　〇決定ボタン：スぺース又はエンター",40, 73);
    g.fillText("　〇ページをめくる：矢印キー(←↑→↓)",40, 83);
    // g.fillText("・情報の見方：",40, 63);
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
    const position = 35;
    g.fillStyle = "black";  //枠線の色
    g.fillRect(position,position-2,WTWIDHT,WTHEIGHT);
    g.fillStyle = "white";  //背景の色
    g.fillRect(position+1,position-1,WTWIDHT - BORDER ,WTHEIGHT - BORDER);
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
    var ADD = 20;
    g.fillStyle = "black";  //枠線の色
    g.fillRect(35,33,WTWIDHT + ADD-20,WTHEIGHT + ADD);
    g.fillStyle = "white";  //背景の色
    g.fillRect(36,34,WTWIDHT + ADD-20 - BORDER ,WTHEIGHT + ADD - BORDER);
    g.fillStyle = "black";  //枠線の色

    //タイトルテキスト
    g.fillText(bigTitle,37, 43);
}