/*
	Encrypted Slate of the Squad - Leafre Cave of life
*/

var status = -1;
var minLevel = 80; // 35
var maxLevel = 200; // 65

var minPartySize = 1;
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

//    if (cm.getMapId() == 240050400) {
    if (status == 0) {
	if (cm.getParty() == null) { // No Party
	    cm.sendOk("�ܱ�Ǹ�������û����ӡ�����");
	} else if (!cm.isLeader()) { // Not Party Leader
	    cm.sendOk("������볢������������� #b�ӳ�#k ������˵����#b");
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
		var em = cm.getEventManager("HontalePQ");
		if (em == null) {
		    cm.sendSimple("�Ҳ����ű�������ϵGM����#b");
		} else {
		    var prop = em.getProperty("state");
		    if (prop.equals("0") || prop == null) {
			em.startInstance(cm.getParty(), cm.getMap());
			cm.removeAll(4001022);
			cm.removeAll(4001023);
			cm.dispose();
			return;
		    } else {
			cm.sendSimple("#b(һ��ʯ��������д�ſ����������֡�����)#b");
			cm.dispose();
		    }
		}
	    } else {
		cm.sendOk("�ܱ�Ǹ�������Ӻ���û�з�������:\r\n\r\n#r����: " + minPartySize + " ��Ҫ�������ҵȼ��������� " + minLevel + " �� " + maxLevel + ".#b");
		cm.dispose();
	    }
	}
	} else {
	if (cm.getMapId() == 240050300) {
        if (cm.isLeader() && cm.haveItem(4001093, 6)) {
             cm.showEffect(true, "quest/party/clear");
             cm.playSound(true, "Party1/Clear");
             cm.gainItem(4001093, -6);
             cm.warpParty(240050400);
			} else {
             cm.sendOk("�����Ķӳ�����6����ɫԿ��������");
			 cm.dispose();
              }
        }
        }
}