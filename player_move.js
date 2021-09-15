var player_position;
var first_tile;
var tile_size;
var player_first_position;
var player_flag = [true, true, true, true];
var orbit_flag = [false, false, false, false];
var orbit_count = [0,0,0,0];
var xy_flag = [0,0,0,0];
var plus_minus = [1,1,1,1];
var count = 0;
var end_flag = 999;
var iy;
var ix;
var ixy;

var MapData;

function setMapData(mapdata) {
    MapData = mapdata;
}

function setPosition(l, f, s){
    player_position = l;
    player_first_position = [];
    //for文で要素を格納する
    for(var i = 0; i < l.length; i++){
        player_first_position[i] = [];
        for(var j = 0; j < 2; j++){
            player_first_position[i][j] = l[i][j];
        }
    }
    first_tile = [];
    for(var i = 0; i < f.length; i++){
        first_tile[i] = f[i];
    }
    tile_size = s;
}

function move(p, rep) {
    if (orbit_count[p] < 2) {
        if (player_flag[p]) {
            player_position[p][0] = first_tile[0];
            player_position[p][1] = first_tile[1];
            rep--;
            player_flag[p] = false;
        }
        for (var i = 0; i < rep; i++) {
            player_position[p][xy_flag[p]] += plus_minus[p] * tile_size;
            iy = player_position[p][1] / tile_size;
            ix = player_position[p][0] / tile_size;
            ixy = [ix, iy];
            if(MapData[ixy[1]][ixy[0]] >= 32 && MapData[ixy[1]][ixy[0]] <= 47) {
                player_flag[p] = true;
                player_position[p][0] = player_first_position[p][0];
                player_position[p][1] = player_first_position[p][1];
                xy_flag[p] = 0;
                plus_minus[p] = 1;
                orbit_count[p]++;
                var orbit_end_flag = true;
                for (var i = 0; i < players; i++) {
                    if (orbit_count[i] < 2) {
                        orbit_end_flag = false;
                    }
                }
                if (orbit_end_flag) {
                    end_flag = 99;
                    return end_flag;
                }
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
    }else {
        return end_flag;
    }

    return player_position[p];
}