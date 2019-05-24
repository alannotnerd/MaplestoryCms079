function act() {
    rm.changeMusic("Bgm14/HonTale");
    rm.spawnMonster(8810026, 71, 260);
    rm.mapMessage("随着一声怒吼，暗黑龙王出现了。");
    //rm.scheduleWarp(43200, 240000000);
    if (!rm.getPlayer().isGM()) {
        rm.getMap().startSpeedRun();
    }
}