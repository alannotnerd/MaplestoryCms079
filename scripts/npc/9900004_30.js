var status = 0;
var muw = 
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
	var selStr = "这边可以对收集到的邮票进行兑换。\r\n\r\n";
	selStr += "#L0##b#n#v4002000##r蜗牛邮票 #k每张1000点卷\r\n";
	selStr += "#L1##b#v4002001##r蓝蜗牛邮票 #k每张2000点卷\r\n";
	selStr += "#L2##b#v4002002##r木妖邮票 #k每张5000点卷\r\n";
	selStr += "#L3##b#v4002003##r绿水灵邮票 #k每张10000点卷\r\n";
	cm.sendSimple(selStr);
	} else if (status == 1) {
		if (selection == 0) {
			var qwe = cm.gainNX(1,Math * 1000);
			if ()
		}
		
	}
	}