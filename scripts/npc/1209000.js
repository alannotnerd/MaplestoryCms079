/*
	NPC: Athena Pierce
 	Map: Black Road - Ready to Leave (914000100)
 	Description: First NPC you talk to as Aran
 */
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
			cm.sendNext("现在才醒？战神！伤口还好吧？……什么？现在的状况？");
		} else if (status == 1) {
			cm.sendNextPrev("避难准备都做好了，所有人都上了方舟。避难船飞行的时候就只有听天由命了，没啥可担心的。准备的差不多了就该向金银岛出发了。");
		} else if (status == 2) {
			cm.sendNextPrev("战神的同伴们？它们……已经去找黑魔法师了。在我们避难的时候他们打算阻止黑魔法师的进攻……什么？你也要去找黑魔法师？不行！你伤的太重，跟我们一起吧！");
		} else if (status == 3) {
			cm.updateQuest(21002, "1");
			cm.showWZEffect("Effect/Direction1.img/aranTutorial/Trio", -1);
			cm.dispose();
		}
	}
}