var status = 0
var text;

var wn60 = "#fMob/0100101.img/die1/1#";  //梦想

var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警灯
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
	text = "#d├--------------------万能传送--------------------┤\r\n\r\n\r\n";
	text += "#L0#"+wn1+"#e城镇地图#l   #L1#"+wn1+"#e练级地图#l   #L2#"+wn1+"#eBOSS传送#l\r\n\r\n";
	text += "           #d使用脚本挂机刷钱永久封停#l\r\n";
	text += "#r（如果使用非法程序的请及时截图举报永久封停）#l\r\n\r\n";
	text += "#L3#"+wn60+"#r【美容美发】#l#L4#"+wn60+"#r【跳跳地图】#l\r\n";
	text += "#L5#"+wn60+"#r【家族中心】#l#L6#"+wn60+"#r【结婚地图】#l\r\n";
	text += "#L7#"+wn60+"#r【百宝抽奖】#l#L8#"+wn60+"#r【棋盘地带】#l\r\n";
	cm.sendSimple(text);
	} else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310362,11);
            break;
		case 1:
            cm.dispose();
            cm.openNpc(9310362,12);
            break;
		case 2:
            cm.dispose();
            cm.openNpc(9310362,13);
            break;	
		}
	}
}