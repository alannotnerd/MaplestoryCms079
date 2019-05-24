/*
	Sky-Blue Balloon - LudiPQ 7th stage NPC
**/

var status;
var exp = 4620;
			
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage7status = eim.getProperty("stage7status");

    if (stage7status == null) {
	if (cm.isLeader()) { // Leader
	    var stage7leader = eim.getProperty("stage7leader");
	    if (stage7leader == "done") {

		if (cm.haveItem(4001022,3)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵��߽׶Ρ�������ڣ�����8�׶Ρ�");
		    cm.removeAll(4001022);
		    clear(7, eim, cm);
		    cm.givePartyExp(exp, eim.getPlayers());
		    cm.dispose();
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r3�� #t4001022##k����");
		}
		cm.dispose();
	    } else {
		cm.sendOk("��ӭ�������߽׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage7leader","done");
		cm.dispose();
	    }
	} else { // Members
	    cm.sendNext("��ӭ�������߽׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	    cm.dispose();
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵��߽׶Ρ�������ڣ�����8�׶Ρ�");
	cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}