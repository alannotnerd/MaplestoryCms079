function action(mode, type, selection) {
    var em = cm.getEventManager("Romeo");
    if (em == null) {
        cm.sendOk("Please try again later.");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 261000011:
        cm.removeAll(4001130);
        cm.removeAll(4001131);
        cm.removeAll(4001132);
        cm.removeAll(4001133);
        cm.removeAll(4001134);
        cm.removeAll(4001135);
        if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
            cm.sendOk("�ӳ��������������������˵��.");
        } else {
            var party = cm.getPlayer().getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var size = 0;
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (ccPlayer == null || ccPlayer.getLevel() < 1000 || ccPlayer.getLevel() > 255) {
                    next = false;
                    break;
                }
                size += (1);
            }
            if (next && (size >= 3)) {
                var prop = em.getProperty("state");
                if (prop.equals("0") || prop == null) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
                } else {
                    cm.sendOk("�Ѿ���һ���������ø�������ѡ������Ƶ����");
                }
            } else {
                cm.sendOk("��Ķ������3�����ϡ��ȼ�������100�����ϲ��ܽ��룡");
            }
        }
        break;
    case 926100000:
        cm.sendOk("��Ӧ�������������㿴ÿһ���顣����ͼ��ݵĵ�����ֱ�����ҵ������ʵ���ҵ���ڡ�");
        break;
    case 926100001:
        cm.sendOk("���������еĹ���Ҿ��������");
        break;
    case 926100100:
        cm.sendOk("�����Щ�ձ����������ܹ����ˣ���");
        break;
    case 926100200:
        if (cm.haveItem(4001130, 1)) {
            cm.sendOk("Ŷ����д���ţ�лл�㣡");
            cm.gainItem(4001130, -1);
            em.setProperty("stage", "1");
        } else if (cm.haveItem(4001134, 1)) {
            cm.gainItem(4001134, -1);
            cm.sendOk("лл�㣡�����뿴zenumist�ļ���");
            em.setProperty("stage4", "1");
        } else if (cm.haveItem(4001135, 1)) {
            cm.gainItem(4001135, -1);
            cm.sendOk("лл�㣡�����������");
            em.setProperty("stage4", "2");
            cm.getMap().getReactorByName("rnj3_out3").hitReactor(cm.getClient());
        } else {
            cm.sendOk("���Ǳ���ֹͣalcadno��zenumist֮��ĳ�ͻ������alcadno�ļ���Ȼ��zenumist��");
        }
        break;
    case 926100300:
        cm.sendOk("���Ǳ��뵽��ʵ���ҵĶ��������ÿ����Ա��");
        break;
    case 926100400:
        cm.sendOk("ֻҪ��׼�����ˣ����Ǿ�ȥ�����ҵİ��ˡ�");
        break;
    case 926100401:
        cm.warpParty(926100500); //urete
        break;
    }
    cm.dispose();
}