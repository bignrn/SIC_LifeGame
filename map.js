/*
date:2021.09.09

==================
*Map Index*
00:芝
01:木
02:家
03:ビル
04:山
05:海
06:？マス
07:☆マス
08:車(赤)
09:車(青)
10:車(黄)
11:車(白)
12:春マス(団子)
13:春マス(桜)
14:春マス(桜２)
15:秋マス(芝)
16:秋マス(紅葉)
17:秋マス(山)
18:秋マス(かぼちゃ)
19:秋マス(イチョウ)
20:夏マス(かき氷)
21:夏マス(スイカ)
22:夏マス(パラソル)
23:夏マス(法被)
24:冬マス(雪だるま)
25:冬マス(木)
26:冬マス(山)
27:冬マス(クリスマスツリー)
28:冬マス(芝)
29:空きマス
30:空きマス
31:空きマス
32:スタートマス(春１)
33:スタートマス(春２)
34:スタートマス(春３)
35:スタートマス(春４)
36:スタートマス(通常１) → スタートマス(春５)
37:スタートマス(通常２) → スタートマス(春６)
38:スタートマス(通常３) → スタートマス(春７)
39:スタートマス(通常４) → スタートマス(春８)
40:スタートマス(春５) → スタートマス(春９)
41:スタートマス(春６) → スタートマス(春１０)
42:スタートマス(春７) → スタートマス(春１１)
43:スタートマス(春８) → スタートマス(春１２)
44:スタートマス(通常５) → スタートマス(春１３)
45:スタートマス(通常６) → スタートマス(春１４)
46:スタートマス(通常７) → スタートマス(春１５)
47:スタートマス(通常８) → スタートマス(春１６)
48:スタートマス(春９) → イベントマス(地球祭)
49:スタートマス(春１０) → イベントマス(資格)
50:スタートマス(春１１) → イベントマス(内定)
51:スタートマス(春１２) → イベントマス(内定取消)
52:スタートマス(通常９) → イベントマス(球技大会)
53:スタートマス(通常１０) → イベントマス(交際・破局)
54:スタートマス(通常１１) → イベントマス(デート)
55:スタートマス(通常１２) → イベントマス(バイト)
56:スタートマス(春１３) → イベントマス(バイト先倒産)
57:スタートマス(春１４) → イベントマス(遅刻・欠席)
58:スタートマス(春１５) → イベントマス(単位)
59:スタートマス(春１６) → イベントマス(お金減)
60:スタートマス(通常１３) → 空きマス
61:スタートマス(通常１４) → 空きマス
62:スタートマス(通常１５) → 空きマス
63:スタートマス(通常１６) → 第１マス
==================
*/
const Map = [
    [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],
    [15,15,15,15,15,59,57,55,16,17,17,17,17,15,16,15,28,25,28,27,28,27,28,27,28,27,28,27,28,25,28],
    [15,15,15,15,15,58,18,58,15,16,15,16,15,16,15,28,25,50,55,58,57,56,53,58,54,58,59,50,59,55,24],
    [15,15,15,15,15,55,17,54,59,58,59,53,59,59,57,48,58,57,25,28,27,28,27,28,27,28,27,28,24,49,28],
    [15,59,57,54,56,59,17,17,15,15,19,15,19,15,19,28,28,26,26,25,28,25,28,28,28,28,28,24,53,59,28],
    [18,53,15,18,17,17,17,17,17,19,15,19,15,19,15,28,26,26,26,26,25,50,59,57,59,54,59,59,59,28,24],
    [15,59,18,17,17,17,17,17,17,17,19,15,19,15,19,28,26,26,26,26,25,58,28,28,28,28,28,28,28,28,28],
    [18,57,58,59,59,57,58,59,55,59,54,59,58,15,32,33,34,35,26,28,28,59,54,57,53,59,55,56,58,28,28],
    [15,15,15,15,15,15,15,15,15,15,15,15,53,15,36,37,38,39,28,28, 0, 1, 0, 1, 0, 1, 0, 1,59, 0,28],
    [ 0, 0, 0, 0, 0, 5, 5, 5, 5, 5,15,15,57,15,40,41,42,43,51,59,54,59,57,59,55,50,59,57,53, 0, 0],
    [ 1, 1, 1, 1, 1,59,50,59,56,59,49,15,59,15,44,45,46,47,13, 0,13,13, 0,13,13, 0,13,13, 0,14, 0],
    [ 1,57,56,58, 1,55, 5, 5, 5, 5,59,53,59, 0, 1, 0, 0,63,53,57,59,58,55,59,57,54,59, 0,13, 0, 0],
    [ 1,50, 1,59,59,54, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,14,13,14,13,13,59, 0, 0, 0, 0],
    [ 1,55, 1, 1, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,14,13, 5,13,58,14, 0, 0, 0],
    [ 5,59,58, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 1, 0, 1, 0, 0, 0, 5, 5,14,53, 0,14, 0,14],
    [ 5, 5,54,59,53,57,58,59,57,59,20,20,59,58,54,59,57,59,58,54,55,59,57,58,59,52,56,14, 0,14, 0],
    [ 5, 5, 5,22,21,22, 0, 0, 0,53,57,55,59, 0, 1, 1, 1, 1, 1, 0, 1, 0,13, 0,14, 0,14, 0,14, 0,14],
    [ 5, 5, 5, 5,22,22,22, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,13, 0,14, 0,14, 0,14, 0]
];
//プレイヤーが通るマスの場所番号配列
const ROUTE = [
    [18,12],[19,12],[20,12],[21,12],[22,12],[23,12],[24,12],[25,12],[26,12],[27,12],
    [27,13],[27,14],[[27,15],[27,16],]
];

for(var i = 0 ; i < ROUTE.length ; i++){
    var point = ROUTE[i];

    var players_place = Map[point];
}
function getMapData() {
    return Map;
}