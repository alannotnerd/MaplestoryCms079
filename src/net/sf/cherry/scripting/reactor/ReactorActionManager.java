package net.sf.cherry.scripting.reactor;

import java.awt.Point;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;

import net.sf.cherry.client.Equip;
import net.sf.cherry.client.IItem;
import net.sf.cherry.client.Item;
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.MapleInventoryType;
import net.sf.cherry.net.channel.ChannelServer;
import net.sf.cherry.scripting.AbstractPlayerInteraction;
import net.sf.cherry.server.MapleItemInformationProvider;
import net.sf.cherry.server.MaplePortal;
import net.sf.cherry.server.life.MapleLifeFactory;
import net.sf.cherry.server.life.MapleMonster;
import net.sf.cherry.server.life.MapleMonsterInformationProvider.DropEntry;
import net.sf.cherry.server.life.MapleNPC;
import net.sf.cherry.server.maps.BossMapMonitor;
import net.sf.cherry.server.maps.MapMonitor;
import net.sf.cherry.server.maps.MapleMap;
import net.sf.cherry.server.maps.MapleReactor;
import net.sf.cherry.server.maps.SBossMapMonitor;
import net.sf.cherry.tools.MaplePacketCreator;

public class ReactorActionManager extends AbstractPlayerInteraction {

    private MapleReactor reactor;
    private MapleClient c;

    public ReactorActionManager(MapleClient c, MapleReactor reactor) {
        super(c);
        this.reactor = reactor;
    }

    public void dropItems() {
        dropItems(false, 0, 0, 0, 0);
    }

    public void dropItems(boolean meso, int mesoChance, int minMeso, int maxMeso) {
        dropItems(meso, mesoChance, minMeso, maxMeso, 0);
    }

    public void dropItems(boolean meso, int mesoChance, int minMeso, int maxMeso, int minItems) {
        List<DropEntry> chances = getDropChances();
        List<DropEntry> items = new LinkedList<DropEntry>();
        int numItems = 0;
        
        if ((meso) && (Math.random() < 1.0D / mesoChance)) {
            items.add(new DropEntry(0, mesoChance, 0));
        }
        Iterator iter = chances.iterator();
        while (iter.hasNext()) {
            DropEntry d = (DropEntry) iter.next();
            if (Math.random() < (1 / (double) d.chance)) {
                numItems++;
                items.add(d);
            }

        }

        while (items.size() < minItems) {
            items.add(new DropEntry(0, mesoChance));
            numItems++;
        }

        Collections.shuffle(items);

        Point dropPos = this.reactor.getPosition();

        dropPos.x -= 12 * numItems;

        for (DropEntry d : items) {
            if (d.itemid == 0) {
                int range = maxMeso - minMeso;
                int mesoDrop = ((int) (Math.random() * range) + minMeso) * ChannelServer.getInstance(getClient().getChannel()).getMesoRate();
                this.reactor.getMap().spawnMesoDrop(mesoDrop, dropPos, this.reactor, getPlayer(), meso);
            } else {
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                IItem drop;
                if (ii.getInventoryType(d.itemid) != MapleInventoryType.EQUIP) {
                    drop = new Item(d.itemid, (byte) 0, (short) 1);
                } else {
                    drop = ii.randomizeStats((Equip) ii.getEquipById(d.itemid));
                }
                this.reactor.getMap().spawnItemDrop(this.reactor, getPlayer(), drop, dropPos, false, true);
            }
            dropPos.x += 25;
        }
    }

    private List<DropEntry> getDropChances() {
        return ReactorScriptManager.getInstance().getDrops(reactor.getId());
    }

    public void spawnMonster(int id) {
        spawnMonster(id, 1, getPosition());
    }

    public void spawnMonster(int id, int x, int y) {
        spawnMonster(id, 1, new Point(x, y));
    }

    public void spawnMonster(int id, int qty) {
        spawnMonster(id, qty, getPosition());
    }

    public void spawnMonster(int id, int qty, int x, int y) {
        spawnMonster(id, qty, new Point(x, y));
    }

    private void spawnMonster(int id, int qty, Point pos) {
        for (int i = 0; i < qty; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(id);
            this.reactor.getMap().spawnMonsterOnGroundBelow(mob, pos);
            if (getPlayer().getEventInstance() != null) {
                getPlayer().getEventInstance().registerMonster(mob);
            }
        }
    }

    public Point getPosition() {
        Point pos = this.reactor.getPosition();
        pos.y -= 10;
        return pos;
    }

    public void spawnNpc(int npcId) {
        spawnNpc(npcId, getPosition());
    }

    public void spawnNpc(int npcId, MapleCharacter owner) {
        spawnNpc(npcId, getPosition(), owner);
    }

    public void spawnNpc(int npcId, int x, int y) {
        spawnNpc(npcId, new Point(x, y));
    }

    public void spawnNpc(int npcId, Point pos) {
        MapleNPC npc = MapleLifeFactory.getNPC(npcId);
        if ((npc != null) && (!npc.getName().equals("MISSINGNO"))) {
            npc.setPosition(pos);
            npc.setCy(pos.y);
            npc.setRx0(pos.x + 50);
            npc.setRx1(pos.x - 50);
            npc.setFh(this.reactor.getMap().getFootholds().findBelow(pos).getId());
            npc.setCustom(true);
            this.reactor.getMap().addMapObject(npc);
            this.reactor.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
        }
    }

    public void spawnNpc(int npcId, Point pos, MapleCharacter owner) {
        MapleNPC npc = MapleLifeFactory.getNPC(npcId);
        if ((npc != null) && (!npc.getName().equals("MISSINGNO"))) {
            npc.setPosition(pos);
            npc.setCy(pos.y);
            npc.setRx0(pos.x + 50);
            npc.setRx1(pos.x - 50);
            npc.setFh(this.reactor.getMap().getFootholds().findBelow(pos).getId());
            npc.setCustom(true);
            npc.setOwner(owner);
            this.reactor.getMap().addMapObject(npc);
            this.reactor.getMap().broadcastMessage(MaplePacketCreator.spawnNPC(npc));
        }
    }

    public MapleReactor getReactor() {
        return this.reactor;
    }

    public void spawnFakeMonster(int id) {
        spawnFakeMonster(id, 1, getPosition());
    }

    public void spawnFakeMonster(int id, int x, int y) {
        spawnFakeMonster(id, 1, new Point(x, y));
    }

    public void spawnFakeMonster(int id, int qty) {
        spawnFakeMonster(id, qty, getPosition());
    }

    public void spawnFakeMonster(int id, int qty, int x, int y) {
        spawnFakeMonster(id, qty, new Point(x, y));
    }

    private void spawnFakeMonster(int id, int qty, Point pos) {
        for (int i = 0; i < qty; i++) {
            MapleMonster mob = MapleLifeFactory.getMonster(id);
            this.reactor.getMap().spawnFakeMonsterOnGroundBelow(mob, pos);
        }
    }

    public void killAll() {
        this.reactor.getMap().killAllMonsters();
    }

    public void killMonster(int monsId) {
        this.reactor.getMap().killMonster(monsId);
    }

    public void warpMap(int mapId, int portal) {
        Collection<MapleCharacter> mchc = new LinkedHashSet<MapleCharacter>(getClient().getPlayer().getMap().getCharacters());
        for (MapleCharacter mch : mchc) {
            if (mch != null) {
                MapleMap target = ChannelServer.getInstance(getClient().getChannel()).getMapFactory().getMap(mapId);
                mch.changeMap(target, target.getPortal(portal));

            }
        }
    }

    public void createMapMonitor(int mapId, boolean closePortal, int portalMap, String portalName, int reactorMap, int reactor) {
        MaplePortal portal = null;
        if (closePortal) {
            portal = this.c.getChannelServer().getMapFactory().getMap(portalMap).getPortal(portalName);
            portal.setPortalState(false);
        }
        MapleReactor r = null;
        if (reactor > -1) {
            r = c.getChannelServer().getMapFactory().getMap(reactorMap).getReactorById(reactor);
            r.setState((byte) 1);
            this.c.getChannelServer().getMapFactory().getMap(reactorMap).broadcastMessage(MaplePacketCreator.triggerReactor(r, 1));
        }
        new MapMonitor(this.c.getChannelServer().getMapFactory().getMap(mapId), closePortal ? portal : null, this.c.getChannel(), r);
    }

    public void createMapMonitor(int type, int pMapId, String pName, String sMobId, short type2, int trigger) {
        switch (type) {
            case 1:
                createMapMonitor(type, pMapId, pName);
                break;
            case 2:
                MapleMap pMap = getClient().getChannelServer().getMapFactory().getMap(pMapId);
                MaplePortal portal = pMap.getPortal(pName);
                String[] st = sMobId.split(",");
                int[] data = new int[st.length];
                for (int i = 0; i < st.length; i++) {
                    data[i] = Integer.parseInt(st[i]);
                }
                SBossMapMonitor sbmm = new SBossMapMonitor(getPlayer().getMap(), pMap, portal, data, getClient().getChannelServer(), type2, trigger);
                sbmm.start();
        }
    }

    public void createMapMonitor(int type, int pMapId, String pName) {
        switch (type) {
            case 1:
                MapleMap pMap = getClient().getChannelServer().getMapFactory().getMap(pMapId);
                MaplePortal portal = pMap.getPortal(pName);
                BossMapMonitor bmm = new BossMapMonitor(getPlayer().getMap(), pMap, portal);
                bmm.start();
        }
    }

    public void closePortal(int mapid, String pName) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).getPortal(pName).setPortalState(false);
    }

    public void openPortal(int mapid, String pName) {
        getClient().getChannelServer().getMapFactory().getMap(mapid).getPortal(pName).setPortalState(true);
    }
}
