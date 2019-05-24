/*
	Red Sign - 101st Floor Eos Tower (221024500)
*/

var status = -1;
var minLevel = 35; // 35
var maxLevel = 200; // 65

var minPartySize = 5;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	    return;
	}
	status--;
    }

    if (status == 0) {
	cm.removeAll(4001022);
	cm.removeAll(4001023);
	if (cm.getParty() == null) { // No Party
	    cm.sendSimple("��ò��û�дﵽҪ��...:\r\n\r\n#rҪ��: " + minPartySize + " ��ҳ�Ա, ÿ���˵ĵȼ������� " + minLevel + " �� �ȼ� " + maxLevel + ".#b\r\n#L0#��Ҫ�һ����Ѻ۵��۾�#l");
	} else if (!cm.isLeader()) { // Not Party Leader
	    cm.sendSimple("��������������� #b�ӳ�#k ����̸.#b\r\n#L0#��Ҫ�һ����Ѻ۵��۾�#l");
	} else {
	    // Check if all party members are within PQ levels
	    var party = cm.getParty().getMembers();
	    var mapId = cm.getMapId();
	    var next = true;
	    var levelValid = 0;
	    var inMap = 0;
	    var it = party.iterator();

	    while (it.hasNext()) {
		var cPlayer = it.next();
		if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
		    levelValid += 1;
		} else {
		    next = false;
		}
		if (cPlayer.getMapid() == mapId) {
		    inMap += (cPlayer.getJobId() == 900 ? 6 : 1);
		}
	    }
	    if (party.size() > maxPartySize || inMap < minPartySize) {
		next = false;
	    }
	    if (next) {
		var em = cm.getEventManager("LudiPQ");
		if (em == null) {
		    cm.sendSimple("�Ҳ����ű�������GM#b\r\n#L0#��Ҫ�һ����Ѻ۵��۾�#l");
		} else {
		    var prop = em.getProperty("state");
		    if (prop.equals("0") || prop == null) {
			em.startInstance(cm.getParty(), cm.getMap());
			cm.removeAll(4001022);
			cm.removeAll(4001023);
			cm.dispose();
			return;
		    } else {
			cm.sendSimple("���������Ѿ��������� #r���������#k �볢�Ի�Ƶ�����ߵ�����������ɡ�#b\r\n#L0#��Ҫ�һ����Ѻ۵��۾�#l");
		    }
		}
	    } else {
		cm.sendSimple("��Ķ���ò��û�дﵽҪ��...:\r\n\r\n#rҪ��: " + minPartySize + " ��ҳ�Ա, ÿ���˵ĵȼ������� " + minLevel + " �� �ȼ� " + maxLevel + ".#b\r\n#L0#��Ҫ�һ����Ѻ۵��۾�#l");
	    }
	}
    } else { //broken glass
	var cmp = cm.getPlayer().getOneInfo(1202, "cmp");
	if (cm.haveItem(1022073,1)) {
	    cm.sendOk("�����ˡ�");
	} else if (!cm.canHold(1022073,1)) {
	    cm.sendOk("��ճ�һЩװ�����ռ䡣");
	} else if (cmp != null && parseInt(cmp) >= 35) {
	    if (cm.getPlayer().getOneInfo(1202, "have") == null || cm.getPlayer().getOneInfo(1202, "have").equals("0")) {
	    	cm.gainItem(1022073, 1, true); //should handle automatically for "have"
	    } else {
		cm.sendOk("���Ѿ���#t1022073#��.");
	    }
	} else {
	    cm.sendOk("�㻹û����35��PQ Ŀǰ����: " + (cmp == null ? "0" : cmp) + "��");
	}
	cm.dispose();

    }
}
