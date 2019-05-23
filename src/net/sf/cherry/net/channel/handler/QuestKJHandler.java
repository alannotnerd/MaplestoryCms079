package net.sf.cherry.net.channel.handler;
 
import net.sf.cherry.client.MapleCharacter;
import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.server.quest.MapleQuest;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class QuestKJHandler extends AbstractMaplePacketHandler
 {
     
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
	   MapleCharacter chr = c.getPlayer();
	   
	   if (chr == null || !chr.isAlive() || chr.getCSPoints(2) < 200) {
           chr.dropMessage(1, "你的抵用卷余额不足");
           c.getSession().write(MaplePacketCreator.enableActions());
           return;
       }
       byte action = (byte)(slea.readByte() + 1);
       short quest = slea.readShort();
       if (quest < 0) {
           quest = (short)(quest + 65536);
       }
       MapleQuest q = MapleQuest.getInstance(quest);
       switch (action) {
           case 2: {
               int npc = slea.readInt();
               q.complete(chr, npc);
               break;
           }
       }
       chr.modifyCSPoints(2, -200);
       c.getSession().write(MaplePacketCreator.enableActions());
   }
 }
