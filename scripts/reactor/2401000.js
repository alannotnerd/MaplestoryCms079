function act() {
    rm.changeMusic("Bgm14/HonTale");
    rm.spawnMonster(8810026, 71, 260);
    rm.mapMessage("����һ��ŭ�𣬰������������ˡ�");
    //rm.scheduleWarp(43200, 240000000);
    if (!rm.getPlayer().isGM()) {
        rm.getMap().startSpeedRun();
    }
}