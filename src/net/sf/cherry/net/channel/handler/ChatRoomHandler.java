 package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.client.messages.ServernoticeMapleClientMessageCallback;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.scripting.npc.NPCScriptManager;
import net.sf.cherry.tools.MaplePacketCreator;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
 public class ChatRoomHandler extends AbstractMaplePacketHandler
 {
     
   public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
       new ServernoticeMapleClientMessageCallback(5, c).dropMessage("已经成功解除了假死状态。.");
       NPCScriptManager.getInstance().dispose(c);
       c.getSession().write(MaplePacketCreator.enableActions());
   }
 }
