var status = -1;

function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.dispose();
        return;
    }
    if (!cm.canHold(4001131, 1)) {
        cm.sendOk("I will need 1 ETC space.");
        cm.dispose();
        return;
    }
    if (cm.getPlayer().getMapId() == 926110000) {
        if (java.lang.Math.random() < 0.1) {
            if (em.getProperty("stage1").equals("0")) {
                em.setProperty("stage1", "1");
                cm.getMap().setReactorState();
		cm.mapMessage(6, "ʵ��������ѿ���!");
            }
        } else if (java.lang.Math.random() > 0.1) {
                cm.sendOk("���к���û���ᵽ#bʵ�������#k�ĵص�!������������!");
        	cm.dispose();
        }
    }
    cm.dispose();
}