package net.sf.cherry.net.world.guild;

import net.sf.cherry.net.MaplePacket;
import net.sf.cherry.tools.MaplePacketCreator;

public enum MapleGuildResponse {

  NOT_IN_CHANNEL(0x2a),
  ALREADY_IN_GUILD(0x28),
  NOT_IN_GUILD(0x2d);
  private int value;

  MapleGuildResponse(int val) {
    value = val;
  }

  public int getValue() {
    return value;
  }

  public MaplePacket getPacket() {
    return MaplePacketCreator.genericGuildMessage((byte) value);
  }
}
