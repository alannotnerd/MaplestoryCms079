/*
	NPC Name: 		Regular Cab at Lith Habour
	Map(s): 		Victoria Road : Lith Habour (104000000)
	Description: 		Lith Habour
*/
var status = 0;
var maps = Array(120000000, 102000000, 100000000, 103000000, 101000000);
var rCost = Array(1200, 1000, 1000, 1200, 1200);
var costBeginner = Array(120, 100, 100, 120, 120);
var cost = new Array("1,200", "1,000", "1,000", "1,200", "1,200");
var show;
var sCost;
var selectedMap = -1;


function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status >= 2) {
	    cm.sendNext("�кܶ࿴������������ˡ����������ǣ�������Ҫȥ��ͬ����.");
	    cm.safeDispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("����~! ά�����ǸۼƳ̳�. ��Ҫ��������ׯ��ȫ�ֿ��ٵ��ƶ���? ��������� Ϊ�����ȿ�������˿�, ��ʹ�� #bά�����ǸۼƳ̳�#k �ر����! ���е����㵽��Ҫ����ĵط�");
    } else if (status == 1) {
	if (!cm.haveItem(4032313)) {
	    var job = cm.getJob();
	    if (job == 0 || job == 1000 || job == 2000) {
		var selStr = "����������90%�ۿۣ���������ѡ�����Ŀ�ĵ�#b \n\r��ѡ��Ŀ�ĵ�.#b";
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
	} else {
	    cm.sendNextPrev("��!����������һ���Ż�Ʊ�ҿ�����Ѵ������ȥ#b�����ִ�#k��");
	}
    } else if (status == 2) {
	if (!cm.haveItem(4032313)) {
	    var job = cm.getJob();
	    if (job == 0 || job == 1000 || job == 2000) {
		sCost = costBeginner[selection];
		show = costBeginner[selection];
	    } else {
		sCost = rCost[selection];
		show = cost[selection];
	    }
	    cm.sendYesNo("��������û���κζ��������ǰ�? #b#m" + maps[selection] + "##k ����������� #b"+ show + " ���#k.");
	    selectedMap = selection;
	} else {
	    cm.gainItem(4032313, -1);
	    cm.warp(100000000, 6);
	    cm.dispose();
	}
    } else if (status == 3) {
	if (cm.getMeso() < sCost) {
	    cm.sendNext("�ܱ�Ǹ������û���㹻�ķ�� �����㽫�޷��������⳵!");
	    cm.safeDispose();
	} else {
	    cm.gainMeso(-sCost);
	    cm.warp(maps[selectedMap]);
	    cm.dispose();
	}
    }
}