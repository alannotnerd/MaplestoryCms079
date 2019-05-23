var status = 0
var text;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";//任务图标
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
	text = "#d├------------------能力专栏------------------┤\r\n\r\n\r\n";
	text += "#L0#"+icon+"#d[推荐]星岩魔方购买    #k（目前状态：#r火爆推荐）#l\r\n\r\n";
	text += "#L1#"+icon+"#b[装备]#d一键修改潜能    #k（目前状态：#r火爆推荐）#l\r\n\r\n";
	text += "#L5#"+icon+"#b[武器]#d伤害上限突破    #k（需要：#v4033356##v2614017##v4000463#）#l\r\n\r\n";
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