 var status = -1;

function start() {
    cm.sendOk("你们谁来打败我？或者你们是反黑魔法师联盟的人？不管你是谁…没有必要再谈下去!!!!!!!\r\n\r\n#b(来吧!你们这些傻瓜!)");
}

function action(mode, type, selection) {
    if (mode == 1 && cm.getMap().getAllMonster().size() == 0) {
        var eim = cm.getEventInstance();
        if (eim != null) {
            var em = eim.getEventManager();
            if (cm.getMapId() == 211070100) {
                var mob = em.getMonster(8840007);
                mob.getStats().setChange(true);
                mob.changeLevel(160);
                mob.getChangedStats().setOHp(2100000000);
                mob.setHp(2100000000);
                eim.registerMonster(mob);
                var map = eim.getMapInstance(0);
                map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-5, -181));
                cm.removeNpc(cm.getMapId(), 2161000);
                if (!cm.getPlayer().isGM()) {
                    cm.getMap().startSpeedRun();
                }
            } else {
                var mob = em.getMonster(8840000);//普通
                eim.registerMonster(mob);
                var map = eim.getMapInstance(0);
                map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-5, -181));
                cm.removeNpc(cm.getMapId(), 2161000);
                if (!cm.getPlayer().isGM()) {
                    cm.getMap().startSpeedRun();
                }
            }
        }
    }
    cm.dispose();
}
