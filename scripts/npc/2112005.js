function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("���Ժ����ԡ�");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 926110200:
        if (cm.haveItem(4001133, 20) && em.getProperty("stage5").equals("2")) {
            cm.gainItem(4001133,-20);
	    cm.mapMessage(6, "ʵ��������ѿ���!");
	    cm.sendOk("����ߵ������Ѿ�Ϊ�㿪��������롣");
            em.setProperty("stage3", "1");
            cm.getMap().setReactorState();
        } else {
            cm.sendOk("���������˵�ͼ�Ĺ����ҵ�#bоƬԿ��#k20����˳�㿪����������Ĵ��š�\r\nȻ������ߵ����ž���Ϊ�㿪����Ȼ����롣");
        }
        break;
    }
    cm.dispose();
}