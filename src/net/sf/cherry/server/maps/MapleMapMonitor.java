package net.sf.cherry.server.maps;

public abstract class MapleMapMonitor extends Thread {

    public static final int BOSS_MAP = 1;
    public static final int SBOSS_MAP = 2;
    protected MapleMap map;

    protected MapleMapMonitor(MapleMap map) {
        this.map = map;
    }

    protected void killAllMonster() {
        this.map.killAllmonster();
    }

    public abstract void run();
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleMapMonitor
 * JD-Core Version:    0.6.0
 */