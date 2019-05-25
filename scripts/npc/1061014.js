importPackage(net.sf.cherry.client);

var status = 0;
var job;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendOk("在当前所在的频道中可以参加#b简单模式蝙蝠怪远征队#k。如果想参加其他模式，请移动到相应的频道。\r\n#b#i3994115#其他频道/50～70级/3～6人\r\n#b#i3994116#5频道、10频道/50级以上/6～15人\r\n#b#i3994117#困难模式开放在2频道/120级以上/15～30人\r\n#b#i3994118#此模式由管理员开放/180级以上/20～35人");
			cm.dispose();
			return;
		}
	}
}	
