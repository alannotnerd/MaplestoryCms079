 /*
  * 进入地图显示内容如下
  */

package net.sf.cherry.net.channel.handler;
 
 import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
 
/* public class PlayerUpdateHandler extends AbstractMaplePacketHandler
 {
  public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c)
   {
     String ServerName = ChannelServer.getInstance(c.getChannel()).getServerNameMessage();
     c.doneedlog(this, c.getPlayer());
     c.getPlayer().saveToDB(true);
   }
 }*/public final class PlayerUpdateHandler extends AbstractMaplePacketHandler {
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        //Make it save every x minutes? No?
    }
}