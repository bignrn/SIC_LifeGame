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