var maps = [104020000, 100000000, 101000000, 102000000, 103000000, 104000000, 105000000, 120000100]
var status = -1;

function start() {
	cm.sendYesNo("你想传送到别的地方吗？这只需要花费#b3000金币#k而已哦。");
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
	status++;
	if (status == 0) {
		cm.sendSlideMenu(5, "#0#六岔路口#1#射手村#2#魔法密林#3#勇士部落#4#废弃都市#5#明珠港#6#林中之城#7#诺特勒斯号");
	} else if (status == 1) {
		if (cm.getMeso() < 3000) {
			cm.sendNext("请确认你是否带有足够的盘缠。");
			cm.dispose();
		} else {
			cm.gainMeso(-3000);
			cm.warp(maps[selection]);
			cm.dispose();
		}
	}
}