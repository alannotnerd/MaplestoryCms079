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
		cm.mapMessage(6, "实验室入口已开启!");
            }
        } else if (java.lang.Math.random() > 0.1) {
                cm.sendOk("书中好像没有提到#b实验室入口#k的地点!请继续点击查阅!");
        	cm.dispose();
        }
    }
    cm.dispose();
}