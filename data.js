//プレイヤー情報を格納するための配列(連想配列じゃなくても可)
//プレイヤー名
var names = { 0: "Name1", 1: "Name2", 2: "Name3", 3: "Name4" };
//所持金
var applys = new Object();
//所持単位数
var credit = {};
//所持資格
var achievement = { 0: "なし", 1: "応情", 2: "基情", 3: "なし" };
//内定
var offer = { 0: "小企業", 1: "大企業", 2: "中企業", 3: "小企業" };
//恋人の有無
var girlfriend = {};
//恋人との好感度
var friendly = {};
//バイトの有無
var job = {};

//順位表示用のデータを入れ替える連想配列(連想配列じゃなくても可)
var ranking = ["Name1", "Name2", "Name3", "Name4"];
//内定先の順位で優劣を決める場合に用いる連想配列
var offer_rank = { "未定": 0, "小企業": 1, "中企業": 2, "大企業": 3 };
//バイト先の職種の連想配列
var jobkind = { "飲食": 800, "デスクワーク": 900, "配達": 900, "工場": 850, "コンビニ": 750 };
//資格ランクの連想配列
var achieverank = { "なし": 0, "基情": 1, "応情": 2, "高度": 3 };
//プレイヤーごとの所持データの格納先
var playersBox = new Object();

//プレイヤー番号（仮置き)
var playernumber = 0;

//プレイヤー名をキーとした連想配列の設定(ファンクションにしなくても可)
function defaultset() {
    for (var i = 0; i < 4; i++) {

        playersBox[i] = { "name": "" };
        playersBox[i] = { "apply": 0 };
        playersBox[i] = { "achievement": "なし" };
        playersBox[i] = { "offer": "なし" };
        playersBox[i] = { "girlfriend": "なし" };
        playersBox[i] = { "friendly": 0 };
        playersBox[i] = { "credit": 0 };
        playersBox[i] = { "job": "なし" };

        // applys.names = 0;
        // achievement.names[i] = "なし";
        // offer.names[i] = "未定";
        // girlfriend.names[i] = "なし";
        // friendly.names[i] = 0;
        // credit.names[i] = 0;
        // job.names[i] = "なし";
    }
}
/*未実装
//プレイヤー名を設定するメソッド(引数:name  プレイヤー名)
function nameset(name) {
    names.push(name);
}
*/

/*未実装
//所持金別の順位ソート(戻り値：所持金別順位の配列)
function apply_sort() {
    for (var i = 0; i < applys.length; i++) {
        for (var j = i; j < applys / length; j++) {
            if (applys[i] < applys[j]) {
                var tmp = ranking[i];
                ranking[i] = ranking[j];
                ranking[j] = tmp;
            }
        }
    }

    return ranking;
}

//内定先の順位ソート(戻り値：内定先順位の配列)
function offer_sort() {
    for (var i = 0; i < 4; i++) {
        for (var j = i; j < applys.length; j++) {
            if (offer_rank[offer[i]] < offer_rank[offer[j]]) {
                var tmp = ranking[i];
                ranking[i] = ranking[j];
                ranking[j] = tmp;
            }
        }
    }

    return ranking;
}

//単位数別の順位ソート(戻り値：単位数順位の配列)
function credit_sort() {
    for (var i = 0; i < applys.length; i++) {
        for (var j = 0; j < applys.length; j++) {
            if (credit[i] < credit[j]) {
                var tmp = ranking[i];
                ranking[i] = ranking[j];
                ranking[j] = tmp;
            }
        }
    }

    return ranking;
}

*/
//所持金変化用のメソッド(引数:変化する金額 , プレイヤー名)
function addmoney(money, name) {
    playersBox[playernumber]["apply"] += money;
}

//好感度変化用のメソッド(引数:プレイヤー名 , 好感度変化)  ***要調整***
function addfriendly(name, add) {
    playersBox[playernumber]["friendly"] += add;
}

//バイト先が倒産した場合のメソッド(引数:プレイヤー名)
function breaking(name) {
    playersBox[playernumber]["job"] = "なし";
}

//バイト代取得用メソッド(引数:プレイヤー名)   ***要調整***
function partjob(name) {
    playersBox[playernumber]["apply"] += jobkind[playersBox[playernumber]["job"]] * 3 * 12
}

//交際or破局のメソッド(引数:プレイヤー名)
function chance(name) {
    if (playersBox[playernumber]["girlfriend"] == "なし") {
        playersBox[playernumber]["girlfriend"] = "あり";
    } else if (playersBox[playernumber]["friendly"] <= 2) {
        playersBox[playernumber]["girlfriend"] = "なし";
        playersBox[playernumber]["friendly"] = 0;
    }
}

//デート用のメソッド(引数:変化する金額 ,プレイヤー名 , 好感度変化)    ***要調整***
function date(money, name, add) {
    addmoney(money, name);
    addfriendly(name, add);
}

//単位獲得イベント用のメソッド(引数:プレイヤー名 , 単位数)
function credite(name, unit) {
    playersBox[playernumber]["credit"] += unit;
}

//資格取得イベント用のメソッド(引数:プレイヤー名)   ***要調整***
function getachieve(name) {
    var Text = "今日は資格取得の日。";
    //受験料
    const COST = 7500;
    //資格のボーダーライン(基本情報:FE , 応用情報:AP)
    const FE = 10;
    const AP = 14;
    //合格報酬(一回のみ)
    const FEGET = 20000;
    const APGET = 40000;

    if (playersBox[playernumber]["achievement"] == "応情") {
        //資格が既に応情だった場合
        Text += "周りの学生たちも頑張って資格勉強に勤しんでいる。";

    } else if (playersBox[playernumber]["credit"] >= AP && playersBox[playernumber]["apply"] >= COST) {
        //応情の合格条件を満たしている場合
        playersBox[playernumber]["achievement"] = "応情";
        playersBox[playernumber]["apply"] += APGET - COST;
        Text += "応用情報技術者試験に見事合格した！奨励金として" + (APGET - COST) + "円手に入れた。資格が『 応情 』になった。";

    } else if (playersBox[playernumber]["achievement"] == "基情") {
        //資格が基情であり、応情の合格条件を満たしていない場合
        playersBox[playernumber]["apply"] -= COST;
        Text += "応用情報技術者試験を受けたが、実力が足らず不合格だった。" + COST + "円失った。";

    } else if (playersBox[playernumber]["credit"] >= FE && playersBox[playernumber]["apply"] >= COST) {
        //基情の合格条件を満たしている場合
        playersBox[playernumber]["achievement"] = "基情";
        playersBox[playernumber]["apply"] += FEGET - COST;
        Text += "基本情報技術者試験に見事合格した！奨励金として" + (FEGET - COST) + "円手に入れた。資格が『 基情 』になった。";

    } else {
        //資格がなく、基情の合格条件を満たしていない場合
        playersBox[playernumber]["apply"] -= COST;
        Text += "基本情報技術者試験を受けたが、実力が足らず不合格だった。" + COST + "円失った。";

    }

    return Text;
}

//就職内定イベント用のメソッド(引数:プレイヤー名 , 0-9乱数 , 資格("なし" , "基情" , "応情" , "高度"))
function offered(name, ran, achieve) {
    company = ["未定", "小企業", "中企業", "大企業"];
    if (ran > 2) {
        ran = 1;
    } else {
        ran = 0;
    }

    playersBox[playernumber]["offer"] = company[achieverank[achieve] + ran];

}

//就職内定取り消しイベント用のメソッド(引数:プレイヤー名 , 0-5乱数)
function missoffer(name, ran) {
    if (ran < 4) {
        playersBox[playernumber]["offer"] = "未定";
    }
}

//地球祭イベント用のメソッド(引数:プレイヤー名 , 0-1乱数)
function festa(name, ran) {
    switch (ran) {
        case 0: playersBox[playernumber]["apply"] += -1000;
            break;
        case 1: playersBox[playernumber]["apply"] += 1000;
            break;
    }

    if (playersBox[playernumber]["girlfriend"] == "あり") {
        switch (ran) {
            case 0: playersBox[playernumber]["friendly"] += 1;
                break;
            case 1: playersBox[playernumber]["friendly"] += 3;
                break;
        }

    }
}

//球技大会イベント用のメソッド(引数:プレイヤー名 , 0-1乱数)
function sport(name, ran) {

    switch (ran) {
        case 0: playersBox[playernumber]["apply"] += -1000;
            break;
        case 1: playersBox[playernumber]["credit"] += 2;
            break;
    }

    if (playersBox[playernumber]["girlfriend"] == "あり") {
        switch (ran) {
            case 0: playersBox[playernumber]["friendly"] += -1;
                break;
            case 1: playersBox[playernumber]["friendly"] += 1;
                break;
        }
        return 1;
    }
    return 0;
}

