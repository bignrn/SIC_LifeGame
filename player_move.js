var player_position;    //プレイヤーの現在地座標
var first_tile;         //第１マスの座標
var tile_size;          //１タイルのビット幅
var player_first_position;  //プレイヤーの初期座標
var player_flag = [true, true, true, true]; //プレイヤーがスタート地点内にいるかどうかのフラグ
var orbit_count = [0,0,0,0];//プレイヤーの現在の周回数
var orbit_number = 2;       //ゲーム終了に必要なプレイヤーの周回数
var xy_flag = [];   //プレイヤーの現在向いているxy方向
var plus_minus = [];//プレイヤーの現在向いている+-方向
var f_xy_flag;      //ゲーム開始後１回目の行動時に向くxy方向
var f_plus_minus;   //ゲーム開始後１回目の行動時に向く+-方向
var end_flag = 999; //ゲーム終了フラグ(999->ターン終了.99->ゲーム終了)

//ターンプレイヤーの現在座標取得用変数
var iy;
var ix;
var ixy;

//マップ情報取得用変数
var MapData;

/**
 * マップ情報を取得、格納する
 * @param mapdata int[][] マップの要素番号を格納した二次配列
 */
function setMapData(mapdata) {
    MapData = mapdata;
}

/**
 * 各座標、タイルのサイズを取得する
 * @param l int[][] 各プレイヤーの初期座標
 * @param f int[] 第１マスの座標
 * @param s int タイルの幅
 */
function setPosition(l, f, s){
    player_position = l;
    //配列の共有化を防ぐための初期化作業(プレイヤーの初期配置座標)
    player_first_position = [];
    for(var i = 0; i < l.length; i++){
        player_first_position[i] = [];
        for(var j = 0; j < 2; j++){
            player_first_position[i][j] = l[i][j];
        }
    }
    //配列の共有化を防ぐための初期化作業(第１マスの座標)
    first_tile = [];
    for(var i = 0; i < f.length; i++){
        first_tile[i] = f[i];
    }
    var f_longitude = Math.floor(f[1] / 8);
    var f_latitude = Math.floor(f[0] / 8);
    if (MapData[f_longitude][f_latitude + 1] >= 48) {
        f_xy_flag = 0;
        f_plus_minus = 1;
    }else if (MapData[f_longitude][f_latitude - 1] >= 48) {
        f_xy_flag = 0;
        f_plus_minus = -1;
    }else if (MapData[f_longitude + 1][f_latitude] >= 48) {
        f_xy_flag = 1;
        f_plus_minus = 1;
    }else if (MapData[f_longitude - 1][f_latitude] >= 48) {
        f_xy_flag = 1;
        f_plus_minus = -1;
    }
    for (var i = 0; i < players; i++) {
        xy_flag[i] = f_xy_flag;
        plus_minus[i] = f_plus_minus;
    }

    tile_size = s;
}

/**
 * ターンプレイヤーの座標をサイコロの出目分だけ移動させる
 * @param p int プレイヤー番号
 * @param rep int サイコロの出目
 * @returns {number|*} int[] or int プレイヤーの現在地座標、もしくはゲーム終了フラグ
 */
function move(p, rep) {
    //ゲーム終了フラグが[ゲーム終了]なら即座にゲーム終了フラグを返す。
    if (end_flag == 99) {
        return end_flag;
    }

    //ターンプレイヤーがゴールしていたら、次のプレイヤーに番を回す。全員がゴールしていたら、ゲーム終了フラグを[ターン終了]から[ゲーム終了]に変更する。
    if (orbit_count[p] >= orbit_number) {
        var orbit_end_flag = true;  //[ゲーム終了]を管理する終了管理フラグ
        for (var i = 0; i < players; i++) {
            if (orbit_count[i] < orbit_number) {
                orbit_end_flag = false; //１人でもゴールしていなければ終了管理フラグを折る。
            }
        }
        //全員がゴールしていたらゲーム終了フラグを変更する
        if (orbit_end_flag) {
            end_flag = 99;
        }
        return end_flag;
    }

    //プレイヤーが初期位置にいたら(フラグで管理)、１回目の移動を第１マスに固定する。
    if (player_flag[p]) {
        player_position[p][0] = first_tile[0];
        player_position[p][1] = first_tile[1];
        rep--;//1マス進んでいるので、出目を１マス分減らす。
        player_flag[p] = false;
    }

    //１マスずつ進み、進んだ先が移動できないタイルなら引き返して左折or右折する。
    for (var i = 0; i < rep; i++) {
        player_position[p][xy_flag[p]] += plus_minus[p] * tile_size;
        iy = player_position[p][1] / tile_size;
        ix = player_position[p][0] / tile_size;
        ixy = [ix, iy];
        if(MapData[ixy[1]][ixy[0]] >= 32 && MapData[ixy[1]][ixy[0]] <= 47) {
            player_flag[p] = true;
            player_position[p][0] = player_first_position[p][0];
            player_position[p][1] = player_first_position[p][1];
            xy_flag[p] = f_xy_flag;
            plus_minus[p] = f_plus_minus;
            orbit_count[p]++;
            break;
        }
        if(MapData[ixy[1]][ixy[0]] < 48) {
            player_position[p][xy_flag[p]] -= plus_minus[p] * tile_size;
            ixy[xy_flag[p]] -= plus_minus[p];
            if(xy_flag[p] == 0 && (MapData[ixy[1] + 1][ixy[0]] >= 32)) {
                plus_minus[p] = 1;
            }else if(xy_flag[p] == 0 && (MapData[ixy[1] - 1][ixy[0]] >= 32)) {
                plus_minus[p] = -1;
            }
            if(xy_flag[p] == 1 && (MapData[ixy[1]][ixy[0] + 1] >= 32)) {
                plus_minus[p] = 1;
            }else if(xy_flag[p] == 1 && (MapData[ixy[1]][ixy[0] - 1] >= 32)) {
                plus_minus[p] = -1;
            }
            xy_flag[p] = 1 - xy_flag[p];
            player_position[p][xy_flag[p]] += plus_minus[p] * tile_size;
        }
    }

    return player_position[p];
}