var status = 0;

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
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var yun ="#fUI/UIWindow/Quest/icon7/0#";////红沙漏
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////红色圆
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun3 ="#fUI/UIWindow/Quest/prob#";////机率获得
var yun4 ="#fUI/UIWindow/Quest/reward#";////奖励
var yun5 ="#fUI/UIWindow/Quest/summary#";////任务简洁
var yun6 ="#fUI/UIWindow/PartySearch2/BtPrev/mouseOver/0#";////左指标
var yun7 ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////右指标
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun12 ="#fUI/UIWindow/Megaphone/2#";////骷髅
var xiaoyun1 ="#fUI/UIWindow/AriantMatch/characterIcon/0#";////红方
var xiaoyun2 ="#fUI/UIWindow/AriantMatch/characterIcon/1#";////蓝方
var xiaoyun3 ="#fUI/UIWindow/AriantMatch/characterIcon/2#";////绿方
var xiaoyun4 ="#fUI/UIWindow/AriantMatch/characterIcon/3#";////黄方
var xiaoyun5 ="#fUI/UIWindow/AriantMatch/characterIcon/4#";////紫方
var xiaoyun6 ="#fUI/UIWindow/AriantMatch/characterIcon/5#";////橙方
var xiaoyun7 ="#fUI/UIWindow/Minigame/Common/btStart/mouseOver/0#";////开始
var xiaoyun8 ="#fUI/UIWindow/Minigame/Common/mark#";////冒险岛图标

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
        var selStr = "#e#k         "+yun8+"☆天涯独家军衔勋章系统☆"+yun9+"\r\n"+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+"\r\n#e#g                 #L1#"+yun12+"介绍"+yun12+"#l\r\n#e#r               #L2#"+yun12+"升级军衔"+yun12+"#l\r\n\#e#b           #L3#"+yun12+"领取军衔等级福利"+yun12+"#l\r\n\r\n#i1142311##i1142312##i1142313##i1142314##i1142315##i1142316##i1142317##i1142318##i1142319##i1142320##i1142321#\r\n\r\n\#e#b  #L4#"+yun12+"领取最初始勋章(不小心把勋章丢掉的玩家)"+yun12+"#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
			        case 1:
            cm.dispose();
            cm.sendOk("#e#r本F特色的军衔系统，点击升级可以查看晋级军衔所需要的材料。属性非常可观，还有奖励丰富的每日军衔礼包。后期还会开放种种特权。\r\n少校"+yun4+"\r\n#d祝福:20  中介:5  金币:1000W  星星:50\r\n#r中校"+yun4+"#d\r\n祝福:30  中介:10  金币::1500W  星星:100  红魔方:20  转蛋卷:30\r\n#r上校"+yun4+"#b\r\n祝福:40  中介:15  金币:2500W  星星:150  红魔方:40  转蛋卷:60\r\n#r团长"+yun4+"#d\r\n祝福:50  中介:20  金币:4000W  星星:150  红魔方:60  转蛋卷:60  理财抽奖箱子:5");
            break;
			case 100:
            cm.dispose();
            cm.openNpc(9310376,110);
            break;
			        case 2:
            cm.dispose();
            cm.openNpc(9120026,1);
            break;
			        case 3:
            cm.dispose();
            cm.openNpc(9120026,2);
            break;
			        case 4:
            cm.dispose();
            cm.gainItem(1142310, 1);
            break;
			        case 5:
            cm.dispose();
            cm.openNpc(9310376,6);
            break;
			        case 6:
            cm.dispose();
            cm.openNpc(9310376,3);
            break;
			        case 7:
            cm.dispose();
            cm.openNpc(9310376,7);
            break;
			        case 8:
            cm.dispose();
            cm.openNpc(9310376,8);
            break;
			        case 9:
            cm.dispose();
            cm.openNpc(9310376,9);
            break;
			case 10:
            cm.dispose();
            cm.openNpc(9310376,10);
            break;
			case 11:
            cm.dispose();
            cm.openNpc(9310376,11);
            break;
		}
    }
}
