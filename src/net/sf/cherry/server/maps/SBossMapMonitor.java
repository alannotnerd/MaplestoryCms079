package net.sf.cherry.server.maps;

import java.awt.Point;
import java.util.Arrays;
import java.util.List;

import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.tools.MaplePacketCreator;

public class SBossMapMonitor extends BossMapMonitor {

    protected int[] mobs;
    protected boolean[] deadCount;
    protected ChannelServer cserv;
    protected boolean hasHappen;
    protected short type;
    protected int trigger;
    public static final short HORNTAIL = 0;
    public static final short ZAKUM = 1;

    public SBossMapMonitor(MapleMap map, MapleMap pMap, MaplePortal portal, int[] mobs, ChannelServer cserv) {
        super(map, pMap, portal);
        this.mobs = mobs;
        this.deadCount = new boolean[mobs.length];
        this.cserv = cserv;
        for (int i = 0; i < this.deadCount.length; i++) {
            //this.deadCount[i] = (this.type != 0 ? 1 : false);
        }
        this.hasHappen = false;
        this.type = 0;
    }

    public SBossMapMonitor(MapleMap map, MapleMap pMap, MaplePortal portal, int[] mobs, ChannelServer cserv, short type, int trigger) {
        super(map, pMap, portal);
        this.mobs = mobs;
        this.deadCount = new boolean[mobs.length];
        this.cserv = cserv;
        for (int i = 0; i < this.deadCount.length; i++) {
            //this.deadCount[i] = (type != 0 ? 1 : false);
        }
        this.hasHappen = false;
        this.type = type;
        this.trigger = trigger;
    }

    private boolean chkDeadCount() {
        boolean result = true;
        for (int i = 0; i < this.deadCount.length; i++) {
            // if ((this.deadCount[i] == 0) && (this.type == 0))
            {
                result = false;
                break;
            }
            //  if ((this.deadCount[i] == 0) || (this.type != 1))
            //  continue;
            //  result = false;
            // break;
        }

        return result;
    }

    private MapleMonster getMonster(int id) {
        MapleMonster m = null;
        List list = getAllMob();
        for (int i = 0; i < list.size(); i++) {
            MapleMonster monster = (MapleMonster) list.get(i);
            if (monster.getId() != id) {
                continue;
            }
            m = monster;
            break;
        }

        return m;
    }

    private List<MapleMapObject> getAllMob() {
        return this.map.getMapObjectsInRange(new Point(0, 0), (1.0D / 0.0D), Arrays.asList(new MapleMapObjectType[]{MapleMapObjectType.MONSTER}));
    }

    private boolean chkSpecialBoss() {
        List<MapleMapObject> list = getAllMob();
        for (int j = 0; j < deadCount.length; j++) {
            if ((deadCount[j] == true) && (type == 0)) {
                for (int i = 0; i < list.size(); i++) {
                    MapleMonster monster = (MapleMonster) list.get(i);
                    if (monster.getId() != mobs[j]) {
                        continue;
                    }
                    deadCount[j] = true;
                    break;
                }
            } else {
                if (deadCount[j] == true || type != 1) {
                    continue;
                }
                boolean found = false;
                for (int i = 0; i < list.size(); i++) {
                    MapleMonster monster = (MapleMonster) list.get(i);
                    if (monster.getId() != this.mobs[j]) {
                        continue;
                    }
                    found = true;
                    break;
                }

                this.deadCount[j] = found;
            }
        }
        return chkDeadCount();
    }

    public void run() {
        MapleMonster triggerMob = null;
        switch (this.type) {
            case 0:
                break;
            case 1:
                while (triggerMob == null) {
                    triggerMob = getMonster(this.trigger);
                    try {
                        Thread.sleep(500L);
                    } catch (InterruptedException e) {
                    }
                }
                triggerMob.setMoveLocked(true);
        }

        while (this.map.playerCount() > 0) {
            if ((chkSpecialBoss()) && (!this.hasHappen)) {
                switch (this.type) {
                    case 0:
                        this.map.killAllmonster();
                        this.cserv.broadcastPacket(MaplePacketCreator.serverNotice(5, this.cserv.getChannel(), "经过无数次的战争，暗黑龙王终于被勇士们所消灭，它们才是真正的龙林的英雄!!"));
                        this.hasHappen = true;
                        break;
                    case 1:
                        triggerMob.setMoveLocked(false);
                        triggerMob.setHp(triggerMob.getMaxHp());
                        triggerMob.setMp(triggerMob.getMaxMp());
                        this.cserv.broadcastPacket(MaplePacketCreator.serverNotice(5, this.cserv.getChannel(), "经过无数次的战争，扎昆BOSS终于被勇士们所消灭，它们才是真正的龙林的英雄!!"));
                        this.hasHappen = true;
                }
            }

            try {
                switch (this.type) {
                    case 0:
                        Thread.sleep(3000L);
                        break;
                    case 1:
                        Thread.sleep(3000L);
                }

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
