package net.sf.cherry.net.channel.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.quest.QuestScriptManager;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public class QuestActionHandler extends AbstractMaplePacketHandler {

    private static Logger log = LoggerFactory.getLogger(QuestActionHandler.class);
 
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        c.doneedlog(this, c.getPlayer());
        byte action = slea.readByte();//2
        short quest = slea.readShort();//questid
        MapleCharacter player = c.getPlayer();
        if (action == 1) {
            int npc = slea.readInt();//npcid
            try { //8249
                MapleQuest.getInstance(quest).start(player, npc);
                ////System.out.println("开始任务ID：" + quest + "");
            } catch (Exception e) {
                log.error("任务发成错误！QusetID: " + quest, e);
            }
        } else if (action == 2) {
            int npc = slea.readInt();
            slea.readInt();
            try {
                if (slea.available() >= 4L) {
                    int selection = slea.readInt();
                    MapleQuest.getInstance(quest).complete(player, npc, Integer.valueOf(selection), false);
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(0, 10));
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), 0, 10, (byte) 3), false);
                } else {
                    MapleQuest.getInstance(quest).complete(player, npc);
                    c.getPlayer().getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(0, 10));
                    c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), 0, 10, (byte) 3), false);
                }
            } catch (Exception e) {
                 log.error("任务发成错误！QusetID: " + quest, e);
            }
        } else if (action == 3) {//放弃任务
            MapleQuest.getInstance(quest).forfeit(player);
        } else if (action == 4) {//脚本开始
            /* 68 00 
             * 04 
             * 9F 12 
             * 50 7B 89 00 
             * 74 FF 13 01*/
            /*68 00 04 9F 12 50 7B 89 00 74 FF 13 01*/
            /**/
            /*68 00 05 FD 03 D0 07 00 00 74 FF 13 01*/
            int npc = slea.readInt();
            slea.readInt();
       // MapleQuest.getInstance(quest).start(player, npc);
                QuestScriptManager.getInstance().start(c, npc, quest);
        } else if (action == 5) {//脚本结束
            int npc = slea.readInt();
            slea.readInt();
            QuestScriptManager.getInstance().end(c, npc, quest);
            c.getPlayer().getClient().getSession().write(MaplePacketCreator.showOwnBuffEffect(0, 10));
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showBuffeffect(c.getPlayer().getId(), 0, 10, (byte) 3), false);
        }
    }
}
