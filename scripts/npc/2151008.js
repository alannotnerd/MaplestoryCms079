var status = -1;
var map = 931000500;
var num = 1;
var maxp = 1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status <= 1) {
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	var selStr = "你想传送到美洲豹栖息地么?";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#传送到美洲豹栖息地 #l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    }
}