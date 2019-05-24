/*
	Lime Balloon - LudiPQ 4th stage NPC
*/

var exp = 3360;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage4status = eim.getProperty("stage4status");

    if (stage4status == null) {
	if (cm.isLeader()) { // Leader
	    var stage4leader = eim.getProperty("stage4leader");
	    if (stage4leader == "done") {

		if (cm.haveItem(4001022,6)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵��Ľ׶Ρ�������ڣ�����5�׶Ρ�");
		    cm.removeAll(4001022);
		    clear(4,eim,cm);
		    cm.givePartyExp(exp);
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r6�� #t4001022##k����");
		}
		cm.safeDispose();
	    } else {
		cm.sendOk("��ӭ�������Ľ׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage4leader","done");
		cm.safeDispose();
	    }
	} else { // Members
	    cm.sendNext("��ӭ�������Ľ׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	    cm.safeDispose();
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵��Ľ׶Ρ�������ڣ�����5�׶Ρ�");
	cm.safeDispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}