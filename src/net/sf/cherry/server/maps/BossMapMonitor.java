package net.sf.cherry.server.maps;

import net.sf.cherry.server.MaplePortal;

public class BossMapMonitor extends MapleMapMonitor {

    protected MapleMap pMap;
    protected MaplePortal portal;

    public BossMapMonitor(MapleMap map, MapleMap pMap, MaplePortal portal) {
        super(map);
        this.pMap = pMap;
        this.portal = portal;
    }

    public void run() {
        while (this.map.playerCount() > 0) {
            try {
                Thread.sleep(3000L);
            } catch (InterruptedException e) {
            }
        }

        while (this.map.mobCount() > 0) {
            this.map.killAllmonster();
            try {
                Thread.sleep(5000L);
            } catch (InterruptedException e) {
            }
        }

        this.map.resetReactors();
        this.pMap.resetReactors();
        this.portal.setPortalState(true);
    }
}