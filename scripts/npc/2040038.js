
/*
	Yellow Balloon - LudiPQ 3rd stage NPC
*/

var status = -1;
var exp = 2940;
			
function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage3status = eim.getProperty("stage3status");

    if (stage3status == null) {
	if (cm.isLeader()) { // Leader
	    var stage3leader = eim.getProperty("stage3leader");
	    if (stage3leader == "done") {

		if (cm.haveItem(4001022, 32)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵����׶Ρ�������ڣ�����4�׶Ρ�");
		    cm.removeAll(4001022);
		    clear(3,eim,cm);
		    cm.givePartyExp(exp, eim.getPlayers());
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r32�� #t4001022##k����");
		}
	    } else {
		cm.sendOk("��ӭ���������׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage3leader","done");
	    }
	} else { // Members
	    cm.sendNext("��ӭ���������׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵����׶Ρ�������ڣ�����4�׶Ρ�");
    }
    cm.safeDispose();
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}