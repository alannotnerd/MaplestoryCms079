package net.sf.cherry.net.channel.handler;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.net.AbstractMaplePacketHandler;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class AcceptFamilyHandler extends AbstractMaplePacketHandler {
  private static final Logger log = LoggerFactory.getLogger(AcceptFamilyHandler.class);

  public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
    c.doneedlog(this, c.getPlayer());
    System.out.println("=======AcceptFamilyHandler=====");
    System.out.println(slea);
  }
}

/* Location:           E:\maoxiandaodanji\dist\cherry.jar
 * Qualified Name:     net.sf.cherry.net.channel.handler.AcceptFamilyHandler
 * JD-Core Version:    0.6.0
 */