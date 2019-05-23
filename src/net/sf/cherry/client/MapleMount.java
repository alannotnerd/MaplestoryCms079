package net.sf.cherry.client;

import java.util.concurrent.ScheduledFuture;

import net.sf.cherry.server.TimerManager;
import net.sf.cherry.tools.MaplePacketCreator;

public class MapleMount {

    private int itemid;
    private int skillid;
    private int tiredness;
    private int exp;
    private int level;
    private ScheduledFuture<?> tirednessSchedule;
    private MapleCharacter owner;
    private boolean active;

    public MapleMount(MapleCharacter owner, int id, int skillid) {
        this.itemid = id;
        this.skillid = skillid;
        this.tiredness = 0;
        this.level = 1;
        this.exp = 0;
        this.owner = owner;
        this.active = true;
    }

    public int getItemId() {
        return this.itemid;
    }

    public int getSkillId() {
        return this.skillid;
    }

    public int getId() {
        /*if (this.itemid < 1932001) {
            return this.itemid - 1901999;
        }
        if (this.itemid == 1932000) {
            return 4;
        }*/
        if (this.itemid < 1903000) {
            return itemid - 1901999;
        }
        return 5;
    }

    public int getTiredness() {
        return this.tiredness;
    }

    public int getExp() {
        return this.exp;
    }

    public int getLevel() {
        return this.level;
    }

    public void setTiredness(int newtiredness) {
        this.tiredness = newtiredness;
        if (this.tiredness < 0) {
            this.tiredness = 0;
        }
    }

    public void increaseTiredness() {
        this.tiredness += 1;
        this.owner.getMap().broadcastMessage(MaplePacketCreator.updateMount(this.owner.getId(), this, false));
        if (this.tiredness > 100) {
            this.owner.dispelSkill(this.owner.getJobType() * 20000000 + 1004);
        }
    }

    public void setExp(int newexp) {
        this.exp = newexp;
    }

    public void setLevel(int newlevel) {
        this.level = newlevel;
    }

    public void setItemId(int newitemid) {
        this.itemid = newitemid;
    }

    public void setSkillId(int skillid) {
        this.skillid = skillid;
    }

    public void startSchedule() {
        this.tirednessSchedule = TimerManager.getInstance().register(new Runnable() {

            public void run() {
                MapleMount.this.increaseTiredness();
            }
        }, 60000L, 60000L);
    }

    public void cancelSchedule() {
        this.tirednessSchedule.cancel(false);
    }

    public void setActive(boolean set) {
        this.active = set;
    }

    public boolean isActive() {
        return this.active;
    }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.client.MapleMount
 * JD-Core Version:    0.6.0
 */