package net.sf.cherry.net;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public abstract interface MaplePacketHandler
{
  public abstract void handlePacket(SeekableLittleEndianAccessor paramSeekableLittleEndianAccessor, MapleClient paramMapleClient);

  public abstract boolean validateState(MapleClient paramMapleClient);
}
