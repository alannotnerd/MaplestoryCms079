var status = -1;
var maxHorntail = 4;

function start() {
    if (cm.getPlayer().getLevel() < 80) {
        cm.sendOk("��ĵȼ�С��80����������ս����������");
        cm.dispose();
        return;
    }
   /* if (cm.getPlayer().getClient().getChannel() != 4 && cm.getPlayer().getClient().getChannel() != 2) {
        cm.sendOk("��������ֻ����2��4Ƶ���ٻ���");
        cm.dispose();
        return;
    }*/
    var em = cm.getEventManager("HorntailBattle");
    if (em == null) {
        cm.sendOk("�ű�����,����ϵ����Ա.");
        cm.dispose();
        return;
    }
    var prop = em.getProperty("state");
    var data = cm.getBossLog("��ͨ����");
    if (prop == null || prop.equals("0")) {
        var squadAvailability = cm.getSquadAvailability("Horntail");
        if (squadAvailability == -1) {
            status = 0;
            /*if (data >= maxHorntail && !cm.getPlayer().isGM()) {
                cm.sendOk("��������ս���������Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }*/
            cm.sendYesNo("��Ҫ��Ϊ��������Զ���Ӷӳ���?");
        } else if (squadAvailability == 1) {
            /*if (data >= maxHorntail && !cm.getPlayer().isGM()) {
                cm.sendOk("��������ս���������Ĵ����Ѿ����꣬������������ս�ɣ�");
                cm.dispose();
                return;
            }*/
            // -1 = Cancelled, 0 = not, 1 = true
            var type = cm.isSquadLeader("Horntail");
            if (type == -1) {
                cm.sendOk("�Ѿ����������롣");
                cm.dispose();
            } else if (type == 0) {
                var memberType = cm.isSquadMember("Horntail");
                if (memberType == 2) {
                    cm.sendOk("���Ѿ���Զ�����Ʋ�С��.���ܽ���Զ������.");
                    cm.dispose();
                } else if (memberType == 1) {
                    status = 5;
                    cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#����Զ����#l \r\n#b#L2#�˳�Զ����#l");
                } else if (memberType == -1) {
                    cm.sendOk("5���ӽ���Զ�����Ѿ��Զ�ע��.������ע��");
                    cm.dispose();
                } else {
                    status = 5;
                    cm.sendSimple("������ʲô? \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#����Զ����#l \r\n#b#L2#�˳�Զ����#l");
                }
            } else { // Is leader
                status = 10;
                cm.sendSimple("Զ���Ӳ���: \r\n#b#L0#�鿴Զ���ӳ�Ա#l \r\n#b#L1#���Զ���ӳ�Ա#l \r\n#b#L2#�鿴��������#l \r\n#r#L3#��ʼԶ������#l");
                // TODO viewing!
            }
        } else {
            var eim = cm.getDisconnected("HorntailBattle");
            if (eim == null) {
                var squd = cm.getSquad("Horntail");
                if (squd != null) {
                    /*if (data >= maxHorntail && !cm.getPlayer().isGM()) {
                        cm.sendOk("��������ս���������Ĵ����Ѿ����꣬������������ս�ɣ�");
                        cm.dispose();
                        return;
                    }*/
                    cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ.\r\n" + squd.getNextPlayer());
                    status = 3;
                } else {
                    cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ.");
                    cm.safeDispose();
                }
            } else {
                cm.sendYesNo("��Ҫ��������Զ��������");
                status = 1;
            }
        }
    } else {
        var eim = cm.getDisconnected("HorntailBattle");
        if (eim == null) {
            var squd = cm.getSquad("Horntail");
            if (squd != null) {
               /* if (data >= maxHorntail && !cm.getPlayer().isGM()) {
                    cm.sendOk("��������ս���������Ĵ����Ѿ����꣬������������ս�ɣ�");
                    cm.dispose();
                    return;
                }*/
                cm.sendYesNo("Զ���ӵ���ս�Ѿ���ʼ.\r\n" + squd.getNextPlayer());
                status = 3;
            } else {
                cm.sendOk("Զ���ӵ���ս�Ѿ���ʼ.");
                cm.safeDispose();
            }
        } else {
            cm.sendYesNo("��Ҫ��������Զ��������");
            status = 1;
        }
    }
}

function action(mode, type, selection) {
    switch (status) {
    case 0:
        if (mode == 1) {
            if (cm.registerSquad("Horntail", 5, " �ѱ�����Ϊ��������Զ���Ӷӳ�����ͨ�������λ��ս����5�����ڱ���.")) {
                cm.sendOk("���Ѿ�������Ϊ��������Զ���Ӷӳ����ڽ�������5�����ڣ����������Զ���ӳ�Ա.�뾡��Ӻö�Ա.����5���Ӻ󽫻�ȡ��Զ���Ӷӳ�.");
            } else {
                cm.sendOk("�����������Զ���ӵĻ�����ô�������Ұɡ�");
            }
        }
        cm.dispose();
        break;
    case 1:
        if (!cm.reAdd("HorntailBattle", "Horntail")) {
            cm.sendOk("����δ֪�Ĵ��󣬲���ʧ�ܡ�");
        }
        cm.safeDispose();
        break;
    case 3:
        if (mode == 1) {
            var squd = cm.getSquad("Horntail");
            if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
                squd.setNextPlayer(cm.getPlayer().getName());
                cm.sendOk("�����Ѿ���Զ�����ڽ���������...");
            }
        }
        cm.dispose();
        break;
    case 5:
        if (selection == 0) {
            if (!cm.getSquadList("Horntail", 0)) {
                cm.sendOk("����δ֪�Ĵ��󣬲���ʧ�ܡ�");
            }
        } else if (selection == 1) { // join
            var ba = cm.addMember("Horntail", true);
            if (ba == 2) {
                cm.sendOk("Զ����Ա�Ѿ��ﵽ30�������Ժ����ԡ�");
            } else if (ba == 1) {
                cm.sendOk("�������Զ����.");
            } else {
                cm.sendOk("���Ѿ���Զ���ӳ�Ա��.");
            }
        } else { // withdraw
            var baa = cm.addMember("Horntail", false);
            if (baa == 1) {
                cm.sendOk("��ɹ��˳���Զ����.");
            } else {
                cm.sendOk("�㻹����Զ���ӳ�Ա.�����˳�Զ����.");
            }
        }
        cm.dispose();
        break;
    case 10:
        if (mode == 1) {
            if (selection == 0) {
                if (!cm.getSquadList("Horntail", 0)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            } else if (selection == 1) {
                status = 11;
                if (!cm.getSquadList("Horntail", 1)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 2) {
                status = 12;
                if (!cm.getSquadList("Horntail", 2)) {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                    cm.dispose();
                }
            } else if (selection == 3) { // get insode
                if (cm.getSquad("Horntail") != null) {
                    var dd = cm.getEventManager("HorntailBattle");
                    dd.startInstance(cm.getSquad("Horntail"), cm.getMap());
					
					cm.getPlayer().setBossLog(3);//�ط�
					
                   // dd.startInstance(cm.getSquad("Horntail"), cm.getMap(), "��ͨ����");
                } else {
                    cm.sendOk("����δ֪�Ĵ���Զ���Ӿܾ���Ĳ�����");
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
        break;
    case 11:
        cm.banMember("Horntail", selection);
        cm.dispose();
        break;
    case 12:
        if (selection != -1) {
            cm.acceptMember("Horntail", selection);
        }
        cm.dispose();
        break;
    default:
        cm.dispose();
        break;
    }
}