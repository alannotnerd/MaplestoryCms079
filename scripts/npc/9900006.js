var status = 0;

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
			cm.sendNext("    欢乐每一天！新颖内置活动开始啦！让你体验到你在正服无法体验到的游戏乐趣。让你得到你在正服无法得到的物品！\r\n\r\n#b活动时间：12月28日开始--Ver078版本结束。#k");
		} else if (status == 1) {
			cm.sendNextPrev("活动期间，只要带着飞天猪的蛋。就可随机获取以下物品：");
		} else if (status == 2) {
			cm.sendNextPrev("\r\n#v1092030# #v1092008# #v1032009# #v2022141# #v2022139# #v1032035# #v1002508# #v1302058# #v1302028# #v1002418# #v1032010# #v1122003# #v2022176# #v2022245# #v1402014# #v3010068# #v3010093# #v3010044# #v1442020# #v2043803# #v1122000#");
		} else if (status == 3) {
			cm.sendPrev("希望大家踊跃参加本次活动。\r\n\r\n另11月26日起装备全部6折销售！欢迎选购！QQ:7851103");
		} else if (status == 4) {
			cm.dispose();
		}
	}
}