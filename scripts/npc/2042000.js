var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
    }
    if (status == 0 && mode == 1) {
        var selStr = "��Ҫ�μӹ�����껪��?\r\n#L100#��Ҫ������������.#l";
        var found = false;
        for (var i = 0; i < 6; i++) {
            if (getCPQField(i + 1) != "") {
                selStr += "\r\n#b#L" + i + "# " + getCPQField(i + 1) + "#l#k";
                found = true;
            }
        }
        if (cm.getParty() == null) {
            cm.sendSimple("��û����ӵ������.�ҿ���Ϊ���ṩ���߽����������μӶԿ����뿪����飬Ϊ����ʾ�Կ���ͼ���ͽ��棡�������2v2.\r\n#L100#��Ҫ������������.#l");
        } else {
            if (cm.isLeader()) {
                if (found) {
                    cm.sendSimple(selStr);
                } else {
                    cm.sendSimple("�����з���:\r\n#L100#��Ҫ������������.#l");
                }
            } else {
                cm.sendSimple("������Ķӳ�����˵��.\r\n#L100#��Ҫ������������.#l");
            }
        }
    } else if (status == 1) {
        if (selection == 100) {
            cm.sendSimple("#b�����ǿɶһ��Ľ�����\r\n#L2##v4001129#x10 �һ� #v1122058#��������ȫ����+1 ��/ħ+1#l\r\n#L3##v4001129#x10 �һ� #v1122162#������Lv60.ȫ����+5#l\r\n#L4##v4001129#x30 �һ� #v1122248#�������Lv120.ȫ����+10.��/ħ+1#l\r\n#L5##v4001129#x50 �һ� #v1012270#�ݱ˵����ĺ��� ��/ħ+5#l\r\n#L6##v4001129#x100 �һ� #v2340000#ף������.\r\n\r\n");
		}else if (selection == 101){
                        cm.sendOk("���껪ֵ��"+cm.getPlayer().getConversation());
                    cm.dispose();
        } else if (selection >= 0 && selection < 9) {
            var mapid = 980000000 + ((selection + 1) * 100);
            if (cm.getEventManager("cpq").getInstance("cpq" + mapid) == null) {
				if(cm.getParty() == null || cm.getParty().getMembers().size() < 2){
                    cm.sendOk("����������������Ҫ��");
                        cm.dispose();
				}else if ((cm.getParty() != null && 2 <= cm.getParty().getMembers().size() && cm.getParty().getMembers().size() < (selection == 4 || selection == 5 || selection == 8 ? 4 : 3))) {
                    if (checkLevelsAndMap(30, 255) == 1 && (mapid >= 980000100 && mapid <= 980000400 && cm.getParty().getMembers().size() != 2) || (mapid >= 980000500 && mapid <= 980000600 && cm.getParty().getMembers().size() != 3)) {
                        cm.sendOk("����еĳ�Ա�ȼ������ϡ�");
                        cm.dispose();
                    } else if (checkLevelsAndMap(30, 255) == 2) {
                        cm.sendOk("����У���������ɫû���ٴ˵�ͼ��");
                        cm.dispose();
                    } else {
                        cm.getEventManager("cpq").startInstance("" + mapid, cm.getPlayer());
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("����������������Ҫ��");
                }
            } else if (cm.getParty() != null && cm.getEventManager("cpq").getInstance("cpq" + mapid).getPlayerCount() == cm.getParty().getMembers().size()) {
                if (checkLevelsAndMap(30, 255) == 1 && (mapid >= 980000100 && mapid <= 980000400 && cm.getParty().getMembers().size() != 2) || (mapid >= 980000500 && mapid <= 980000600 && cm.getParty().getMembers().size() != 3)) {
                    cm.sendOk("����еĳ�Ա�ȼ������ϡ�");
                    cm.dispose();
                } else if (checkLevelsAndMap(30, 255) == 2) {
                    cm.sendOk("����У���������ɫû���ٴ˵�ͼ��");
                    cm.dispose();
                } else {
                    //Send challenge packet here
                    var owner = cm.getChannelServer().getPlayerStorage().getCharacterByName(cm.getEventManager("cpq").getInstance("cpq" + mapid).getPlayers().get(0).getParty().getLeader().getName());
                    owner.addCarnivalRequest(cm.getCarnivalChallenge(cm.getChar()));
                    //if (owner.getConversation() != 1) {
                    cm.openNpc(owner.getClient(), 2042001);
                    //}
                    cm.sendOk("�����ս�Ѿ����͡�");
                    cm.dispose();
                }
            } else {
                cm.sendOk("��֧����������񻶽ڱ�������ͬ�����Ķ�Ա");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    } else if (status == 2) {
        if (selection == 0) {
            if (!cm.haveItem(4001129, 5)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(1122007, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(1122007, 1);
                cm.gainItem(4001129, -5);
            }
            cm.dispose();
        } else if (selection == 1) {
            if (!cm.haveItem(4001129, 5)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(2041211, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(2041211, 1);
                cm.gainItem(4001129, -5);
            }
            cm.dispose();
        } else if (selection == 2) {
            if (!cm.haveItem(4001129, 10)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(1122058, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(1122058, 1);
                cm.gainItem(4001129, -10);
            }
            cm.dispose();
        } else if (selection == 3) {
            if (!cm.haveItem(4001129, 10)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(1122162, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(1122162, 1);
                cm.gainItem(4001129, -10);
            }
            cm.dispose();
        } else if (selection == 4) {
            if (!cm.haveItem(4001129, 30)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(1122248, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(4001129, -30);
                cm.gainItem(1122248, 1);
            }
            cm.dispose();
        } else if (selection == 5) {
            if (!cm.haveItem(4001129, 50)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(1012270, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(4001129, -50);
                cm.gainItem(1012270, 1);
            }
            cm.dispose();
        } else if (selection == 6) {
            if (!cm.haveItem(4001129, 100)) {
                cm.sendOk("���ĵ��߲���.");
            } else if (!cm.canHold(2340000, 1)) {
                cm.sendOk("���İ����ռ䲻��.");
            } else {
                cm.gainItem(4001129, -100);
                cm.gainItem(2340000, 1);
            }
            cm.dispose();
        }
    }
}

function checkLevelsAndMap(lowestlevel, highestlevel) {
    var party = cm.getParty().getMembers();
    var mapId = cm.getMapId();
    var valid = 0;
    var inMap = 0;

    var it = party.iterator();
    while (it.hasNext()) {
        var cPlayer = it.next();
        if (! (cPlayer.getLevel() >= lowestlevel && cPlayer.getLevel() <= highestlevel) && cPlayer.getJobId() != 900) {
            valid = 1;
        }
        if (cPlayer.getMapid() != mapId) {
            valid = 2;
        }
    }
    return valid;
}

function getCPQField(fieldnumber) {
    var status = "";
    var event1 = cm.getEventManager("cpq");
    if (event1 != null) {
        var event = event1.getInstance("cpq" + (980000000 + (fieldnumber * 100)));
        if (event == null && fieldnumber != 5 && fieldnumber != 6 && fieldnumber != 9) {
            status = "������껪 " + fieldnumber + "(2v2)";
        } else if (event == null&& fieldnumber != 7 && fieldnumber != 8 && fieldnumber != 9) {
            status = "������껪 " + fieldnumber + "(3v3)";
        } else if (event != null && (event.getProperty("started").equals("false"))) {
            var averagelevel = 0;
            for (i = 0; i < event.getPlayerCount(); i++) {
                averagelevel += event.getPlayers().get(i).getLevel();
            }
            averagelevel /= event.getPlayerCount();
            status = event.getPlayers().get(0).getParty().getLeader().getName() + "/" + event.getPlayerCount() + "users/Avg. Level " + averagelevel;
        }
    }
    return status;
}