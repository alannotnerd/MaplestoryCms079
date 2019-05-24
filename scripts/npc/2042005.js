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
        var selStr = "��ӭ,����������껪!\r\n#L100# ��Ҷ��Ҷһ�#l";
        var found = false;
        for (var i = 0; i < 3; i++) {
            if (getCPQField(i + 1) != "") {
                selStr += "\r\n#b#L" + i + "# " + getCPQField(i + 1) + "#l#k";
                found = true;
            }
        }
        if (cm.getParty() == null) {
            cm.sendSimple("��ӭ,����������껪!\r\n#L100# ��Ҷ��Ҷһ�.#l");
        } else {
            if (cm.isLeader()) {
                if (found) {
                    cm.sendSimple(selStr);
                } else {
                    cm.sendSimple("Ŀǰ�ȴ�����.\r\n#L100# ��Ҷ��Ҷһ�.#l");
                }
            } else {
                cm.sendSimple("����Ӷӳ����ҶԻ�.\r\n#L100# ��Ҷ��Ҷһ�.#l");
            }
        }
    } else if (status == 1) {
        if (selection == 100) {
            cm.sendSimple("#b#L0#50 Maple Coin = Spiegelmann Necklace#l\r\n#L1#30 Maple Coin = Spiegelmann Marble#l\r\n#L2#50 Sparkling Maple Coin = Spiegelmann Necklace of Chaos#l#k");
        } else if (selection >= 0 && selection < 3) {
            var mapid = 980030000 + ((selection + 1) * 1000);
            if (cm.getEventManager("cpq2").getInstance("cpq2" + mapid) == null) {
                if ((cm.getParty() != null && 1 <= cm.getParty().getMembers().size() && cm.getParty().getMembers().size() < (selection == 1 ? 4 : 3))) { //|| cm.getPlayer().isGM()
                    if (checkLevelsAndMap(50, 255) == 1) {
                        cm.sendOk("�����Ķ�Ա����һ��ˮƽ�ȼ��׶η�Χ.");
                        cm.dispose();
                    } else if (checkLevelsAndMap(50, 255) == 2) {
                        cm.sendOk("��Ķ�Ա������ͬһ����ͼ.");
                        cm.dispose();
                    } else {
            		cm.sendOk("#b���뷿��ɹ�.#r��رմ���#b.\r\n����Է��޷�����.#r��ս���뺯#b...");
                        cm.getEventManager("cpq2").startInstance("" + mapid, cm.getPlayer());
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("������ս�����������������ƥ��.");
                    cm.dispose();
                }
            } else if (cm.getParty() != null && cm.getEventManager("cpq2").getInstance("cpq2" + mapid).getPlayerCount() == cm.getParty().getMembers().size()) {
                if (checkLevelsAndMap(50, 255) == 1) {
                    cm.sendOk("�����Ķ�Ա����һ��ˮƽ�ȼ��׶η�Χ.");
                    cm.dispose();
                } else if (checkLevelsAndMap(50, 255) == 2) {
                    cm.sendOk("��Ķ�Ա������ͬһ����ͼ.");
                    cm.dispose();
                } else {
                    //Send challenge packet here
                    var owner = cm.getChannelServer().getPlayerStorage().getCharacterByName(cm.getEventManager("cpq2").getInstance("cpq2" + mapid).getPlayers().get(0).getParty().getLeader().getName());
                    owner.addCarnivalRequest(cm.getCarnivalChallenge(cm.getChar()));
                    if (owner.getConversation() != 1) {
		    cm.dispose();
                    cm.openNpc(owner.getClient(), 2042006);
                    }
                    cm.dispose();
                    cm.sendOk("�����ս���뺯�Ѿ����͸��Է�...��ȴ��ظ�.");
                }
            } else {
                cm.sendOk("˫���μӹ�����껪�����Ķ�Ա��������һ��.");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    } else if (status == 2) {
        if (selection == 0) {
            if (!cm.haveItem(4001129, 50)) {
                cm.sendOk("You have no items.");
            } else if (!cm.canHold(1122007, 1)) {
                cm.sendOk("Please make room");
            } else {
                cm.gainItem(1122007, 1);
                cm.gainItem(4001129, -50);
            }
            cm.dispose();
        } else if (selection == 1) {
            if (!cm.haveItem(4001129, 30)) {
                cm.sendOk("You have no items.");
            } else if (!cm.canHold(2041211, 1)) {
                cm.sendOk("Please make room");
            } else {
                cm.gainItem(2041211, 1);
                cm.gainItem(4001129, -30);
            }
            cm.dispose();
        } else if (selection == 2) {
            if (!cm.haveItem(4001254, 50)) {
                cm.sendOk("You have no items.");
            } else if (!cm.canHold(1122058, 1)) {
                cm.sendOk("Please make room");
            } else {
                cm.gainItem(1122058, 1);
                cm.gainItem(4001254, -50);
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
    var event1 = cm.getEventManager("cpq2");
    if (event1 != null) {
        var event = event1.getInstance("cpq2" + (980030000 + (fieldnumber * 1000)));
        if (event == null && fieldnumber < 1) {
            status = "�񻶽ڵ�ͼ " + fieldnumber + "(2v2)";
        } else if (event == null) {
            status = "�񻶽ڵ�ͼ " + fieldnumber + "(3v3)";
        } else if (event != null && (event.getProperty("started").equals("false"))) {
            var averagelevel = 0;
            for (i = 0; i < event.getPlayerCount(); i++) {
                averagelevel += event.getPlayers().get(i).getLevel();
            }
            averagelevel /= event.getPlayerCount();
            status = "�ӳ�: #r" + event.getPlayers().get(0).getParty().getLeader().getName() + "#b/ ��Ա����: #r" + event.getPlayerCount() + " #b/ ƽ���ȼ� #r" + averagelevel;
        }
    }
    return status;
}