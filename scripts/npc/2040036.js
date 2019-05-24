/*
	Red Balloon - LudiPQ 1st stage NPC
**/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

	if( cm == null )
		return;
	
    var eim = cm.getEventInstance();

    if(eim == null)
    	return;

    var stage1status = eim.getProperty("stage1status");

    if (stage1status == null) {
	if (cm.isLeader()) { // Leader
	    var stage1leader = eim.getProperty("stage1leader");
	    if (stage1leader == "done") {

		if (cm.haveItem(4001022, 25)) { // Clear stage
		    cm.sendNext("��ϲ�����Ѿ�ͨ���˵�һ�׶Ρ�������ڣ����˵ڶ��׶Ρ�");
		    cm.removeAll(4001022);
		    clear(1, eim, cm);
		    cm.givePartyExp(2100, eim.getPlayers());
		    cm.dispose();
		} else { // Not done yet
		    cm.sendNext("��ȷ�������ռ��� #r25�� #t4001022##k����");
		}
		cm.dispose();
	    } else {
		cm.sendOk("��ӭ������һ�׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k �����Ҽ����������");
		eim.setProperty("stage1leader","done");
		cm.dispose();
	    }
	} else { // Members
	    cm.sendNext("��ӭ������һ�׶Ρ�#b����֮��PQ#k ���ռ�#r#t4001022##k ����Ķӳ���Ȼ��жӳ������Ҽ����������");
	    cm.dispose();
	}
    } else {
	cm.sendNext("��ϲ�����Ѿ�ͨ���˵�һ�׶Ρ�������ڣ����˵ڶ��׶Ρ�");
	cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty("stage" + stage.toString() + "status","clear");
    
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");
}