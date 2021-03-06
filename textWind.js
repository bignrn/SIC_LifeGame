/*
ゲーム内で発生したイベントで、
メッセージ表示などを行う。

date:2021.09.14
Ver.a0_tWind
 */
//変数
const WTWIDHT   = 200;
const WTHEIGHT  = 80;
const t_max_page = 1;   //画面の数

var t_max_page_lenght;  //ページの数
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
 * スタート時に一回呼び出される
 * @param g
 */
function endWind(g){
    console.log("startWind(g)")
    SettingTextWind(g);

    //文字
    g.fillText("ゲーム終了!!", 80,45);
    g.fillText("ーもう一度(更新してね！)ー", 75,65);
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
    console.log("eventTextDraw(g,text)");
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
    console.log("helpWindMain(g)");
    t_max_page_lenght=0;    //ページの数

    SettingHelp_setting(g,"■ヘルプ画面");
    //g.fillText("・情報の見方：",40, 63);
    drawScreenTitle(g,0);

    g.fillText("・キーボード操作",40, 53);
    g.fillText("　〇サイコロを振る:スぺース、エンター",40, 63);
    g.fillText("　〇決定ボタン：スぺース、エンター",40, 73);
    g.fillText("　〇ページ操作：矢印キー(←↑→↓)",40, 83);
}

/**
 * ヘルプ画面の呼び出し
 * @param g コンテキスト
 */
function helpWindSecand(g){
    console.log("helpWindSecand(g)");
    t_max_page_lenght=3;    //ページの数

    //変数
    var eventTitle = [
        "・普通マス",
        "1.単位獲得マス",
        "2.欠席(or遅刻[回数制3回])で、",
        "  単位を落とすマス",
        "3.バイトでお金取得マス",
        "4.バイト先が倒産マス",
        "5.資格獲得で奨励金と資格が、",
        "  取れるマス。",
        "6.お金減るマス",
        "  (友達と遊ぶ、買い物をするなど)",
        "7.交際(初回)、または、",
        "  破局マス(回数制、好感度が一定値を",
        "         下回るとか)",
        "8.デートマス(お金の消費、",
        "  好感度の上げ下げ)",
        "============",
        "・特殊マス",
        "9.制作作品の進捗状況で",
        "  単位やお金がもらえるマス",
        "10.就職(内定)マス",
        "  [持ってる資格で就職出来る会社が変る]",
        "11.内定取り消しマス(レア)",
        "12.地球祭、球技大会(前期と後期)"];
    var interval = 6;
    var lineHeight = 1.1618 ;	// 行の高さ (フォントサイズに対する倍率)
    var fontSize = 10;
    var x = 40 ;
    var y = 53 ;

    SettingHelp_setting(g,"■情報の見方");
    drawScreenTitle(g,1);   //表示している画面番号

    // g.fillText("・普通マス",x, y);
    for (var i = interval * e_btn_help[1]; i< 6 + interval * e_btn_help[1];i++){
        if(i<eventTitle.length){
            g.fillText(" "+eventTitle[i],x, y);
            y+=fontSize;
        }
    }
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

/**
 * 現在表示されている選択画面のタイトル表示変更
 */
function drawScreenTitle(g,idx){
    var title = ["操作","マス"];
    var w = 25;
    var h = 12;
    var interval = 0;
    for (var i = 0;i < title.length;i++){
        if(i == idx){
            g.fillStyle = "black";  //枠線の色
            g.fillRect(35+interval,21,w,h);
            g.fillStyle = "white";  //背景の色
            g.fillRect(36+interval,22,w-2,h);   //選択されてればここが変わるはず
            g.fillStyle = "black";  //枠線の色
            g.fillText(title[i],37+interval, 31);
            interval += w + 2;
        }else{
            g.fillStyle = "black";  //枠線の色
            g.fillRect(35+interval,21,w,h);
            g.fillStyle = "white";  //背景の色
            g.fillRect(36+interval,22,w-2,h-1);   //選択されてればここが変わるはず
            g.fillStyle = "black";  //枠線の色
            g.fillText(title[i],37+interval, 31);
            interval += w + 2;
        }

    }
}

////////////////////////////////
//
//BUG注意
//ページを変えた状態で画面を移動するとページ番号が残る
//
///////////////////////////////
/**
 * ページ番号と矢印の表示処理
 * @param g
 * @param int
 */
function tDrawPageNum(g,int){
    if(t_max_page_lenght!=0){   //ページの移動がない時はページ番号だけ返す。
        if(int==0){
            g.fillText("↓",220,130);  //1ページ目
        }else if(int == t_max_page_lenght){
            g.fillText("↑",220,130);  //最後のページ
        }else if(int>0){
            g.fillText("↓",220,130);  //中間のページ
            g.fillText("↑",220,120);
        }
    }
    g.fillText((int+1)+"ページ",37,130);
}