/**
	Orange Balloon - LudiPQ 2nd stage NPC
**/

var status;
var exp = 2520;
			
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    var stage2status = eim.getProperty("stage2status");
    
    if (stage2status == null) {
	if (cm.isLeader()) { // Leader
	    var stage2leader = eim.getProperty("stage2leader");
	    if (stage2leader == "done") {

		if (cm.haveItem(4001022, 15)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵ڶ��׶Ρ�������ڣ��������׶Ρ�");
		    cm.removeAll(4001022);
		    clear(2, eim, cm);
		    cm.givePartyExp(2520);
		    cm.dispose();
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r15�� #t4001022##k����");
		}
		cm.dispose();
	    } else {
		cm.sendOk("��ӭ�����ڶ��׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage2leader","done");
		cm.dispose();
	    }
	} else { // Members
	    cm.sendNext("��ӭ�����ڶ��׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	    cm.dispose();
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵ڶ��׶Ρ�������ڣ��������׶Ρ�");
	cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}