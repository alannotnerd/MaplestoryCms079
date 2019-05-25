var status = 0
var text;
var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活动图标
var wn20 = "#fUI/CashShop.img/CSEffect/hot/0#";  //人气图标
var wn21 = "#fUI/CashShop.img/CSEffect/mileage/0#";  //积分图标
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品图标
var wn23 = "#fUI/CashShop.img/CSEffect/sale/0#";  //折扣图标
var wn24 = "#fUI/CashShop.img/CSEffect/time/0#";  //限量图标
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var d10 = "#fUI/UIWindow.img/Shop/meso#";//金币图标
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
	text = "#b您好，欢迎来到小情绪冒险岛，我是各种商城物品贩卖商#l\r\n";
	text += tz20+"#k点卷：#r"+cm.getPlayer().getCSPoints(1)+"\t\t"+tz20+"#k抵用点卷：#r"+cm.getPlayer().getCSPoints(2)+"\r\n";
	text += "#L0#"+d10+"#d购买商城物品#v5062009##v5520001##v5064000##v2049509##l\r\n";
	text += "#L1#"+d10+"#d购买稀有点装#v1042321##v1112196##v1004193##v1702533##l\r\n";
	text += "#L2#"+d10+"#d购买各类椅子#v3015295##v3015443##v3012031##v3010527##l\r\n\r\n";
	text += "#L3#"+wn22+"#b商城喇叭#l      #L4#"+wn19+"#b双倍卡/电池/皮肤#l\r\n"
	text += "#L5#"+wn24+"#b神奇骑宠#l      #L6#"+wn23+"#b法弗纳武器（限购2把）#l\r\n";
	cm.sendSimple(text);
	} else if (status == 1) {
        switch (selection) {
        case 1:
            cm.dispose();
            cm.openNpc(9030100);
            break;
		case 2:
            cm.dispose();
            cm.openNpc(9900003,5);
            break;	
		}
	}
}