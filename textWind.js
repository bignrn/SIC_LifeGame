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
 * テキストウィンドウの呼び出しfunction
 * @param g
 */
function textWindMain(g){
    //定数
    const BORDER    = 2;                //枠の幅

    //ウィンドウ
    g.fillStyle = "black";  //枠線の色
    g.fillRect(50,48,WTWIDHT,WTHEIGHT);
    g.fillStyle = "white";  //背景の色
    g.fillRect(51,49,WTWIDHT - BORDER ,WTHEIGHT - BORDER);

    //イベントタイトル
    g.fillStyle = "black";  //文字の色
    g.fillText("交際"+"イベント発生", 52,60);
    //対象プレイヤーの名前
    g.font = "8px monospace";
    g.fillText("名前："+"プレイヤー名前", 55,70);
    //イベント内容
    g.fillText("内容："+"彼女の誕生日！", 55,80);
    //イベント内容
    g.fillText("しかし、プレゼントを忘れてしまった。", 52,90);
}