package net.sf.cherry.client;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.cherry.server.quest.MapleQuest;

public final class MapleQuestStatus {

    public static enum Status {

        UNDEFINED(-1),
        NOT_STARTED(0),
        STARTED(1),
        COMPLETED(2);
        final int status;

        private Status(int id) {
            this.status = id;
        }

        public int getId() {
            return this.status;
        }

        public static Status getById(int id) {
            for (Status l : values()) {
                if (l.getId() == id) {
                    return l;
                }
            }
            return null;
        }
    }
    private MapleQuest quest;
    private Status status;
    private Map<Integer, Integer> killedMobs = new LinkedHashMap();
    private int npc;
    private long completionTime;
    private int forfeited = 0;

    public MapleQuestStatus(MapleQuest quest, Status status) {
        this.quest = quest;
        this.setStatus(status);
        this.completionTime = System.currentTimeMillis();
        if (status == Status.STARTED) {
            registerMobs();
        }
    }

    public MapleQuestStatus(MapleQuest quest, Status status, int npc) {
        this.quest = quest;
        this.setStatus(status);
        this.setNpc(npc);
        this.completionTime = System.currentTimeMillis();
        if (status == Status.STARTED) {
            registerMobs();
        }
    }

    public MapleQuest getQuest() {
        return this.quest;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getNpc() {
        return this.npc;
    }

    public void setNpc(int npc) {
        this.npc = npc;
    }

    private void registerMobs() {
        List<Integer> relevants = quest.getRelevantMobs();
        for (int i : relevants) {
            killedMobs.put(i, 0);
        }
    }

    public boolean mobKilled(int id) {
        if (this.killedMobs.get(Integer.valueOf(id)) != null) {
            this.killedMobs.put(Integer.valueOf(id), Integer.valueOf(((Integer) this.killedMobs.get(Integer.valueOf(id))).intValue() + 1));
            return true;
        }
        return false;
    }

    public void setMobKills(int id, int count) {
        this.killedMobs.put(Integer.valueOf(id), Integer.valueOf(count));
    }

    public boolean hasMobKills() {
        return this.killedMobs.size() > 0;
    }

    public int getMobKills(int id) {
        if (this.killedMobs.get(Integer.valueOf(id)) == null) {
            return 0;
        }
        return ((Integer) this.killedMobs.get(Integer.valueOf(id))).intValue();
    }

    public Map<Integer, Integer> getMobKills() {
        return Collections.unmodifiableMap(this.killedMobs);
    }

    public int getMobNum(int id) {
        int i = 0;
        for (int kMob : killedMobs.values()) {
            i++;
            if (kMob == id) {
                return i;
            }
        }
        return i;
    }

    public long getCompletionTime() {
        return this.completionTime;
    }

    public void setCompletionTime(long completionTime) {
        this.completionTime = completionTime;
    }

    public int getForfeited() {
        return this.forfeited;
    }

    public void setForfeited(int forfeited) {
        if (forfeited >= this.forfeited) {
            this.forfeited = forfeited;
        } else {
            throw new IllegalArgumentException("Can't set forfeits to something lower than before.");
        }
    }

}