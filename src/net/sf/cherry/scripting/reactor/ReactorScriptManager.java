package net.sf.cherry.scripting.reactor;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.database.DatabaseConnection;
import net.sf.cherry.scripting.AbstractScriptManager;
import net.sf.cherry.server.life.MapleMonsterInformationProvider.DropEntry;
import net.sf.cherry.server.maps.MapleReactor;

public class ReactorScriptManager extends AbstractScriptManager {

    private static ReactorScriptManager instance = new ReactorScriptManager();
    private Map<Integer, List<DropEntry>> drops = new HashMap<Integer, List<DropEntry>>();

    public static synchronized ReactorScriptManager getInstance() {
        return instance;
    }

    public void act(MapleClient c, MapleReactor reactor) {
        try {
            ReactorActionManager rm = new ReactorActionManager(c, reactor);

            Invocable iv = getInvocable("reactor/" + reactor.getId() + ".js", c);
            if (iv == null) {
                return;
            }
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage(6, "[反应堆提示]您已经建立与reactor:" + reactor.getId() + "的对话①。");
            }
            this.engine.put("rm", rm);
            ReactorScript rs = (ReactorScript) iv.getInterface(ReactorScript.class);
            rs.act();
        } catch (Exception e) {
            log.error("Error executing reactor script.", e);
        }
    }

    public List<DropEntry> getDrops(int rid) {
        List<DropEntry> ret = drops.get(rid);
        if (ret == null) {
            ret = new LinkedList<DropEntry>();
            try {
                PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT itemid, chance FROM drops_reactor WHERE reactorid = ? AND chance >= 0");
                ps.setInt(1, rid);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    ret.add(new DropEntry(rs.getInt("itemid"), rs.getInt("chance")));
                }
                rs.close();
                ps.close();
            } catch (Exception e) {
                log.error("Could not retrieve drops for reactor " + rid, e);
            }
            drops.put(rid, ret);
        }
        return ret;
    }

    public void clearDrops() {
        this.drops.clear();
    }

    public void touch(MapleClient c, MapleReactor reactor) {
        touching(c, reactor, true);
    }

    public void untouch(MapleClient c, MapleReactor reactor) {
        touching(c, reactor, false);
    }

    public void touching(MapleClient c, MapleReactor reactor, boolean touching) {
        try {
            ReactorActionManager rm = new ReactorActionManager(c, reactor);
            Invocable iv = getInvocable("reactor/" + reactor.getId() + ".js", c);
            if (iv == null) {
                return;
            }
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage(6, "[反应堆提示]您已经建立与reactor:" + reactor.getId() + "的对话②。");
            }
            this.engine.put("rm", rm);
            ReactorScript rs = (ReactorScript) iv.getInterface(ReactorScript.class);
            if (touching) {
                rs.touch();
            } else {
                rs.untouch();
            }
        } catch (Exception e) {
        }
    }
}
