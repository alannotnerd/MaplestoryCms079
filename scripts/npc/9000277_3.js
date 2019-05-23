/*
 * nana制作 bms冒险岛工作室所有
 * 欢迎定制各种脚本
 * OX问答副本  奖励NPC
 */

var status = 0;


function start() {
    cm.warp(910000000,0);
    cm.sendOk("恭喜你完成了我的考验，赠送您#i2432352 # #t2432352# 一个!");
    cm.gainItem(2432352,1);
    
    cm.dispose();
}