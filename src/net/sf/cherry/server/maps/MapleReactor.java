package net.sf.cherry.server.maps;

import java.awt.Rectangle;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.scripting.reactor.ReactorActionManager;
import net.sf.cherry.scripting.reactor.ReactorScriptManager;
import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.Pair;

public class MapleReactor extends AbstractMapleMapObject {

    private int rid;
    private MapleReactorStats stats;
    private byte state;
    private int delay;
    private MapleMap map;
    private String name;
    private boolean timerActive;
    private boolean alive;

    public MapleReactor(MapleReactorStats stats, int rid) {
        this.stats = stats;
        this.rid = rid;
        this.alive = true;
    }

    public void setTimerActive(boolean active) {
        this.timerActive = active;
    }

    public boolean isTimerActive() {
        return this.timerActive;
    }

    public void setState(byte state) {
        this.state = state;
    }

    public byte getState() {
        return this.state;
    }

    public int getId() {
        return this.rid;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public int getDelay() {
        return this.delay;
    }

    public MapleMapObjectType getType() {
        return MapleMapObjectType.REACTOR;
    }

    public int getReactorType() {
        return this.stats.getType(this.state);
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public MapleMap getMap() {
        return this.map;
    }

    public Pair<Integer, Integer> getReactItem() {
        return this.stats.getReactItem(this.state);
    }

    public boolean isAlive() {
        return this.alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public void sendDestroyData(MapleClient client) {
        client.getSession().write(makeDestroyData());
    }

    public MaplePacket makeDestroyData() {
        return MaplePacketCreator.destroyReactor(this);
    }

    public void sendSpawnData(MapleClient client) {
        client.getSession().write(makeSpawnData());
    }

    public MaplePacket makeSpawnData() {
        return MaplePacketCreator.spawnReactor(this);
    }

    public void delayedHitReactor(final MapleClient c, long delay) {
        TimerManager.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                hitReactor(c);
            }
        }, delay);
    }

    //hitReactor command for item-triggered reactors
    public void hitReactor(MapleClient c) {
        hitReactor(0, (short) 0, c);
    }

    public void hitReactor(int charPos, short stance, MapleClient c) {
        if ((this.stats.getType(this.state) < 999) && (this.stats.getType(this.state) != -1)) {
            
            if ((this.stats.getType(this.state) != 2) || ((charPos != 0) && (charPos != 2))) {
                this.state = this.stats.getNextState(this.state);

                if (this.stats.getNextState(this.state) == -1) {
                    if (this.stats.getType(this.state) < 100) {
                        if (this.delay > 0) {
                            this.map.destroyReactor(getObjectId());
                            if (c.getPlayer().isGM()) {
                            	c.getPlayer().dropMessage("destroyReactor:" + rid);
							}
                            ReactorActionManager rm = new ReactorActionManager(c, this);
                            rm.dropItems();
                        } else {
                            this.map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                        }
                    } else {
                        this.map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                    }
                    ReactorScriptManager.getInstance().act(c, this);
                } else {
                    this.map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                    if (this.state == this.stats.getNextState(this.state)) {
                        ReactorScriptManager.getInstance().act(c, this);
                    }
                }
            }
        } else {
            this.state = (byte) (this.state + 1);
            this.map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
            ReactorScriptManager.getInstance().act(c, this);
        }
    }

    public Rectangle getArea() {
        return new Rectangle(getPosition().x + this.stats.getTL().x, getPosition().y + this.stats.getTL().y, this.stats.getBR().x - this.stats.getTL().x, this.stats.getBR().y - this.stats.getTL().y);
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.server.maps.MapleReactor
 * JD-Core Version:    0.6.0
 */