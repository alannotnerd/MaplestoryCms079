function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("请稍后再试。");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 926110200:
        if (cm.haveItem(4001133, 20) && em.getProperty("stage5").equals("2")) {
            cm.gainItem(4001133,-20);
	    cm.mapMessage(6, "实验室入口已开启!");
	    cm.sendOk("我身边的铁门已经为你开启，请进入。");
            em.setProperty("stage3", "1");
            cm.getMap().setReactorState();
        } else {
            cm.sendOk("请帮我消灭此地图的怪物找到#b芯片钥匙#k20个。顺便开启左右两侧的大门。\r\n然后我身边的铁门就能为你开启，然后进入。");
        }
        break;
    }
    cm.dispose();
}