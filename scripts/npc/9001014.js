
var status = 0;
var aaa ="#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun ="#fUI/UIWindow/Megaphone/2#";////红沙漏
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun4 ="#fUI/UIWindow/Quest/reward#";////奖励
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹带
var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////红色圆
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var p2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";


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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = "\r\n#e#d          "+cm.getServerName()+"服务中心#n#l#k\r\n";
		selStr +=""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+"\r\n";
		selStr +="#L1##r"+p2+"理财礼包#l#L2#"+p2+"在线奖励#l#L3#"+p2+"充值奖励#l#L4#"+p2+"装备制作#l\r\n\r\n";
		selStr +="#L5##b"+p2+"中介兑换#l#L6#"+p2+"重置副本#l#L7#"+p2+"美容美发#l#L9#"+p2+"解锁游戏#l\r\n\r\n";
		selStr +="#L8##d"+p2+"查活跃渡#l#L10#"+p2+"春节币店#l#L11#"+p2+"武器破攻#l#L12#"+p2+"蜡笔潜能#l\r\n\r\n";
		selStr +="#g======================================================\r\n";
		selStr +="#L13##r"+p2+"宠物进化#l#L14#"+p2+"爆率查询#l#L15#"+p2+"装备还原#l#L16#"+p2+"结婚入口#l\r\n\r\n";
		selStr +=""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+""+tz20+"\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 1);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144,17);
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 608);
            break;
	    case 3:
            cm.dispose();
            cm.openNpc(9300011, 0);
            //cm.openNpc(9310144, 8);
            break;
	    case 4:
            cm.dispose();
            cm.openNpc(9900003, 24);
            break;
	    case 5:
            cm.dispose();
            cm.openNpc(9310144, 4);
            break;
	    case 6:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
	    case 7:
            cm.dispose();
            cm.warp(100000104);
            break;
	    case 8:
            cm.dispose();
            cm.openNpc(9900003, 23);
            break;
	    case 9:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
	    case 10:
            cm.dispose();
            cm.openShop(128252);
            //cm.openNpc(9310144, 1);
            break;
		case 11:
            cm.dispose();
            cm.openNpc(9900003, 1000);
            break;
		case 12:
            cm.dispose();
            cm.openNpc(9900003, 1001);
            break;
		case 13:
            cm.dispose();
            cm.openNpc(1032102, 0);
            break;
		case 14:
            cm.dispose();
            cm.openNpc(9900003, 5);
            break;
	    case 15:
            cm.dispose();
            cm.openNpc(9000069, 1111);
            break;	    
		case 16:
            cm.dispose();
            cm.warp(700000000);
            break;













}
    }
}