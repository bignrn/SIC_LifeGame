/*
ここにはボタン処理を記述

date:2021.09.13
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
let e_swMemory  = e_sw_flg; //押されたか記憶する
let e_keyNum    = -1;       //押されたキーボード番号を取得
let e_gameWatch = true;     //スタート画面を消す
let e_btn_index = 0;        //ボタンの移動


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
        helpWindMain(g);//ヘルプ画面が表示される
    }
    //イベント発生時にボタンで消す処理
    if(e_event_flg){
        textWindMain(g,"交際","namae2","彼女と別れた。\n改行。改行",1000);
    }
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
 */
function gameWatch(){
    if (e_gameWatch){
        NonePlayers();
    }
}
/**
 * キーイベント
 */
window.onkeydown = function (e) {
    const KH     = 72;   //キーボード番号設定
    const KENTER = 13;   //キーボード番号設定
    let c = e.keyCode;//キーコード取得

    if (c == KLEFT && e_btn_index>0) {
        console.log("左");
        e_btn_index--;
    }                                       //左
    if (c == KUP) { console.log("上") }     //上
    if (c == KRIGHT && e_btn_index<1) {
        console.log("右");
        e_btn_index++;
    }                                       //右
    if (c == KDOWN) { console.log("下") }   //下
    //bugの阻止のため。ゲームが始まってから使える様に設定。かつ、イベント発生時も起動しない。
    if (!e_gameWatch && c == KH  && !e_event_flg) {
        console.log("H");
        HelpKeySwFun();
        e_keyNum=KH;
    }                                       //H
    if (c == KENTER) {
        console.log("ENTER");
        gameWatch();
        e_event_flg = false;    //イベント処理
        e_keyNum=KENTER;
    }                                       //ENTER
    if (c == KSPACE) {
        console.log("SPACE");
        gameWatch();
        e_keyNum=KSPACE;
    }                                       //SPACE

    console.log("★押されたキーボード番号："+c)
    console.log("btn："+e_btn_index)
}

/*
マップ画面におけるデートイベントや遅刻、内定などの様々な処理をこのjsファイルに記述すること

*/
//遅刻数を数え上げる配列
var lateday = {};
for (var i = 0; i < names.length; i++) {
    lateday.names[i] = 0;
}


var eventArray = {
    p1:{
        0:announce(),//中間発表イベント
        48:fes(p1),//地球祭イベント
        49:chanceAchieve(p1),//資格取得イベント
        50:getoffer(p1),//内定取得イベント
        51:lostoffer(p1),//内定喪失イベント
        52:sports(p1),//球技大会イベント
        53:makechance(p1),//交際破局イベント
        54:datetime(p1),//デートイベント
        55:salary(p1),//バイト代取得イベント
        56:breakdown(p1),//バイト先消滅イベント
        57:failed(p1,flag),//単位喪失イベント
        58:getcredit(p1),//単位取得イベント
        59:waste(p1),//お金浪費イベント
        63:waste(p1),//お金浪費イベント
    },
    
    p2:{ 
        0:announce(),//中間発表イベント
        48:fes(p2),//地球祭イベント
        49:chanceAchieve(p2),//資格取得イベント
        50:getoffer(p2),//内定取得イベント
        51:lostoffer(p2),//内定喪失イベント
        52:sports(p2),//球技大会イベント
        53:makechance(p2),//交際破局イベント
        54:datetime(p2),//デートイベント
        55:salary(p2),//バイト代取得イベント
        56:breakdown(p2),//バイト先消滅イベント
        57:failed(p2,flag),//単位喪失イベント
        58:getcredit(p2),//単位取得イベント
        59:waste(p2),//お金浪費イベント
        63:waste(p2),//お金浪費イベント
    },
    
    p3:{ 
        0:announce(),//中間発表イベント
        48:fes(p3),//地球祭イベント
        49:chanceAchieve(p3),//資格取得イベント
        50:getoffer(p3),//内定取得イベント
        51:lostoffer(p3),//内定喪失イベント
        52:sports(p3),//球技大会イベント
        53:makechance(p3),//交際破局イベント
        54:datetime(p3),//デートイベント
        55:salary(p3),//バイト代取得イベント
        56:breakdown(p3),//バイト先消滅イベント
        57:failed(p3,flag),//単位喪失イベント
        58:getcredit(p3),//単位取得イベント
        59:waste(p3),//お金浪費イベント
        63:waste(p3),//お金浪費イベント
    },
    
    p4:{ 
        0:announce(),//中間発表イベント
        48:fes(p4),//地球祭イベント
        49:chanceAchieve(p4),//資格取得イベント
        50:getoffer(p4),//内定取得イベント
        51:lostoffer(p4),//内定喪失イベント
        52:sports(p4),//球技大会イベント
        53:makechance(p4),//交際破局イベント
        54:datetime(p4),//デートイベント
        55:salary(p4),//バイト代取得イベント
        56:breakdown(p4),//バイト先消滅イベント
        57:failed(p4,flag),//単位喪失イベント
        58:getcredit(p4),//単位取得イベント
        59:waste(p4),//お金浪費イベント
        63:waste(p4),//お金浪費イベント
    },
};

/*

通常マスのイベント群

*/

//単位取得マスのイベント(引数:プレイヤー名)(data.jsのファンクションを呼出し)
function getcredit(name) {
    credite(name, 2);

    return "単位を2獲得した。";
}

/*遅刻、欠席での単位喪失マスのイベント(引数:プレイヤー名 , 遅刻or欠席)(data.jsのファンクションを呼出し)(戻り値：テキスト)
***要調整***
*/
function failed(name, flag) {
    var Text = "";
    if (flag == "遅刻") {
        lateday++;
        Text = "授業に遅刻をしてしまった。";
    }

    if (flag == "欠席") {
        credit(name, -2);

        Text = "授業を欠席してしまった。単位を2失った。"
    } else if (lateday == 3) {
        credit(name, -2);
        lateday = 0;

        Text += "遅刻が3回になったので単位を2失った。";
    }

    return Text;
}

//バイト代取得マスのイベント(引数：プレイヤー名)(戻り値：テキスト)
function salary(name) {
    var num = partjob(name);
    var Text = "今日はバイトの給料日。";

    Text += num + "円手に入れた。";

    return Text;
}

//バイト先が無くなるマスのイベント(戻り値：テキスト)
function breakdown(name) {
    breaking(name);

    return "バイト先が無くなってしまった。";
}

//資格取得チャレンジ(確定)(引数:プレイヤー名)(戻り値：テキスト)
function chanceAchieve(name) {
    return getachieve(name);
}

//交際、破局マスのイベント(引数:プレイヤー名)
function makechance(name) {
    chance(name);
}

//デートマスのイベント(引数:プレイヤー名  戻り値：イベントテキスト)
function datetime(name) {
    const CHOISE = Math.random(7);
    //イベントテキスト
    const EVENT = ["が、しかし、お互いに予定が合わず見送りになった。",
        "高級レストランに招待。",
        "ペアルックの為に服を買った。",
        "彼女の誕生日！プレゼントを購入。",
        "レストランに行くことになった。",
        "元恋人と出会ってしまった。気まずい。",
        "今日は誕生日だった！プレゼントを忘れてしまった。"];
    //消費
    const WASTE = [0, 15000, 3400, 5500, 1500, 0, 0];
    //好感度変化
    const FRIENDLY = [0, 4, 2, 2, -2, -1, -5];
    date(WASTE[CHOISE], name, FRIENDLY[CHOISE]);

    var Text = EVENT[CHOISE] + ':<br>' + WASTE[CHOISE] + "円の消費、好感度：" + FRIENDLY[CHOISE];
    return Text;
}

/*

特殊マスのイベント群

*/

//制作作品の進捗状況変化マスのイベント(見送り)
function making(name) {

}

//就職（内定）マスのイベント(引数:プレイヤー名)
function getoffer(name) {
    //70%で内定取得するための乱数
    var n = Math.random(10);

    offered(name, n);

}

//内定取り消しマスのイベント(引数:プレイヤー名)
function lostoffer(name) {
    var ran = Math.ramdom(6);
    var text = "就職前にやらかしてしまった。";
    const EVENT = ["何も言う言葉が思い浮かばない。：内定取り消し", "しかし、どうやら今回のことはなしになった。：回避"];
    missoffer(name, ran);

    if (ran < 4) {
        text += EVENT[0];
    } else {
        text += EVENT[1];
    }
}

//地球祭マスのイベント(引数:プレイヤー名)
function fes(name) {
    var ran = Math.random(2);
    var text = "お祭りだ！";
    const EVENT = ["友達とお祭りを回り、楽しむことができた。：1000円の消費", "ビンゴ大会に参加。見事にビンゴ！：1000円獲得",
        "恋人と仲良く展示品などを見て回った。'<br>'：1000円の消費、好感度：1", "ビンゴ大会で見事にビンゴ！景品を恋人にプレゼントした。'<br>'：1000円の消費、好感度：3"];
    var check = festa(name, ran);

    if (check == 0) {
        text += EVENT[ran];
    } else {
        text += EVENT[ran + 2];
    }

    return text;
}

//球技大会マスのイベント
function sports(name) {
    var ran = Math.random(2);
    const EVENT = ["しかし、試合中にケガをしてしまった。", "みんなと協力したおかげで優勝！！運動不足も解消！",
        "しかし、恋人に情けないところを見せてしまった……", "恋人にいいところを見せることに成功！"];
    const RESULT = ["：1000円の消費", "：単位2獲得", "：1000円の消費、好感度：-1", "：単位2獲得、好感度：1"];
    var check = sports(name, ran);
    var text = "球技大会！";

    if (check == 0) {
        text += "みんなと協力して勝つぞ！" + EVENT[ran] + "<br>" + RESULT[ran];
    } else {
        text += "恋人にいい所を見せるチャンス！" + EVENT[ran + 2] + "<br>" + RESULT[ran + 2];
    }

    return text;

}

//中間発表用のメソッド
function announce() {
    //所持金順位の配列
    // var apply_rank = apply_sort();
    //内定順位の配列
    // var offer_rank = offer_sort();
    //単位順位の配列
    // var credit_rank = credit_sort();
}


//お金浪費マスのイベント
function waste(name){
    //どのイベントが起きるかを決める乱数の生成
    var ran = Math.random(18);
    //イベントの浪費金額
    var wasteMoney = [
        -700 , -5000 , -8000 , -300 , -1000 , -2600 , -1500 , -4000 , -7000 ,
        -1500 , -5000 , -10000 , -500 , -1500 , -2500 , -100 , -200 , -500
    ];
    //イベントの内容
    var EVENT = [
        "友達と食事に行くことになった。：","今日は友達の誕生日、いつもお礼を込めてプレゼントを購入。：","友達と洋服を買いに行くことになった。：",
        "学校帰りに本屋に立ち寄った所、好きな漫画の最新刊を発見。：","学校帰りに本屋に立ち寄った所、好きな作家の新作小説を発見。：","学校帰りに本屋に立ち寄った所、欲しい参考書を発見。：",
        "一人でカラオケに行った。日頃の鬱憤を払うことができた。：","一人で家電量販店に行った。欲しかったデジタル雑貨を衝動買い。：","一人でキャンプに行った。のんびりとしたひとときを過ごした。：",
        "スマホゲームに課金した。すぐに目当てのものが出たので少なくて済んだ。：","スマホゲームに課金した。目当てのものが出ずに、設定額に届いてあきらめた……。：","スマホゲームに課金した。目当てのものが出るまで課金したので、高くついた……。：",
        "友人と遊ぶために新作ゲームを出し合って購入。：","友人と遊ぶために新作ゲームを購入。：","友人と遊ぶために新作ゲームの機材を購入。：",
        "ジュースを買おうと自販機の前へ。お気に入りのジュースを購入。：","ジュースを買おうと自販機の前へ。初めて見るジュースに惹かれて購入。：","ジュースを買おうと自販機の前へ。しかし、不運な事に自販機の下にお金を落としてしまった。："
    ];
    //イベントの影響の反映用ファンクション(引数：消費金額 , プレイヤー名)
    addmoney(wasteMoney[ran], name);
    //ファンクションが返すテキストの生成
    var Text = EVENT[ran] + wasteMoney[ran] + "円の消費。";
    //親に借金をするかどうかの判定
    if(playersBox[playernumber]["apply"] < 0){
        Text += "<br>所持金がなくなってしまった！仕方なく親にお金を借りた事になった。";
    }
    //現在の所持金を明示するための追加
    Text += "<br>所持金：" + playersBox[playernumber]["apply"] + "円";

    return Text;
    
/*年1回のイベント(未実装)
　＞今日は私の誕生日、自分あてに腕時計を購入。：20,000円の消費
　＞今日は「母の日」、日ごろの感謝を込めてプレゼントを購入。10,000円の消費
　＞今日は「父の日」、日ごろの感謝を込めてプレゼントを購入。10,000円の消費
*/
}
