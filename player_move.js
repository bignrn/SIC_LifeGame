var player_position;
var first_tile;
var tile_size;
let player_first_position;
let player_flag = [true, true, true, true];
let xy_flag = [0,0,0,0];
let plus_minus = [1,1,1,1];
let count = 0;
let iy;
let ix;
let ixy;

var MapData;

function setMapData(mapdata) {
    MapData = mapdata;
}

function setPosition(l, f, s){
    player_position = l;
    player_first_position = player_position;
    first_tile = f;
    tile_size = s;
}

function move(p, rep) {
    if(!player_flag[p]) {
        for (let i = 0; i < rep; i++) {
            player_position[p][xy_flag[p]] += plus_minus[p] * tile_size;
            iy = player_position[p][1] / tile_size;
            ix = player_position[p][0] / tile_size;
            ixy = [ix, iy];
            console.log(MapData[ixy[1]][ixy[0]]);
            if(MapData[ixy[1]][ixy[0]] >= 32 && MapData[ixy[1]][ixy[0]] <= 47) {
                player_flag[p] = true;
                player_position[p] = player_first_position[p];
                break;
            }
            if(MapData[ixy[1]][ixy[0]] != 6 && MapData[ixy[1]][ixy[0]] != 7 && MapData[ixy[1]][ixy[0]] != 63) {
                console.log("back");
                player_position[p][xy_flag[p]] -= plus_minus[p] * tile_size;
                ixy[xy_flag[p]] -= plus_minus[p];
                if(xy_flag[p] == 0 && (MapData[ixy[1] + 1][ixy[0]] == 6 || MapData[ixy[1] + 1][ixy[0]] == 7)) {
                    plus_minus[p] = 1;
                }else if(xy_flag[p] == 0 && (MapData[ixy[1] - 1][ixy[0]] == 6 || MapData[ixy[1] - 1][ixy[0]] == 7)) {
                    plus_minus[p] = -1;
                }
                if(xy_flag[p] == 1 && (MapData[ixy[1]][ixy[0] + 1] == 6 || MapData[ixy[1]][ixy[0] + 1] == 7)) {
                    plus_minus[p] = 1;
                }else if(xy_flag[p] == 1 && (MapData[ixy[1]][ixy[0] - 1] == 6 || MapData[ixy[1]][ixy[0] - 1] == 7)) {
                    plus_minus[p] = -1;
                }
                xy_flag[p] = 1 - xy_flag[p];
                player_position[p][xy_flag[p]] += plus_minus[p] * tile_size;
            }
        }
    } else {
        player_position[p] = first_tile;
        player_position[p][0] += (rep - 1) * tile_size;
        player_flag[p] = false;
    }

    return player_position[p];
}