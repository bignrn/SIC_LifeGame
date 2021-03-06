/*
ここにはボタン処理を記述

date:2021.09.14
ver:a0_event
 */
//変数・定数
const EVENT_FONT= "10px monospace"; //フォント設定
const KENTER = 13;   //キーボード番号設定
const KH     = 72;   //キーボード番号設定
const KSPACE = 32;   //キーボード番号設定
const KLEFT  = 37;   //キーボード番号設定
const KUP    = 38;   //キーボード番号設定
const KRIGHT = 39;   //キーボード番号設定
const KDOWN  = 40;   //キーボード番号設定

let e_sw_flg    = false;    //ON/OFFを切り替える
let e_event_flg = false;    //イベントが呼ばれたかを確認
let e_keyNum    = -1;       //押されたキーボード番号を取得
let e_gameWatch = true;     //スタート画面を消す
let e_btn_index = 0;        //ボタンの移動
var e_btn_help  = [0,0];//ヘルプ画面のボタン移動記録(左右、上下)
var e_pNum; 　　　　　　　　　　//プレイヤーナンバー
var e_eNum; 　　　　　　　　　　//イベント番号
var etext;

/**
 * ボタンを描画する
 * @param g getContext 描画するためのインスタンス(main)
 * @returns {number}
 */
function playerEventMain(g) {
    g.font = EVENT_FONT;
    g.fillText("HELP:キーボード[H]", 2, 142);

    /////////////////
    //
    //ボタンイベント処理記述
    //後々、別のfunctionに移動する予定
    //
    ////////////////
    //スタート画面を消す
    if (e_gameWatch){
        startWind(g);
        return;         //強制的にbreakさせている。
    }
    //ヘルプボタンが押された時に
    if (e_sw_flg){
        helpWinds(g);    //ヘルプ画面とその他の画面表示
    }
    //イベント発生時にボタンで消す処理
    if(e_event_flg){
     eventTextDraw(g,etext);
    }
    //クリア画面。ブラウザの更新しない限り消えない
    if(g_end_flag){
        endWind(g);
    }
}

/**
 * ヘルプ画面のキーボード操作
 * @param g
 */
function helpWinds(g){
    if(e_btn_help[0]==0){
        helpWindMain(g);    //キーボード操作のヘルプ画面が表示される
    }else if(e_btn_help[0]==1){
        helpWindSecand(g);  //イベント種類の情報ヘルプ画面が表示される
    }
    tDrawPageNum(g,e_btn_help[1]);
}

/**
 * イベントウィンドウを表示する為のfunction
 * @param pNum プレイヤーナンバー
 * @param eNum　イベント番号
 */
function getPlayerNum(pNum,eNum){
    console.log("getPlayerNum("+pNum+","+eNum+")");
    e_event_flg = true; //イベント画面のフラグ
    e_eNum = eNum;      //イベント番号をグローバル変数に格納
    e_pNum = pNum;      //プレイヤー番号をグローバル変数に格納
}
/**
 * ヘルプボタン処理
 * 押されていたら      :flase
 * 押されていないなら   :true
 * @constructor
 */
function HelpKeySwFun(){
    if(e_sw_flg){
        e_sw_flg = false;
    }else{
        e_sw_flg = true;
    }
}

/**
 * ゲームがスタートしたか判定する
 * ゲームが始まっていたらサイコロを振る。
 */
function gameWatch(){
    if (e_gameWatch){
        NonePlayers();
    }else if(!e_event_flg && !e_sw_flg){
        GetMove();
    }else{
        e_event_flg = false;
    }
}

/**
 * キーイベント
 */
window.onkeydown = function (e) {
    const KH     = 72;   //キーボード番号設定
    const KENTER = 13;   //キーボード番号設定
    let c = e.keyCode;//キーコード取得

    if (c == KLEFT) {
        console.log("左");
        if(e_btn_index>0&&!e_sw_flg){
            e_btn_index--;  //プレイヤー情報画面
        }
        if(e_btn_help[0]>0&&e_sw_flg){
            e_btn_help[0]--;//ヘルプ画面
        }
    }                                       //左
    if (c == KUP) {
        console.log("上");
        if(e_btn_help[1]>0){
            e_btn_help[1]--;//ヘルプ画面
        }
    }                                       //上
    if (c == KRIGHT) {
        console.log("右");
        if(e_btn_index<1&&!e_sw_flg){
            e_btn_index++;  //プレイヤー情報画面の変数
        }
        if(e_btn_help[0]<t_max_page&&e_sw_flg){
            e_btn_help[0]++;//ヘルプ画面
        }
    }                                       //右
    if (c == KDOWN) {
        console.log("下");
        if(e_btn_help[1]<t_max_page_lenght){
            e_btn_help[1]++;    //ヘルプ画面
        }
    }                                       //下
    //bugの阻止のため。ゲームが始まってから使える様に設定。かつ、イベント発生時も起動しない。
    if (!e_gameWatch && c == KH && !e_event_flg) {
        console.log("H");
        HelpKeySwFun();
        e_keyNum=KH;
    }                                       //H
    if (c == KENTER) {
        console.log("ENTER");
        gameWatch();            //スタート画面の処理とサイコロ
        e_keyNum=KENTER;
    }                                       //ENTER
    if (c == KSPACE) {
        console.log("SPACE");
        gameWatch();            //スタート画面の処理とサイコロ
        e_keyNum=KSPACE;
    }                                       //SPACE
}

/*
マップ画面におけるデートイベントや遅刻、内定などの様々な処理をこのjsファイルに記述すること

*/
//遅刻数を数え上げる配列
var lateday = {};
for (var i = 0; i < names.length; i++) {
    lateday.names[i] = 0;
}
//ex. eventArray[p1][48]

//仮のプレイヤー番号の設定
var p1 = 0;
var p2 = 1;
var p3 = 2;
var p4 = 3;


//変更点

/*
var eventArray = {
    0:{
        0:announce(),//中間発表イベント
        37:firstgoal(p1),//ゴール（仮配置)
        48:fes(p1),//地球祭イベント
        49:chanceAchieve(p1),//資格取得イベント
        50:getoffer(p1),//内定取得イベント
        51:lostoffer(p1),//内定喪失イベント
        52:sports(p1),//球技大会イベント
        53:makechance(p1),//交際破局イベント
        54:datetime(p1),//デートイベント
        55:salary(p1),//バイト代取得イベント
        56:breakdown(p1),//バイト先消滅イベント
        57:failed(p1),//単位喪失イベント
        58:getcredit(p1),//単位取得イベント
        59:waste(p1),//お金浪費イベント
        63:waste(p1),//お金浪費イベント
    },
    
    1:{ 
        0:announce(),//中間発表イベント
        38:firstgoal(p2),//ゴール（仮配置),
        48:fes(p2),//地球祭イベント
        49:chanceAchieve(p2),//資格取得イベント
        50:getoffer(p2),//内定取得イベント
        51:lostoffer(p2),//内定喪失イベント
        52:sports(p2),//球技大会イベント
        53:makechance(p2),//交際破局イベント
        54:datetime(p2),//デートイベント
        55:salary(p2),//バイト代取得イベント
        56:breakdown(p2),//バイト先消滅イベント
        57:failed(p2),//単位喪失イベント
        58:getcredit(p2),//単位取得イベント
        59:waste(p2),//お金浪費イベント
        63:waste(p2),//お金浪費イベント
    },

//     2:{
//         0:announce(),//中間発表イベント
//         41:firstgoal(p3),//ゴール（仮配置),
//         48:fes(p3),//地球祭イベント
//         49:chanceAchieve(p3),//資格取得イベント
//         50:getoffer(p3),//内定取得イベント
//         51:lostoffer(p3),//内定喪失イベント
//         52:sports(p3),//球技大会イベント
//         53:makechance(p3),//交際破局イベント
//         54:datetime(p3),//デートイベント
//         55:salary(p3),//バイト代取得イベント
//         56:breakdown(p3),//バイト先消滅イベント
//         57:failed(p3),//単位喪失イベント
//         58:getcredit(p3),//単位取得イベント
//         59:waste(p3),//お金浪費イベント
//         63:waste(p3),//お金浪費イベント
//     },
    
    3:{ 
        0:announce(),//中間発表イベント
        42:firstgoal(p4),//ゴール（仮配置),
        48:fes(p4),//地球祭イベント
        49:chanceAchieve(p4),//資格取得イベント
        50:getoffer(p4),//内定取得イベント
        51:lostoffer(p4),//内定喪失イベント
        52:sports(p4),//球技大会イベント
        53:makechance(p4),//交際破局イベント
        54:datetime(p4),//デートイベント
        55:salary(p4),//バイト代取得イベント
        56:breakdown(p4),//バイト先消滅イベント
        57:failed(p4),//単位喪失イベント
        58:getcredit(p4),//単位取得イベント
        59:waste(p4),//お金浪費イベント
        63:waste(p4),//お金浪費イベント
    },
};
*/


function eventSwitch(name , eventValue){

    var Text;
    switch(eventValue){
        case 0  : 
        Text = ananounce();
        break;

        case 37 : 
        Text = firstgoal(name);//ゴール（仮配置),
        break;
        
        case 38 : 
        Text = firstgoal(name);//ゴール（仮配置),
        break;
        
        case 41 : 
        Text = firstgoal(name);//ゴール（仮配置),
        break;

        case 42 : 
        Text = firstgoal(name);//ゴール（仮配置),
        break;

        case 48 : 
        Text = fes(name);//地球祭イベント
        break;

        case 49 : 
        Text = chanceAchieve(name);//資格取得イベント
        break;

        case 50 : 
        Text = getoffer(name);//内定取得イベント
        break;

        case 51 : 
        Text = lostoffer(name);//内定喪失イベント
        break;

        case 52 : 
        Text = sports(name);//球技大会イベント
        break;

        case 53 : 
        Text = makechance(name);//交際破局イベント
        break;

        case 54 : 
        Text = datetime(name);//デートイベント
        break;

        case 55 : 
        Text = salary(name);//バイト代取得イベント
        break;

        case 56 : 
        Text = breakdown(name);//バイト先消滅イベント
        break;

        case 57 : 
        Text = failed(name);//単位喪失イベント
        break;

        case 58 : 
        Text = getcredit(name);//単位取得イベント
        break;

        case 59 : 
        Text = waste(name);//お金浪費イベント
        break;

        case 63 : 
        Text = waste(name);//お金浪費イベント
        break;
    }
    return Text;
}

//ここまで変更点

/*

通常マスのイベント群

*/

//単位取得マスのイベント(引数:プレイヤー名)(data.jsのファンクションを呼出し)
function getcredit(name) {
    credite(name, 2);

    return "単位を2獲得した。";
}

/*遅刻、欠席での単位喪失マスのイベント(引数:プレイヤー名)(data.jsのファンクションを呼出し)(戻り値：テキスト)
***要調整***
*/
function failed(name) {
    var flag = "";
    if(Math.floor(Math.random() * 10) < 3) flag = "欠席";
    else flag = "遅刻";
    var Text = "";
    if (flag == "遅刻") {
        playersBox[name]["lateday"]++;
        Text = "授業に遅刻をしてしまった。";
    }

    if (flag == "欠席") {
        if(playersBox[name]["credit"] >= 2){
            credite(name, -2);
        }

        Text = "授業を欠席してしまった。\n単位を2失った。"
    } else if (playersBox[name]["lateday"] == 3) {
        if(playersBox[name]["credit"] >= 2){
            credite(name, -2);
        }
        playersBox[name]["lateday"] = 0;

        Text += "\n遅刻が3回になった\n単位を2失った。";
    }

    return Text;
}

//バイト代取得マスのイベント(引数：プレイヤー名)(戻り値：テキスト)
function salary(name) {
    var Text
    if(playersBox[name]["job"] != "なし"){
        var num = partjob(name);
        Text = "今日はバイトの給料日。\n";

        Text += num + "円手に入れた。";
    }else{
        jobget(name);
        Text = "仕事が" + playersBox[name]["job"] + "になった。";

    }

    return Text;
}

//バイト先が無くなるマスのイベント(戻り値：テキスト)
function breakdown(name) {
    if(playersBox[name]["job"] != "なし"){
        return breaking(name);
    }else{
        return "最近近くの会社が廃業したらしい。";
    }
}

//資格取得チャレンジ(確定)(引数:プレイヤー名)(戻り値：テキスト)
function chanceAchieve(name) {
    return getachieve(name);
}

//交際、破局マスのイベント(引数:プレイヤー名)
function makechance(name) {
    return chance(name);
    
}

//デートマスのイベント(引数:プレイヤー名  戻り値：イベントテキスト)
function datetime(name) {
    var Text = "今日は何もない一日だった。";
    if(playersBox[name]["girlfriend"] == "あり"){
        const CHOISE = Math.floor(Math.random() * 7);
        //イベントテキスト
        
        const EVENT = ["が、しかし、\nお互いに予定が合わず見送りになった。",
            "高級レストランに招待。\n",
            "ペアルックの為に服を買った。\n",
            "彼女の誕生日！プレゼントを購入。\n",
            "レストランに行くことになった。\n",
            "元恋人と出会ってしまった。気まずい。\n",
            "今日は誕生日だった！\nプレゼントを忘れてしまった。\n"];
        //消費
        const WASTE = [0, 15000, 3400, 5500, 1500, 0, 0];
        //好感度変化
        const FRIENDLY = [0, 4, 2, 2, -2, -1, -5];
        date(WASTE[CHOISE], name, FRIENDLY[CHOISE]);

        Text += EVENT[CHOISE] + WASTE[CHOISE] + "円の消費、好感度：" + FRIENDLY[CHOISE];
    }
    return Text;
}

/*

特殊マスのイベント群

*/

//制作作品の進捗状況変化マスのイベント(見送り)
function making(name) {

}

//就職（内定）マスのイベント(引数:プレイヤー名)(戻り値：イベントテキスト)
function getoffer(name) {
    //70%で内定取得するための乱数
    var n = Math.floor(Math.random() * 10);

    var posittion = offered(name, n , playersBox[name]["achievement"]);

    if(posittion != "未定"){
        return "内定を獲得した。\n内定：" + posittion;
    }else{
        return "お祈りメールをもらった。\n内定：なし"; 
    }
}

//内定取り消しマスのイベント(引数:プレイヤー名)(戻り値：イベントテキスト)
function lostoffer(name) {
    var ran = Math.floor(Math.random() * 6);
    var text = "就職前にやらかしてしまった。\n";
    const EVENT = ["何も言う言葉が思い浮かばない。\n内定取り消し", "しかし、今回のことはなしになった。\n回避"];
    missoffer(name, ran);

    if (ran < 4) {
        text += EVENT[0];
    } else {
        text += EVENT[1];
    }
    return text;
}

//地球祭マスのイベント(引数:プレイヤー名)(戻り値：イベントテキスト)
function fes(name) {
    var ran = Math.floor(Math.random() * 2);
    var text = "お祭りだ！\n";
    const EVENT = ["友達とお祭りを回り、楽しむことができた。\n1000円の消費", "ビンゴ大会に参加。見事にビンゴ！\n1000円獲得",
        "恋人と仲良く展示品などを見て回った。\n1000円の消費、好感度：1", "ビンゴ大会で見事にビンゴ！\n景品を恋人にプレゼントした。\n1000円の消費、好感度：3"];
    var check = festa(name, ran);

    if (check == 0) {
        text += EVENT[ran];
    } else {
        text += EVENT[ran + 2];
    }

    return text;
}

//球技大会マスのイベント(引数：プレイヤー名)(戻り値：イベントテキスト)
function sports(name) {
    var ran = Math.floor(Math.random() * 2);
    const EVENT = ["しかし、試合中にケガをしてしまった。\n", "みんなと協力したおかげで優勝！！\n運動不足も解消！\n",
        "しかし、恋人に情けないところを\n見せてしまった……\n", "恋人にいいところを\n見せることに成功！\n"];
    const RESULT = ["1000円の消費", "単位2獲得", "1000円の消費、好感度：-1", "単位2獲得、好感度：1"];
    var check = sport(name, ran);
    var text = "球技大会！\n";

    if (check == 0) {
        text += "みんなと協力して勝つぞ！\n" + EVENT[ran] + RESULT[ran];
    } else {
        text += "恋人にいい所を見せるチャンス！\n" + EVENT[ran + 2] + RESULT[ran + 2];
    }

    return text;

}

//中間発表用のメソッド
function announce() {
    //所持金順位の配列
     var apply_rank = apply_sort();
    //内定順位の配列
    // var offer_rank = offer_sort();
    //単位順位の配列
    // var credit_rank = credit_sort();

    return apply_rank;
}

//お金浪費マスのイベント(引数：プレイヤー名)(戻り値：イベントテキスト)
function waste(name){
    //どのイベントが起きるかを決める乱数の生成
    var ran = Math.floor(Math.random() * 18);
    //イベントの浪費金額
    var wasteMoney = [
        -700 , -5000 , -8000 , -300 , -1000 , -2600 , -1500 , -4000 , -7000 ,
        -1500 , -5000 , -10000 , -500 , -1500 , -2500 , -100 , -200 , -500
    ];
    //イベントの内容
    var EVENT = [
        "友達と食事に行くことになった。\n","今日は友達の誕生日、\nいつもお礼を込めてプレゼントを購入。\n","友達と洋服を買いに行くことになった。\n",
        "学校帰りに本屋に立ち寄った所、\n好きな漫画の最新刊を発見。\n","学校帰りに本屋に立ち寄った所、\n好きな作家の新作小説を発見。\n","学校帰りに本屋に立ち寄った所、\n欲しい参考書を発見。\n",
        "一人でカラオケに行った。\n日頃の鬱憤を払うことができた。\n","一人で家電量販店に行った。\n欲しかったデジタル雑貨を衝動買い。\n","一人でキャンプに行った。\nのんびりとしたひとときを過ごした。\n",
        "スマホゲームに課金した。\nすぐに目当てのものが出た！\n","スマホゲームに課金した。\n目当てのものが出ずに、\n設定額に届いてあきらめた……。\n","スマホゲームに課金した。\n目当てが出るまで課金してしまった……。\n",
        "友人と遊ぶために、\n新作ゲームを出し合って購入。\n","友人と遊ぶために、\n新作ゲームを購入。\n","友人と遊ぶために、新作ゲームの機材を購入。\n",
        "ジュースを買おうと自販機の前へ。\nお気に入りのジュースを購入。\n","ジュースを買おうと自販機の前へ。\n初めて見るジュースに惹かれて購入。\n","ジュースを買おうと自販機の前へ。\nしかし、不運な事に自販機の下に\nお金を落としてしまった。\n"
    ];

    //イベントの影響の反映用ファンクション(引数：消費金額 , プレイヤー名)
    addmoney(wasteMoney[ran], name);
    //ファンクションが返すテキストの生成
    var Text = EVENT[ran] + Math.abs(wasteMoney[ran]) + "円の消費。";
    //親に借金をするかどうかの判定
    if(playersBox[name]["apply"] < 0){
        Text += "\n所持金がなくなってしまった！\n仕方なく親にお金を借りた事になった。";
    }
    //現在の所持金を明示するための追加
    //Text += "\n所持金：" + playersBox[name]["apply"] + "円";
    Text += "\n所持金：" + playersBox[name]["apply"] + "円";

    return Text;
    
/*年1回のイベント(未実装)
　＞今日は私の誕生日、自分あてに腕時計を購入。：20,000円の消費
　＞今日は「母の日」、日ごろの感謝を込めてプレゼントを購入。10,000円の消費
　＞今日は「父の日」、日ごろの感謝を込めてプレゼントを購入。10,000円の消費
*/
}

//一周してゴールに入った際のイベント
function firstgoal(name){
    goal(name);
    var text = "ゴール！\n" + playersBox[name]["name"] + "がゴールしました！"
    return text;
}