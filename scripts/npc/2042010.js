/*
怪物嘉年华
 */
var status = -1;
var select = -1;
function start() {
	cm.sendSimple("#e<竞争内容 : 怪物嘉年华>#n\r\n觉得技痒的冒险家可以试试参加怪物嘉年华。\r\n\r\n#b#L0#我想要参加怪物嘉年华。\r\n#L1#我想了解下怪物嘉年华。\r\n#L2#我想用闪光的冒险岛硬币交换其他道具。");
}
function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status < 1) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		if (select == -1)
			select = selection;
		if (select == 0) {
			cm.sendOk("怪物嘉年华已经暂时关门了。你去找点其他的娱乐项目吧!嘿嘿。");
		} else if (select == 1) {
			cm.sendNext("#b怪物嘉年#k是和其他人自动分配组队进行的活动，比比谁能在更短的时间内抓到更多的怪物，在更短的时间内抓住更多怪物的人将获得高分。和其他人组成一组，召唤出怪物，使用技能抓住怪物就行了。");
		} else if (select == 2) {
			cm.sendOk("什么？一个#t4001254#都没有啊？想要得到#i1012373:# #t1012373#或者#i1102556:# #t1102556#，#i1122248:# #t1122248#的话，请搜集#b#i4001254# #t4001254##k。");
		}
	} else if (status == 1) {
		if (select == 0) {
			cm.dispose();
		} else if (select == 1) {
			cm.sendNextPrev("你问一个人可以参加吗？呵呵呵，不用担心那个。我会帮你找到合适的人一起参加的。你现在只要说你愿意参加就行。找到人之后，我会通知你的。\r\n - #e等级#n : 110以上 ~ 130以下\r\n - #e获得道具#n : \r\n#i1012373:# #t1012373#\r\n#i1102556:# #t1102556#\r\n#i1122248:# #t1122248#");
		} else if (select == 2) {
			cm.dispose();
		}
	} else if (status == 2) {
		if (select == 1) {
			cm.dispose();
		}
	}
}