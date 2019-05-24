/*
	Green Balloon - LudiPQ 5th stage NPC
**/

var exp = 3770;

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    
    var stage5status = eim != null ?  eim.getProperty("stage5status") : null;

    if (stage5status == null ) {
	if (cm.isLeader()) { // Leader
	    var stage5leader = eim.getProperty("stage5leader");
	    if (stage5leader == "done") {

		if (cm.haveItem(4001022,24)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵���׶Ρ�������ڣ�����6�׶Ρ�");
		    cm.removeAll(4001022);
		    clear(5,eim,cm);
		    cm.givePartyExp(exp, eim.getPlayers());
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r24�� #t4001022##k����");
		}
		cm.safeDispose();
	    } else {
		cm.sendOk("��ӭ��������׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage5leader","done");
		cm.safeDispose();
	    }
	} else { // Members
	    cm.sendNext("��ӭ��������׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	    cm.safeDispose();
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵���׶Ρ�������ڣ�����6�׶Ρ�");
	cm.safeDispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}
