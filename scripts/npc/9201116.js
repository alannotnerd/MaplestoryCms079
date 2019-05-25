var status = 0;
var p1 = "#fUI/StatusBar2.img/starPlanet/achive/1#";
var e1 = "#fUI/TenthAnniversaryBoardGame.img/TenthBoardGameUI/bossColor/2/nomal/0#";
var e2 = "#fUI/TenthAnniversaryBoardGame.img/TenthBoardGameUI/bossColor/4/nomal/0#";
var e3 = "#fUI/TenthAnniversaryBoardGame.img/TenthBoardGameUI/bossColor/6/nomal/0#";
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = ""+e1+""+e2+""+e3+"\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#e#b#L5#猎人升级介绍#l#L6##r猎人十字商店#l#L7##g猎人每周福利#k#l\r\n\r\n#L1##d"+p1+"领取见习猎人资格证#l\r\n#L2#"+p1+"升级 B级猎人资格证#l\r\n#L3#"+p1+"升级 A级猎人资格证#l\r\n#L4#"+p1+"升级 S级猎人资格证#l\r\n\r\n\r\n#v3700031##v3700032##v3700033##v3700034##v3700031##v3700032##v3700033##v3700034##v3700031##v3700032#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {

        case 1:
            if (cm.getMeso() >= 50000000 && cm.haveItem(4310029,1000) && cm.haveItem(4310143,500)) {
                cm.gainMeso( - 50000000);
		cm.gainItem(4310029, -1000);//十字币
		cm.gainItem(4310143, -500); //BOSS币
                cm.gainItem(3700031,1);//见习猎人资格证
                cm.sendOk("兑换 见习猎人资格证 成功,祝你游戏愉快!");
            } else {
                cm.sendOk("想坑我,做梦吧...你差5000W金币,十字币1000,BOSS币500");
            }
            break;
      case 2:
            if (cm.getMeso() >= 50000000 && cm.haveItem(4310029,2000) && cm.haveItem(4310143,1000) && cm.haveItem(3700031,1)) {
                cm.gainMeso( - 50000000);
		cm.gainItem(4310029, -2000); //十字币
		cm.gainItem(4310143, -1000); //BOSS币
		cm.gainItem(3700031, -1);  //见习猎人资格证
                cm.gainItem(3700032,1); //B级猎人资格证
                cm.sendOk("兑换 B级猎人资格证 成功,祝你游戏愉快!");
            } else {
                cm.sendOk("想坑我,做梦吧...\r\n你差5000W金币,十字币2000,BOSS币1000,见习猎人资格证一个");
            }
            break;
    case 3:
            if (cm.getMeso() >= 50000000 && cm.haveItem(4310029,3000) && cm.haveItem(4310143,2000) && cm.haveItem(3700032,1)) {
                cm.gainMeso( - 50000000);
		cm.gainItem(4310029, -3000); //十字币
		cm.gainItem(4310143, -2000); //BOSS币
		cm.gainItem(3700032, -1);  //B级猎人资格证
                cm.gainItem(3700033,1);  //A级猎人资格证
                cm.sendOk("兑换 A级猎人资格证 成功,祝你游戏愉快!");
            } else {
                cm.sendOk("想坑我,做梦吧...\r\n你差5000W金币,十字币3000,BOSS币2000,B级猎人资格证一个");
            }
            break;
  case 4:
            if (cm.getMeso() >= 50000000 && cm.haveItem(4310029,5000) && cm.haveItem(4310143,3000) && cm.haveItem(3700033,1)) {
                cm.gainMeso( - 50000000);
		cm.gainItem(4310029, -5000); //十字币
		cm.gainItem(4310143, -3000); //BOSS币
		cm.gainItem(3700033, -1);  //A级猎人资格证
                cm.gainItem(3700034,1);  //S级猎人资格证
                cm.sendOk("兑换 S级猎人资格证 成功,祝你游戏愉快!");
            } else {
                cm.sendOk("想坑我,做梦吧...\r\n你差5000W金币,十字币5000,BOSS币3000,A级猎人资格证一个");
            }
            break;
			case 5:
            cm.dispose();
            //cm.openNpc(9900003,24);
              cm.sendOk("#e#r见习猎人资格证：\r\n#b5000W金币，1000个十字币,500个BOSS\r\n#rB级猎人资格证：\r\n#b5000W金币，2000个十字币，1000个BOSS币，见习猎人资格证一个\r\n#rA级猎人资格证：\r\n#b5000W金币，3000个十字币，2000个BOSS币，B级猎人资格证一个\r\n#rS级猎人资格证：\r\n#b5000W金币，5000个十字币，3000个BOSS币，A级猎人资格证一个");
            break;
case 6:
            cm.dispose();
            cm.openShop(128251);
            break;
		case 7:
            cm.dispose();
            cm.warp(931050500);
            break;
        }
        cm.dispose();
    }
}