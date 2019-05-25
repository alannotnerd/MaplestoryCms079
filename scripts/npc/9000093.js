function start() {
    if (cm.getPlayer().getClient().getChannel() == 1) {
	cm.dispose();
        cm.openNpc(9000093,1);
    } else if (cm.getPlayer().getMapId() == 910023100 && cm.getPlayer().getClient().getChannel() == 1) {
        cm.dispose();
        cm.openNpc(9000093,2);
    } else if (cm.getPlayer().getMapId() == 910023202 && cm.getPlayer().getClient().getChannel() == 1) {
        cm.dispose();
        cm.openNpc(9000093,2);
    } else {
        cm.sendOk("只有在1频道地图才可以参加大运动会活动！");
        cm.dispose();
    }
}