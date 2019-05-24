
var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var ca = java.util.Calendar.getInstance();
var day3 = ca.get(java.util.Calendar.DATE);//获取日
var day = ca.get(java.util.Calendar.DATE);//获取日
var day1 = ca.get(java.util.Calendar.YEAR);//获取年
var day2 = ca.get(java.util.Calendar.MONTH)+1;//获取月
//var day2 = ca.get(java.util.Calendar.HOUR_OF_DAY);//获取月
var eff = "#fUI/UIWindowBT.img/WorldMap/BtNext/mouseOver/0#";
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";
var eff4 = "#fUI/Basic/BtHide3/mouseOver/0#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var fff ="#fUI/UIWindow.img/Quest/icon6/0#";
var aaa ="#fUI/Login.img/WorldNotice/2/0#";
var ttt ="#fUI/UIWindow.img/Quest/icon7/0#";
var kkk6 ="#fEffect/ItemEff/1004125/effect/default/0#";
var kkk5 ="#fEffect/ItemEff/1102672/effect/swingP1/0#";
var kkk4 ="#fEffect/ItemEff/1102617/effect/shoot2/0#";
var kkk3 ="#fEffect/Tomb/condition1/land/0#";
var kkk99 ="#fEffect/ItemEff/2420004/1/0#";
var kkk2 ="#fEffect/CharacterEff/moveRandomSprayEff/DAShieldChasing/effect/3/0#";
var kkk1 ="#fEffect/CharacterEff/moveRandomSprayEff/chillingStep/effect/0/0#";
var kkk ="#fEffect/CharacterEff/1051296/1/0#";
var zzz ="#fUI/UIWindow.img/Quest/icon5/0#";
var yyy ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var rrr ="#fUI/UIWindow2.img/Quest/list/recommendTitle#";
var ccc ="#fUI/UIWindowBT.img/WorldMap/BtHome/normal/0#";
var hhh ="#fUI/UIWindowBT.img/WorldMap/BtQsearch/mouseOver/0#";
var sz1 ="#fEffect/BasicEff/MainNotice/Content/Number/1/0#";
var kkk ="#fEffect/CharacterEff/1051294/2/0#";
var kkk8 ="#fEffect/CharacterEff/farmEnterTuto/mouseClick/3#";
var uiq ="#fEffect/CharacterEff/1082565/2/0#";
var uiq1 ="#fEffect/CharacterEff/1082565/1/0#";
var uiq2 ="#fEffect/CharacterEff/1082565/4/0#";
var uiq3 ="#fEffect/CharacterEff/1082565/0/0#";

var e1 = "#fUI/Basic/BtHide3/mouseOver/0#";
var e2 = "#fUI/UIWindow.img/Shop/meso#";
var e3 ="#fUI/UIWindow.img/Quest/icon6/0#";
var e4 ="#fUI/Login.img/WorldNotice/2/0#";
var e5 ="#fUI/UIWindow.img/Quest/icon7/0#";
var e6 ="#fEffect/ItemEff/1004125/effect/default/0#";
var e7 ="#fEffect/ItemEff/1102672/effect/swingP1/0#";
var e8 ="#fEffect/ItemEff/1102617/effect/shoot2/0#";
var e9 ="#fEffect/Tomb/condition1/land/0#";
var e10 ="#fEffect/CharacterEff/moveRandomSprayEff/DAShieldChasing/effect/3/0#";
var e11 ="#fEffect/CharacterEff/moveRandomSprayEff/chillingStep/effect/0/0#";
//var kkk ="#fEffect/CharacterEff/1051296/1/0#";
var e12 ="#fUI/UIWindow.img/Quest/icon5/0#";
var e13 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var e14 ="#fUI/UIWindow2.img/Quest/list/recommendTitle#";
var e15 ="#fUI/UIWindowBT.img/WorldMap/BtHome/normal/0#";
var e16 ="#fUI/UIWindowBT.img/WorldMap/BtQsearch/mouseOver/0#";
var e17 ="#fEffect/BasicEff/MainNotice/Content/Number/1/0#";
var e18 ="#fEffect/CharacterEff/1051294/2/0#";
var e19 ="#fEffect/CharacterEff/farmEnterTuto/mouseClick/3#";
var e20 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var e21 ="#fEffect/ItemEff/1112823/0/2#";
var e22 ="#fEffect/ItemEff/1004122/effect/default/14#";
var e23 ="#fEffect/ItemEff/1004122/effect/default/13#";

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
	var v = getVIP(cm);
	var selStr = "尊敬的玩家#r#h ##k您好\r\n#k#n\r\n#L12##b战神转职#L13##b海盗转职\r\n";
	cm.sendSimple(selStr);
    } else if(status == 1) {
	switch (selection){
	case 11:
		if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022)
			cm.sendOk("你不是正在自由市场吗，想去哪儿呢");
		else
			cm.warp(910000000);
		cm.dispose();
		break;
	case 12:
		cm.dispose();
		cm.openNpc(9310022, 1);
		break;
	case 13:
		cm.dispose();
		cm.openNpc(9310022, 2);
		break;
	case 14:
		cm.dispose();
		cm.openNpc(9310022, 3);
		break;
	case 15:
		cm.dispose();
		cm.openNpc(9310022, 4);//cm.sendOk("#r补贴后在使用此功能...");
		break;
	case 16:
		cm.dispose();
		cm.openNpc(9310022, 5);
		break;

	case 17:
        	cm.dispose();
        	cm.openNpc(9310022, 6);
        	break;
	case 22:
        	cm.dispose();
        	cm.openNpc(9201059);
        	break;

	case 31:
        	cm.dispose();
        	cm.openNpc(1203001);
        	break;
	case 32:
	case 33:
	case 41:
        	cm.dispose();
		cm.openNpc(9900004,selection);
        	break;
	case 36:
		for (var i = -1;i <= 6;i++){
			//cm.getPlayer().dropMessage(i, "内容" + i);
		}
		cm.dispose();
		break;
	case 46:
		cm.sendOk(cm.getPlayer().getMapId());
		cm.dispose();
		break;
	default:
		cm.sendOk("default");
		cm.dispose();
		break;
	}

    }
}

//获得VIP等级
function getVIP(cm){
	var v_p = 4031331;
	for (var i = 7;i >= 1;i--){
		if (cm.itemQuantity(v_p + i)!=0) return i;
	}
	return 0;
}

//飞升等级
function getFSdj(cm){
	var f_p = 4032516;
	for (var i = 4;i >= 1;i--){
		if (cm.itemQuantity(f_p + i)!=0) return i;
	}
	return 0;
}
