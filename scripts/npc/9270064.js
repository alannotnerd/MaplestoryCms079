
/*      
 
 NPC版权:                追忆冒险岛 	        
 NPC类型: 		        综合NPC
 制作人：故事丶
 
 */
var hour;
var status = 0;
var typede = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {

            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追忆 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k#e主题副本内容：#b #n\r\n";
            zyms += "#L1##b主题 - 枫之高校#r (2014新)#k#l\r\n";
            zyms += "#L2##b主题 - 武陵道馆#r (谁才是天下第一)#k#l\r\n";
            zyms += "#L3##b主题 - 黄金寺院#r (拯救地下村民)#k#l\r\n";
            zyms += "#L4##b主题 - 雾海幽灵船#r ()#k#l\r\n";

            cm.sendSimple(zyms);




        } else if (selection == 1) { //签到
            cm.dispose();
            cm.warp(744000000);
            cm.sendOk("#e<追忆冒险岛-枫之高校>#n\r\n#b#h0# #k追忆冒险岛枫之高校副本更新完毕啦,你可以通过自己的努力获得以下物品。\r\n#v1202000# #v1202001# #v1202002# #v1202003# #v1202004# #v1202023# #v1202024# #v1202025# #v1202026# #v1202027# #v1202028# #v1202029# #v1202030# #v1202031# #v1202032# #v1202033# #v1202034# #v1202035# #v1202036# #v1202037# #v1202038# #v1202039# #v1202040# #v1202041# #v1202042# #v1202087# #v1202088# #v1202092# #v1202083# #v1202084# #v1202085# #v1202086# #v1202094# #v1202095# #v1202096# #v1202097#");


        } else if (selection == 2) { //免费福利
             cm.dispose();
             cm.warp(925020000);

        } else if (selection == 3) { //免费福利
            cm.dispose();
            cm.sendOk("即将开启。");

        } else if (selection == 4) { //免费福利
            cm.dispose();
            cm.sendOk("即将开启。");

        } else if (selection == 5) { //免费福利
            cm.dispose();
            cm.sendOk("活动内容：\r\n\r\n每晚整点00 : 00只要上线游戏就有机会获得管理员赠送的礼物。#b活动地图：1频道自由市场#k\r\n\r\n装备、道具、金卷、点卷统统都有。\r\n\r\n当然这得看你的人品,不是人人都有的哦~~");

        } else if (selection == 6) { //管理员的邀请
            cm.dispose();
            cm.sendOk("即将开启。");




        }
    }
}
