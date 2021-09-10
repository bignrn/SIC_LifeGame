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
function playerEventMain(g){
    g.font = EVENT_FONT;
    g.fillText("HELP:キーボード[H]", 2, 142)
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