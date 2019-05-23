
/*      
 
 NPC版权:                追忆冒险岛 	        
 NPC类型: 		        综合NPC
 制作人：故事丶
 
 */

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
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追忆 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k达到指定等级要求可以领取奖励哦。\r\n";
            zyms += "#L1##b领取10-30级奖励#l   #L2##k查看奖励清单#l \r\n";
            zyms += "#L3##b领取50-100级奖励#l  #L4##k查看奖励清单#l \r\n";
            zyms += "#L5##b领取100-150级奖励#l #L6##k查看奖励清单#l \r\n";
            zyms += "#L7##b领取150-200级奖励#l #L8##k查看奖励清单#l \r\n";
            zyms += "#L9##b领取200-250级奖励#l #L10##k查看奖励清单#l \r\n";
            zyms += "#L11##r领取255满级奖励#l   #L12##k查看奖励清单#l \r\n";
            cm.sendSimple(zyms);



        } else if (selection == 1) {//10-30级奖励


            if (cm.getPlayer().getLevel() <= 10) {
                cm.sendOk("当前送礼项目最少需要10级以上才可以领取。");
            } else if (cm.getPlayer().getLevel() >= 30) {
                cm.sendOk("当前送礼项目只有等级在10-30之间才可以领取。");
            } else if (cm.getSpace(1) < 9) {
                cm.sendOk("你的背包装备栏空间不足,必须有9个以上的空位才可以领取。");
            } else if (cm.getBossLog("10级奖励", 1) < 1) {
                cm.setBossLog("10级奖励", 1);
                cm.gainItem(1012057, 1);//透明点装套
                cm.gainItem(1002186, 1);
                cm.gainItem(1102039, 1);
                cm.gainItem(1082102, 1);
                cm.gainItem(1092064, 1);
                cm.gainItem(1072153, 1);
                cm.gainItem(1702224, 1);
                cm.gainItem(1022048, 1);
                cm.gainItem(1032024, 1);
                cm.gainMeso(+200000);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了10-30等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();


        } else if (selection == 2) { //10-30级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n10-30级奖励清单如下：\r\n#v1012057# #v1002186# #v1102039# #v1082102# #v1092064# #v1072153# #v1702224# #v1022048# #v1032024# \r\n#b200000金币");

        } else if (selection == 3) { //50-100等级奖励
            if (cm.getPlayer().getLevel() <= 50) {
                cm.sendOk("当前送礼项目最少需要50级以上才可以领取。");
            } else if (cm.getPlayer().getLevel() >= 100) {
                cm.sendOk("当前送礼项目只有等级在50-100之间才可以领取。");
            } else if (cm.getSpace(5) < 2) {
                cm.sendOk("你的背包特殊栏空间不足,必须有2个以上的空位才可以领取。");
            } else if (cm.getBossLog("50级奖励", 1) < 1) {
                cm.setBossLog("50级奖励", 1);
                cm.gainItem(5074000, 5);
                cm.gainItem(5040005, 10);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了50-100等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();

        } else if (selection == 4) { //50-100等级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n50-100级奖励清单如下：\r\n#v5074000#x5 #v5040005#x10");



        } else if (selection == 5) { //100-150等级奖励
            if (cm.getPlayer().getLevel() <= 100) {
                cm.sendOk("当前送礼项目最少需要100级以上才可以领取。");
            } else if (cm.getPlayer().getLevel() >= 150) {
                cm.sendOk("当前送礼项目只有等级在100-150之间才可以领取。");
            } else if (cm.getSpace(5) < 2) {
                cm.sendOk("你的背包特殊栏空间不足,必须有2个以上的空位才可以领取。");
            } else if (cm.getBossLog("100级奖励", 1) < 1) {
                cm.setBossLog("100级奖励", 1);
                cm.gainItemPeriod(5062000, 10, 7);
                cm.gainItem(5074000, 10);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了100-150等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();

        } else if (selection == 6) { //100-150等级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n50-100级奖励清单如下：\r\n#v5062000#x10 #v5074000#x10");


        } else if (selection == 7) { //150-200等级奖励
            if (cm.getPlayer().getLevel() <= 150) {
                cm.sendOk("当前送礼项目最少需要150级以上才可以领取。");
            } else if (cm.getPlayer().getLevel() >= 200) {
                cm.sendOk("当前送礼项目只有等级在150-200之间才可以领取。");
            } else if (cm.getSpace(5) < 3) {
                cm.sendOk("你的背包特殊栏空间不足,必须有3个以上的空位才可以领取。");
            } else if (cm.getBossLog("150级奖励", 1) < 1) {
                cm.setBossLog("150级奖励", 1);
                cm.gainItemPeriod(5062000, 15, 7);
                cm.gainItemPeriod(5064000, 5, 7);
                cm.gainItem(3010155, 1);
                cm.gainItem(5390002, 5);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了150-200等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();

        } else if (selection == 8) { //150-200等级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n150-200级奖励清单如下：\r\n#v5062000#x15 #v5064000#x5 #v3010155#x1 #v5390002#x5");

        } else if (selection == 9) { //200-250等级奖励
            if (cm.getPlayer().getLevel() <= 200) {
                cm.sendOk("当前送礼项目最少需要200级以上才可以领取。");
            } else if (cm.getPlayer().getLevel() >= 250) {
                cm.sendOk("当前送礼项目只有等级在200-250之间才可以领取。");
            } else if (cm.getSpace(5) < 3) {
                cm.sendOk("你的背包特殊栏空间不足,必须有3个以上的空位才可以领取。");
            } else if (cm.getBossLog("200级奖励", 1) < 1) {
                cm.setBossLog("200级奖励", 1);
                cm.gainItemPeriod(5062002, 10, 7);
                cm.gainItemPeriod(5062000, 10, 7);
                cm.gainItemPeriod(2340000, 10, 7);
                cm.gainItem(1302063, 1);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了200-250等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();

        } else if (selection == 10) { //200-250等级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n200-250级奖励清单如下：\r\n#v5062000#x10 #v5062002#x10 #v2340000#x10 #v1302063#x1");


        } else if (selection == 11) { //255等级奖励
            if (cm.getPlayer().getLevel() != 255) {
                cm.sendOk("当前送礼项目只有等级在255才可以领取。");
            } else if (cm.getSpace(2) < 3) {
                cm.sendOk("你的背包消耗空间不足,必须有3个以上的空位才可以领取。");
            } else if (cm.getBossLog("200级奖励", 1) < 1) {
                cm.setBossLog("255级奖励", 1);
                cm.gainItemPeriod(2049119, 10, 7);
                cm.gainItemPeriod(2350002, 1, 7);
                cm.gainItemPeriod(2340000, 20, 7);
                cm.gainItem(1142541, 1);
                cm.sendOk("领取成功,祝您游戏开心愉快。");
                cm.worldMessage("[等级送礼]：玩家 [" + cm.getPlayer().getName() + "] 达到要求领取了255等级奖励。");
            } else {
                cm.sendOk("当前送礼项目只可以领取一次,你已经领取过了!");
            }
            cm.dispose();

        } else if (selection == 12) { //255等级奖励清单
            cm.dispose();
            cm.sendOk("#e<#v3991051# #v3991050# #v3991038# #v3991044#-等级送礼>#n\r\n255级奖励清单如下：\r\n#v2049119#x10 #v2350002#x1 #v2340000#x20 #v1142541#x1");


        }
    }
}

