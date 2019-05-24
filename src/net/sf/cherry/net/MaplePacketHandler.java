package net.sf.cherry.net;

import net.sf.cherry.client.MapleClient;
import net.sf.cherry.tools.data.input.SeekableLittleEndianAccessor;

public interface MaplePacketHandler {
  void handlePacket(SeekableLittleEndianAccessor paramSeekableLittleEndianAccessor, MapleClient paramMapleClient);

  boolean validateState(MapleClient paramMapleClient);
}
