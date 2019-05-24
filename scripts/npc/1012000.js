/* Author: Xterminator
	NPC Name: 		Regular Cab
	Map(s): 		Victoria Road : Henesys (100000000)
	Description: 		Henesys Cab
*/

var status = 0;
var maps = Array(104000000, 102000000, 101000000, 103000000, 120000000);
var rCost = Array(1200, 1000, 800, 1000, 1000);
var costBeginner = Array(120, 100, 80, 100, 100);
var cost = new Array("1,200", "1,000", "800", "1,000", "1,000");
var show;
var sCost;
var selectedMap = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 1 && mode == 0) {
	cm.dispose();
	return;
    } else if (status >= 2 && mode == 0) {
	cm.sendNext("���ﻹ�кܶ�ط����Թ䡣������Ҫȥ��ͬ�ĳ����ʱ�򣬻�ӭ��ʱ�����Ұɡ�");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendNext("����~! ���ִ�Ƴ̳�. ��Ҫ��������ׯ��ȫ�ֿ��ٵ��ƶ���? ��������� Ϊ�����ȿ�������˿�, ��ʹ�� #b#p1012000##k ���е����㵽��Ҫ����ĵط���");
    } else if (status == 1) {
	var job = cm.getJob();
	if (job == 0 || job == 1000 || job == 2000) {
	    var selStr = "����������90%�ۿۣ���������ѡ�����Ŀ�ĵ�#b";
	    for (var i = 0; i < maps.length; i++) {
		selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + costBeginner[i] + " ���)#l";
	    }
	} else {
	    var selStr = "��ѡ��Ŀ�ĵ�.#b";
	    for (var i = 0; i < maps.length; i++) {
		selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + cost[i] + " ���)#l";
	    }
	}
	cm.sendSimple(selStr);
    } else if (status == 2) {
	var job = cm.getJob();
	if (job == 0 || job == 1000 || job == 2000) {
	    sCost = costBeginner[selection];
	    show = costBeginner[selection];
	} else {
	    sCost = rCost[selection];
	    show = cost[selection];
	}
	cm.sendYesNo("��������û���κ����������ǰ�? #b#m" + maps[selection] + "##k ����������� #b" + show + " ���#k.");
	selectedMap = selection;
    } else if (status == 3) {
	if (cm.getMeso() < sCost) {
	    cm.sendNext("�ܱ�Ǹ������û���㹻�Ľ�� �����㽫�޷��������⳵!");
	} else {
	    cm.gainMeso(-sCost);
	    cm.warp(maps[selectedMap]);
	}
	cm.dispose();
    }
}