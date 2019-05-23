 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class SummonTalkHandler extends AbstractMaplePacketHandler
 {
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     c.doneedlog(this, c.getPlayer());
     if (c.getPlayer().getJob().getId() == 1000)
       NPCScriptManager.getInstance().start(c, 1101008);
     else
       NPCScriptManager.getInstance().start(c, 1202000);
   }
 }

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.SummonTalkHandler
 * JD-Core Version:    0.6.0
 */