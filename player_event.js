/*
ここにはボタン処理を記述

date:2021.09.08
ver:a0_event
 */
//変数・定数
const EVENT_FONT = "10px monospace"; //フォント設定

const E_FLG      = true;

/**
 * ボタンを描画する
 * @param g getContext 描画するためのインスタンス(main)
 * @returns {number}
 */
function playerEventMain(g) {
    console.log("player_event playerEventMain(g)");

    g.font = EVENT_FONT;
    g.fillText("HELP:キーボード[H]", 2, 142);
}
/**
 *
 * @constructor
 */
function HelpKeyFun(){
    if(E_FLG){

    }else{

    }
}
/**
 * キーイベント
 */
window.onkeydown = function (e) {
    const KH     = 72;   //キーボード番号設定
    const KENTER = 13;   //キーボード番号設定
    let c = e.keyCode;//キーコード取得
    
    if (c == 37) { console.log("左") }       //左
    if (c == 38) { console.log("上") }       //上
    if (c == 39) { console.log("右") }       //右
    if (c == 40) { console.log("下") }       //下
    if (c == KH) {
        console.log("H");HelpKeyFun();}        //H
    if (c == KENTER) { console.log("ENTER") }//ENTER
    console.log("★押されたキーボード番号："+c)
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
}

/*遅刻、欠席での単位喪失マスのイベント(引数:プレイヤー名 , 遅刻or欠席)(data.jsのファンクションを呼出し)
***要調整***
*/
function failed(name, flag) {
    if (flag == "遅刻") lateday++;
    if (flag == "欠席") credit(name, -2);
    else if (lateday == 3) {
        credit(name, -2);
        lateday = 0;
    }
}

//バイト代取得マスのイベント
function salary(name) {
    partjob(name);
}

//バイト先が無くなるマスのイベント
function breakdown(name) {
    breaking(name);
}

//資格取得チャレンジ(確定)(引数:プレイヤー名)
function chanceAchieve(name) {
    getachieve(name);
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
    var apply_rank = apply_sort();
    //内定順位の配列
    var offer_rank = offer_sort();
    //単位順位の配列
    var credit_rank = credit_sort();
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
