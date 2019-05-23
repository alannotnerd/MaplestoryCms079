package net.sf.cherry.scripting.npc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.script.Invocable;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.world.MaplePartyCharacter;
import net.sf.cherry.scripting.AbstractScriptManager;

public class NPCScriptManager extends AbstractScriptManager {

    private Map<MapleClient, NPCConversationManager> cms = new HashMap();
    private Map<MapleClient, NPCScript> scripts = new HashMap();
    private static NPCScriptManager instance = new NPCScriptManager();

    public static synchronized NPCScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npc) {
        start(c, npc, 0);
    }

    public void start(MapleClient c, int npc, int wh) {
        try {
            if (c.getPlayer().isGM()) {
                c.getPlayer().dropMessage("[系统提示]您已经建立与NPC:" + npc + "_" + wh + "的对话。");
            }
            NPCConversationManager cm = new NPCConversationManager(c, npc, wh);
            if (this.cms.containsKey(c)) {
                return;
            }
            Invocable iv;
            this.cms.put(c, cm);
            if (wh == 0) {
                iv = getInvocable("npc/" + npc + ".js", c);
            } else {
                iv = getInvocable("npc/" + npc + "_" + wh + ".js", c);
            }
            if ((iv == null) || (getInstance() == null)) {
                cm.sendOk("有什么好想法可以找管理员添加功能!\r\n我的ID是: #r" + npc + "_" + wh + "#k.");
                cm.dispose();
                return;
            }
            this.engine.put("cm", cm);
            NPCScript ns = (NPCScript) iv.getInterface(NPCScript.class);
            this.scripts.put(c, ns);
            ns.start();
        } catch (Exception e) {
            log.error("Error executing NPC script " + npc + "_" + wh, e);
            dispose(c);
            this.cms.remove(c);
        }
    }

    public void start(String filename, MapleClient c, int npc, List<MaplePartyCharacter> chars) {
        start(filename, c, npc, 0, chars);
    }

    public void start(String filename, MapleClient c, int npc, int wh, List<MaplePartyCharacter> chars) {
        try {
            NPCConversationManager cm = new NPCConversationManager(c, npc, wh, chars, 0);
            cm.dispose();
            if (this.cms.containsKey(c)) {
                return;
            }
            this.cms.put(c, cm);
            Invocable iv = getInvocable("npc/" + filename + ".js", c);
            NPCScriptManager npcsm = getInstance();
            if ((iv == null) || (getInstance() == null) || (npcsm == null)) {
                cm.dispose();
                return;
            }
            this.engine.put("cm", cm);
            NPCScript ns = (NPCScript) iv.getInterface(NPCScript.class);
            this.scripts.put(c, ns);
            ns.start(chars);
        } catch (Exception e) {
            log.error("Error executing NPC script " + filename, e);
            dispose(c);
            this.cms.remove(c);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        NPCScript ns = (NPCScript) this.scripts.get(c);
        if (ns != null) {
            try {
                ns.action(mode, type, selection);
            } catch (Exception e) {
                log.error("错误的npc脚本加载： " + c.getCM().getNpc(), e);
                dispose(c);
            }
        }
    }

    public void dispose(NPCConversationManager cm) {
        MapleClient c = cm.getC();
        this.cms.remove(c);
        this.scripts.remove(c);
        if (cm.getwh() == 0) {
            resetContext("npc/" + cm.getNpc() + ".js", c);
        } else {
            resetContext("npc/" + cm.getNpc() + "_" + cm.getwh() + ".js", c);
        }
    }

    public void dispose(MapleClient c) {
        NPCConversationManager npccm = (NPCConversationManager) this.cms.get(c);
        if (npccm != null) {
            dispose(npccm);
        }
    }

    public NPCConversationManager getCM(MapleClient c) {
        return (NPCConversationManager) this.cms.get(c);
    }
}
