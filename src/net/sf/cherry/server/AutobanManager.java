package net.sf.cherry.server;

import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.MaplePacketCreator;

public class AutobanManager
        implements Runnable {

    private Map<Integer, Integer> points = new HashMap();
    private Map<Integer, List<String>> reasons = new HashMap();
    private Set<ExpirationEntry> expirations = new TreeSet();
    private static final int AUTOBAN_POINTS = 1000;
    private static AutobanManager instance = null;

    public static AutobanManager getInstance() {
        if (instance == null) {
            instance = new AutobanManager();
        }
        return instance;
    }

    public void autoban(MapleClient c, String reason) {
        if (c.getPlayer().isGM()) {
            return;
        }
        addPoints(c, 1000, 0L, reason);
    }

    public void broadcastMessage(MapleClient c) {
        try {
            c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, c.getPlayer().getName() + " 已被永久封号.").getBytes());
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
    }

    public void broadcastMessage(MapleClient c, String s) {
        try {
            c.getChannelServer().getWorldInterface().broadcastMessage(null, MaplePacketCreator.serverNotice(0, s).getBytes());
        } catch (RemoteException e) {
            c.getChannelServer().reconnectWorld();
        }
    }

    public synchronized void addPoints(MapleClient c, int points, long expiration, String reason) {
        if (c.getPlayer().isGM()) {
            return;
        }
        int acc = c.getPlayer().getAccountID();

        if (this.points.containsKey(Integer.valueOf(acc))) {
            if (((Integer) this.points.get(Integer.valueOf(acc))).intValue() >= 1000) {
                return;
            }
            this.points.put(Integer.valueOf(acc), Integer.valueOf(((Integer) this.points.get(Integer.valueOf(acc))).intValue() + points));
            List reasonList = (List) this.reasons.get(Integer.valueOf(acc));
            reasonList.add(reason);
        } else {
            this.points.put(Integer.valueOf(acc), Integer.valueOf(points));
            List reasonList = new LinkedList();
            reasonList.add(reason);
            this.reasons.put(Integer.valueOf(acc), reasonList);
        }
        if (((Integer) this.points.get(Integer.valueOf(acc))).intValue() >= 1000) {
            String name = c.getPlayer().getName();
            StringBuilder banReason = new StringBuilder("Autoban for Character ");
            banReason.append(name);
            banReason.append(" (IP ");
            banReason.append(c.getSession().getRemoteAddress().toString());
            banReason.append("): ");
            for (String s : reasons.get(acc)) {
                banReason.append(s);
                banReason.append(", ");
            }
            if (!c.getPlayer().isGM()) {
                try {
                    c.getChannelServer().getWorldInterface().broadcastGMMessage(null, MaplePacketCreator.serverNotice(6, "[系统警告] 频道:" + c.getChannel() + "ID：[" + c.getPlayer().getId() + "]人物: " + name + " 检测到使用非法程序.(理由: " + reason + ")").getBytes());
                } catch (RemoteException e) {
                    c.getChannelServer().reconnectWorld();
                }
            }
            return;
        }
        if (expiration > 0L) {
            this.expirations.add(new ExpirationEntry(System.currentTimeMillis() + expiration, acc, points));
        }
    }

    public void run() {
        long now = System.currentTimeMillis();
        for (ExpirationEntry e : this.expirations) {
            if (e.time <= now) {
                this.points.put(Integer.valueOf(e.acc), Integer.valueOf(((Integer) this.points.get(Integer.valueOf(e.acc))).intValue() - e.points));
            } else {
                return;
            }
        }
    }

    private static class ExpirationEntry
            implements Comparable<ExpirationEntry> {

        public long time;
        public int acc;
        public int points;

        public ExpirationEntry(long time, int acc, int points) {
            this.time = time;
            this.acc = acc;
            this.points = points;
        }

        public int compareTo(ExpirationEntry o) {
            return (int) (this.time - o.time);
        }
    }
}
